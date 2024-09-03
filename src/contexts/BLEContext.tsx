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
  startDataSend: () => {},
  stopDataSend: () => {},
});

type Props = {
  children: React.ReactNode;
};

const BLEContextProvider = ({ children }: Props) => {
  let tempData: string[] = [];
  const [data, setData] = useState<string[][]>([]);

  const manager = new BleManager();
  const [macAddress, setMacAddress] = useState("");
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  const { decodeUInt, decode } = useBase64();
  const { blePrefix, dataUUID, instanceUUID, batteryUUID, percentageUUID } =
    useEnv();

  useEffect(() => {
    const getData = async () => {
      const mac = await AsyncStorage.getItem("mac");
      if (mac) setMacAddress(mac);
    };

    getData();
  }, []);

  const scan = (setMessage: StringSetter) => {
    setMessage(bleMessages[0]);

    if (macAddress) {
      setMessage(bleMessages[2]);
      return;
    }

    manager.startDeviceScan(
      [dataUUID, batteryUUID],
      { allowDuplicates: false },
      async (error, scannedDevice) => {
        if (error) return;

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

  const connect = async (setMessage: StringSetter) => {
    try {
      if (!macAddress) {
        setMessage(bleMessages[1]);
        return;
      }

      setMessage(bleMessages[3]);

      manager
        .connectToDevice(macAddress)
        .then((device) => device.discoverAllServicesAndCharacteristics())
        .then((device) => device.services())
        .then((services) => {
          const dataService = services.find(
            (service) => service.uuid === dataUUID
          );

          if (!dataService) throw "No hay servicio de información";

          dataService.characteristics().then((characteristics) => {
            if (!characteristics) throw "Error Recuperando las características";

            const instanceCharacteristic = characteristics.find(
              (char) => char.uuid === instanceUUID
            );

            if (!instanceCharacteristic)
              throw "No hay característica de información";

            instanceCharacteristic.monitor((error, char) => {
              if (error || !char?.value) {
                setIsConnected(false);
                return;
              }

              const value = decode(char.value);

              if (value !== " ") tempData.push(char.value);

              if (tempData.length === 200) {
                console.log("hola");

                setData((data) => [...data, tempData]);
                tempData = [];
              }
            });
          });

          const batService = services.find(
            (service) => service.uuid === batteryUUID
          );

          if (!batService) throw "No hay servicio de batería";

          batService.characteristics().then((characteristics) => {
            if (!characteristics) throw "No hay características de batería";

            const batLevelCharacteristic = characteristics.find(
              (char) => char.uuid === percentageUUID
            );

            if (!batLevelCharacteristic)
              throw "No hay característica de nivel de batería";

            batLevelCharacteristic.monitor((error, char) => {
              if (error || !char?.value) {
                setIsConnected(false);
                return;
              }

              setBatteryLevel(decodeUInt(char.value));
            });
          });

          setMessage(bleMessages[5]);
        });
    } catch (error) {
      setMessage(bleMessages[4] + " :" + error);
    }
  };

  const forget = async (setMessage: StringSetter) => {
    console.log(data.map((d) => d.map((dd) => decode(dd))));

    // setMacAddress("");
    // setIsConnected(false);
    // setData([]);
    // await AsyncStorage.removeItem("mac");

    // if (isConnected) {
    //   manager.cancelDeviceConnection(macAddress);
    // }

    setMessage(bleMessages[6]);
  };

  // TODO: write in char of BLE to stop sending routine
  const startDataSend = () => {};
  const stopDataSend = () => {};

  const bleContext: BLEContextModel = {
    isConnected,
    batteryLevel,
    data,
    setData,
    scan,
    stopScan: () => manager.stopDeviceScan(),
    connect,
    forget,
    startDataSend,
    stopDataSend,
  };

  return (
    <BLEContext.Provider value={bleContext}>{children}</BLEContext.Provider>
  );
};

export default BLEContextProvider;
