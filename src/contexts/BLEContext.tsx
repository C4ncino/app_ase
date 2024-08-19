import { createContext, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import * as ExpoDevice from "expo-device";
import { BleManager, Device } from "react-native-ble-plx";

export const BLEContext = createContext<BLEContextModel>({
  requestPermissions: () => Promise.resolve(false),
  scan: () => {},
});

type Props = {
  children: React.ReactNode;
};

const BLEContextProvider = ({ children }: Props) => {
  const manager = new BleManager();
  const [devide, setDevice] = useState<Device>();

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const scan = () => {
    setTimeout(() => {
      manager.stopDeviceScan();
    }, 2000);

    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) console.log(error.message);

      if (scannedDevice) {
        console.log(scannedDevice.name);
      }
    });
  };

  const connect = async (deviceId: string) => {
    try {
      const newDevice = await manager.connectToDevice(deviceId);
      setDevice(newDevice);
    } catch (error) {
      console.log(error);
    }
  };

  const getServices = async () => {
    if (!devide) return;

    await devide.discoverAllServicesAndCharacteristics();

    try {
      const services = await devide.services();
      console.log(services);
    } catch (error) {
      console.log(error);
    }
  };

  const bleContext: BLEContextModel = {
    requestPermissions: requestPermissions,
    scan: scan,
  };

  return (
    <BLEContext.Provider value={bleContext}>{children}</BLEContext.Provider>
  );
};

export default BLEContextProvider;
