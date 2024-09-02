import { BleManager } from "react-native-ble-plx";
import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useEnv from "@/hooks/useEnv";
import useBase64 from "@/hooks/useBase64";
import { bleMessages } from "@/messages/bleMessages";

export const BLEContext = createContext<BLEContextModel>({
  isConnected: false,
  data: [],
  setData: () => {},
  scan: () => {},
  stopScan: () => {},
  connect: () => 0,
  forget: () => {},
});

type Props = {
  children: React.ReactNode;
};

const BLEContextProvider = ({ children }: Props) => {
  const { blePrefix, dataUUID, instanceUUID, batteryUUID, percentageUUID } =
    useEnv();

  const manager = new BleManager();

  const [data, setData] = useState<string[][]>([]);
  const [macAddress, setMacAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(0);

  let tempData: string[] = [];

  const { decodeUInt, decode } = useBase64();

  useEffect(() => {
    const getData = async () => {
      const mac = await AsyncStorage.getItem("mac");
      if (mac) setMacAddress(mac);
    };

    getData();
  }, []);

  useEffect(() => {
    if (data.length === 13) setData([]);
  }, [data]);

  const scan = (setMessage: StringSetter) => {
    setMessage(bleMessages[0]);

    if (macAddress) {
      setMessage(bleMessages[2]);
      return;
    }

    manager.startDeviceScan(
      null, //[dataUUID, batteryUUID],
      { allowDuplicates: false },
      async (error, scannedDevice) => {
        if (error) console.log(error.message);

        if (scannedDevice?.name?.includes(blePrefix)) {
          setMessage(bleMessages[2]);

          if (!scannedDevice.id) return;

          setMacAddress(scannedDevice.id);

          await manager.stopDeviceScan();
          await AsyncStorage.setItem("mac", scannedDevice.id);
        }
      }
    );
  };

  const connect = async () => {
    try {
      if (!macAddress) return 1;

      manager
        .connectToDevice(macAddress)
        .then((device) => device.discoverAllServicesAndCharacteristics())
        .then((device) => device.services())
        .then((services) => {
          const dataService = services.find(
            (service) => service.uuid === dataUUID
          );

          if (!dataService) return null;

          dataService.characteristics().then((characteristics) => {
            if (!characteristics) return null;

            const instanceCharacteristic = characteristics.find(
              (char) => char.uuid === instanceUUID
            );

            if (!instanceCharacteristic) return null;

            instanceCharacteristic.monitor((error, char) => {
              if (error || !char?.value) {
                setIsConnected(false);
                return;
              }

              tempData.push(char.value);

              if (tempData.length === 8) {
                setData((data) => [...data, tempData]);
                tempData = [];
              }
            });
          });

          const batService = services.find(
            (service) => service.uuid === batteryUUID
          );

          if (!batService) return null;

          batService.characteristics().then((characteristics) => {
            if (!characteristics) return null;

            const batLevelCharacteristic = characteristics.find(
              (char) => char.uuid === percentageUUID
            );

            if (!batLevelCharacteristic) return null;

            batLevelCharacteristic.monitor((error, char) => {
              if (error || !char?.value) {
                setIsConnected(false);
                return;
              }

              setBatteryLevel(decodeUInt(char.value));
            });
          });
        });
    } catch (error) {
      console.log("🚀 ~ connect ~ error:", error);
      return 2;
    }

    return 0;
  };

  const resetContextData = async () => {
    setMacAddress("");
    setIsConnected(false);
    setData([]);
    await AsyncStorage.removeItem("mac");
  };

  const forget = () => {
    console.log(data);

    // resetContextData();
    // if (isConnected) {
    //   manager.cancelDeviceConnection(macAddress);
    // }
  };

  const bleContext: BLEContextModel = {
    isConnected,
    batteryLevel,
    data,
    setData,
    scan,
    stopScan: () => manager.stopDeviceScan(),
    connect,
    forget,
  };

  return (
    <BLEContext.Provider value={bleContext}>{children}</BLEContext.Provider>
  );
};

export default BLEContextProvider;
