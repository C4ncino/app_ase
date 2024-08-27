import { createContext, useEffect, useState } from "react";
import { BleManager } from "react-native-ble-plx";
import { bleMessages } from "@/messages/bleMessages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useBase64 from "@/hooks/useBase64";
import useEnv from "@/hooks/useEnv";

export const BLEContext = createContext<BLEContextModel>({
  isConnected: false,
  scan: () => {},
  connect: () => 0,
  forget: () => {},
});

type Props = {
  children: React.ReactNode;
};

const BLEContextProvider = ({ children }: Props) => {
  const {
    blePrefix,
    dataUUID,
    flexUUID,
    imuUUID,
    batteryUUID,
    percentageUUID,
  } = useEnv();

  const manager = new BleManager();

  const [data, setData] = useState<number[]>([]);
  const [macAddress, setMacAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  // const [batteryLevel, setBatteryLevel] = useState("");

  const { decodeDecimal } = useBase64();

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
      null, // TODO: ADD UUIDs
      { allowDuplicates: false },
      async (error, scannedDevice) => {
        if (error) console.log(error.message);

        if (scannedDevice?.name?.includes(blePrefix)) {
          setMessage(bleMessages[2]);

          if (!scannedDevice.id) return;

          setMacAddress(scannedDevice.id);

          console.log(
            "🚀 ~ manager.startDeviceScan ~ scannedDevice:",
            scannedDevice
          );

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
        .then((device) => {
          return device.discoverAllServicesAndCharacteristics();
        })
        .then((device) => {
          return device.services();
        })
        .then((services) => {
          const dataService = services.find(
            (service) => service.uuid === dataUUID
          );

          if (!dataService) return null;

          dataService.characteristics().then((characteristics) => {
            if (!characteristics) return null;

            const flexCharacteristic = characteristics.find(
              (char) => char.uuid === flexUUID
            );
            const imuCharacteristic = characteristics.find(
              (char) => char.uuid === imuUUID
            );

            if (!flexCharacteristic || !imuCharacteristic) return null;

            flexCharacteristic.monitor((error, char) => {
              if (error) {
                console.log("🚀 ~ flexCharacteristic.monitor ~ error:", error);
                return;
              }
              if (!char?.value) {
                console.log("No characteristic");
                return;
              }
              const rawStepData = decodeDecimal(char.value);
              console.log("Received step data:", rawStepData);

              setData((prevData) => [...prevData, rawStepData]);
            });

            imuCharacteristic.monitor((error, char) => {
              if (error) {
                console.log("🚀 ~ imuCharacteristic.monitor ~ error:", error);
                return;
              }
              if (!char?.value) {
                console.log("No characteristic");
                return;
              }

              const rawImuData = decodeDecimal(char.value, true);
              console.log(
                "🚀 ~ imuCharacteristic.monitor ~ char.value:",
                char.value
              );
              console.log("Received IMU data:", rawImuData);

              setData((prevData) => [...prevData, rawImuData]);
            });
          });

          const batService = services.find(
            (service) => service.uuid === batteryUUID
          );
          console.log("🚀 ~ .then ~ services:", services);

          console.log("🚀 ~ .then ~ batService:", batService);

          if (!batService) return null;

          batService.characteristics().then((characteristics) => {
            if (!characteristics) return null;

            const batLevelCharacteristic = characteristics.find(
              (char) => char.uuid === percentageUUID
            );
            console.log(
              "🚀 ~ batService.characteristics ~ characteristics:",
              characteristics
            );

            console.log(
              "🚀 ~ batService.characteristics ~ batLevelCharacteristic:",
              batLevelCharacteristic
            );

            if (!batLevelCharacteristic) return null;

            console.log("monitoring... percentage");

            batLevelCharacteristic.monitor((error, char) => {
              if (error) {
                console.log("🚀 ~ batCharacteristic.monitor ~ error:", error);
                return;
              }
              if (!char?.value) {
                console.log("No characteristic");
                return;
              }

              const rawBatData = decodeDecimal(char.value);
              console.log(
                "🚀 ~ batLevelCharacteristic.monitor ~ rawBatData:",
                rawBatData
              );
            });
          });
        });
    } catch (error) {
      console.log("🚀 ~ connect ~ error:", error);
      return 2;
    }

    return 0;
  };

  const forget = async () => {
    // Disconnect
    // Delete mac from storage
  };

  const bleContext: BLEContextModel = {
    isConnected,
    scan,
    connect,
    forget,
  };

  return (
    <BLEContext.Provider value={bleContext}>{children}</BLEContext.Provider>
  );
};

export default BLEContextProvider;
