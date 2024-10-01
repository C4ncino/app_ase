import { useBleContext } from "@/hooks/useBLEContext";
import { bleMessages } from "@/messages/bleMessages";
import { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  View,
  Text,
  Modal,
  Button,
  ActivityIndicator,
  Pressable,
} from "react-native";

const DeviceLocalizer = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { scan, stopScan, connect, forget, batteryLevel, isConnected } =
    useBleContext();

  const onOpen = () => {
    setOpen(true);
    if (!isConnected) {
      scan(setMessage);
    }
  };
  const getBatteryColor = (level: number) => {
    if (level > 60) return "bg-green-400";
    if (level > 35) return "bg-yellow-400";
    if (level > 10) return "bg-orange-500";
    return "bg-red-300";
  };

  return (
    <>
      <View className="mx-4">
        {/* Muestra el botón "Conectar" solo si no está conectado */}
        {!isConnected ? (
          <Pressable
            className="bg-blue-600 rounded-full w-24 h-10 items-center justify-center"
            onPress={onOpen}
          >
            <Text className="text-base text-white font-semibold">Conectar</Text>
          </Pressable>
        ) : (
          <View className="flex-row items-center ">
            <Text className="text-sm ">{batteryLevel}%</Text>
            <MaterialCommunityIcons
              name="battery-bluetooth-variant"
              size={20}
              color="black"
            />
            <View
              className={`w-3 h-3 rounded-full ${getBatteryColor(batteryLevel ?? 0)}`}
            />
          </View>
        )}
      </View>

      <Modal visible={open}>
        <View className="flex-row justify-between mx-4 mt-3">
          <Text className="text-lg font-bold">Buscar Guante</Text>
          <Pressable
            className="px-2 items-center justify-center  rounded-full"
            onPress={() => {
              setOpen(false);
              stopScan();
            }}
          >
            <Text className="text-base text-red-300 font-semibold">Cerrar</Text>
          </Pressable>
        </View>

        <View className="mx-4 my-48 justify-center items-center">
          <ActivityIndicator className="mb-4" size={72} color="#0088cc" />

          {message && <Text>{message}</Text>}

          {message && message === bleMessages[6] ? (
            <Pressable
              className="mt-10 w-48 h-14 rounded-full justify-center items-center border-2 border-blue-600 "
              onPress={onOpen}
            >
              <Text className="font-semibold text-base text-blue-600">
                Buscar Guante
              </Text>
            </Pressable>
          ) : (
            <Pressable
              className={`mt-10 w-48 h-14 rounded-full justify-center items-center ${message === bleMessages[0] || isConnected ? "border-2 border-gray-600 " : "border-2 border-blue-600 "}`}
              onPress={() => connect(setMessage)}
              disabled={message === bleMessages[0]}
            >
              <Text
                className={`font-semibold text-base ${message === bleMessages[0] || isConnected ? "text-gray-600" : "text-blue-600"}`}
              >
                Conectar
              </Text>
            </Pressable>
          )}
          <Pressable
            className={`mt-4 w-48 h-14 rounded-full justify-center items-center ${!isConnected ? "border-2 border-gray-600 " : "border-2 border-red-400 "}`}
            onPress={() => forget(setMessage)}
            disabled={!isConnected}
          >
            <Text
              className={`font-semibold text-base ${!isConnected ? "text-gray-600" : "text-red-400"}`}
            >
              Olvidar
            </Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default DeviceLocalizer;
