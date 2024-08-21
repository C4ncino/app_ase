import { createContext, useState } from "react";
import { BleManager, Device } from "react-native-ble-plx";
import { bleMessages } from "@src/messages/bleMessages";

export const BLEContext = createContext<BLEContextModel>({
  scan: () => {},
});

type Props = {
  children: React.ReactNode;
};

const BLEContextProvider = ({ children }: Props) => {
  const manager = new BleManager();
  const [deviceInfo, setDeviceInfo] = useState<BleDevice>();
  const [device, setDevice] = useState<Device>();

  const scan = (setMessage: React.Dispatch<React.SetStateAction<string>>) => {
    setTimeout(() => {
      manager.stopDeviceScan();
      if (!deviceInfo) {
        setMessage(bleMessages[1]);
        return;
      }
      setMessage(bleMessages[3]);
      if (!deviceInfo.connectable) {
        setMessage(bleMessages[4]);
        return;
      }

      connect();
      getServices();
    }, 2000);

    setMessage(bleMessages[0]);

    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) console.log(error.message);

      if (scannedDevice?.id === "EA:26:25:0C:49:49") {
        setMessage(bleMessages[2]);

        if (
          !scannedDevice?.isConnectable ||
          !scannedDevice.name ||
          !scannedDevice.id
        )
          return;

        setDeviceInfo({
          name: scannedDevice.name,
          id: scannedDevice.id,
          connectable: scannedDevice.isConnectable,
        });

        console.log(scannedDevice);
      }
    });
  };

  const connect = async () => {
    try {
      if (!deviceInfo) return;
      const newDevice = await manager.connectToDevice(deviceInfo.id);
      setDevice(newDevice);
    } catch (error) {
      console.log(error);
    }
  };

  const getServices = async () => {
    console.log("getServices");

    if (!device) {
      console.log(device);
      console.log("No device");
      return;
    }

    const response = await device.discoverAllServicesAndCharacteristics();

    console.log(response);

    try {
      const services = await device.services();
      console.log("services");
      console.log(services);
    } catch (error) {
      console.log(error);
    }
  };

  const bleContext: BLEContextModel = {
    scan: scan,
  };

  return (
    <BLEContext.Provider value={bleContext}>{children}</BLEContext.Provider>
  );
};

export default BLEContextProvider;
