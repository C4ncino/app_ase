import { useBleContext } from "@/hooks/useBLEContext";
import { bleMessages } from "@/messages/bleMessages";
import { useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { View, Text, Modal, ActivityIndicator, Pressable } from "react-native";
import BatteryLevel from "./BatteryLevel";
import Feather from "@expo/vector-icons/Feather";

const DeviceLocalizer = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { scan, stopScan, connect, forget, isConnected } = useBleContext();

  const onOpen = () => {
    setOpen(true);
    if (!isConnected) {
      scan(setMessage);
    }
  };

  return (
    <>
      <View className="mx-4">
        {/* Muestra el botón "Conectar" solo si no está conectado */}
        {!isConnected ? (
          <Pressable
            className="bg-blue-600 rounded-full h-10 items-center justify-center px-2"
            onPress={onOpen}
          >
            <Text className="text-base text-white font-semibold">
              Dispositivos
            </Text>
          </Pressable>
        ) : (
          <BatteryLevel />
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
          <View style={{ width: 72, height: 72 }}>
            {!isConnected ? (
              <>
                {message === bleMessages[3] ? (
                  <ActivityIndicator size={72} color="#0088cc" />
                ) : message === bleMessages[6] ? (
                  <Feather name="x-circle" size={72} color="red" />
                ) : (
                  <FontAwesome6
                    name="hand-sparkles"
                    size={56}
                    color="#66CCFF"
                  />
                )}
              </>
            ) : (
              <FontAwesome6 name="circle-check" size={72} color="green" />
            )}
          </View>

          {message && <Text className="mt-4">{message}</Text>}

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
              className={`mt-10 w-48 h-14 rounded-full justify-center items-center ${message === bleMessages[0] || isConnected ? "border-2 border-gray-600 " : "bg-blue-600 border-2 border-blue-600 "}`}
              onPress={() => connect(setMessage)}
              disabled={message === bleMessages[0]}
            >
              <Text
                className={`font-semibold text-base ${message === bleMessages[0] || isConnected ? "text-gray-600" : "text-white"}`}
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
