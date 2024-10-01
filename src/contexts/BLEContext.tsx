import { BleManager } from "react-native-ble-plx";
import { createContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useEnv from "@/hooks/useEnv";
import useBase64 from "@/hooks/useBase64";
import { bleMessages } from "@/messages/bleMessages";

export const BLEContext = createContext<BLEContextModel>({
  isConnected: false,
  data: [],
  setData: () => {},
  receiving: false,
  setReceiving: () => {},
  scan: () => {},
  stopScan: () => {},
  connect: () => 0,
  forget: () => {},
});

type Props = {
  children: React.ReactNode;
};

const BLEContextProvider = ({ children }: Props) => {
  const manager = useMemo(() => new BleManager(), []);

  let tempData: string[] = [];
  const [data, setData] = useState<string[][]>([]);

  const [macAddress, setMacAddress] = useState("");
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [receiving, setReceiving] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const { decodeUInt, decode, encodeBool } = useBase64();
  const {
    blePrefix,
    dataUUID,
    activeUUID,
    instanceUUID,
    batteryUUID,
    percentageUUID,
  } = useEnv();

  useEffect(() => {
    const getData = async () => {
      const mac = await AsyncStorage.getItem("mac");
      if (mac) setMacAddress(mac);
    };

    getData();
  }, []);

  useEffect(() => {
    const updateReceiving = async () => {
      await manager.writeCharacteristicWithResponseForDevice(
        macAddress,
        dataUUID,
        activeUUID,
        encodeBool(receiving)
      );
    };

    if (isConnected) updateReceiving();
  }, [receiving]);

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

              if (tempData.length === 0) {
                setTimeout(() => {
                  setData((d) => [...d, tempData]);
                  tempData = [];
                }, 1000);
              }

              tempData.push(char.value);
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

          setIsConnected(true);
        });
    } catch (error) {
      setMessage(bleMessages[4] + " :" + error);
    }
  };

  const forget = async (setMessage: StringSetter) => {
    console.log(data.map((d) => d.map((dd) => decode(dd))));

    setMacAddress("");
    setIsConnected(false);
    setData([]);
    await AsyncStorage.removeItem("mac");

    if (isConnected) {
      manager.cancelDeviceConnection(macAddress);
    }

    setMessage(bleMessages[6]);
  };

  const bleContext: BLEContextModel = {
    isConnected,
    batteryLevel,
    data,
    setData,
    receiving,
    setReceiving,
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
