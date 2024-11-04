import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { View, Text, Modal, ActivityIndicator, Pressable } from "react-native";

import BatteryLevel from "./BatteryLevel";
import { bleMessages } from "@/messages/bleMessages";
import { useBleContext } from "@/hooks/useBLEContext";

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
            className="bg-blue-600 rounded-full w-24 h-10 items-center justify-center"
            onPress={onOpen}
          >
            <Text className="text-base text-white font-semibold">Conectar</Text>
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
              <View className="-mb-2">
                <FontAwesome6 name="circle-check" size={72} color="green" />
              </View>
            )}
          </View>

          {message && <Text className="mt-4">{message}</Text>}

          {message && message === bleMessages[6] ? (
            <Pressable
              // className="mt-10 w-48 h-14 rounded-full justify-center items-center border-2 border-blue-600 "
              onPress={onOpen}
              style={({ pressed }) => [
                {
                  marginTop: pressed ? 25 : 20,
                  justifyContent: "center",
                  alignItems: "center",
                  height: pressed ? 52 : 56,
                  width: pressed ? 186 : 190,
                  borderRadius: 100,
                  borderColor: "#0088cc",
                  borderWidth: 2,
                  backgroundColor: "white",
                  shadowColor: "black",
                  shadowOpacity: pressed ? 0 : 0.25,
                  shadowRadius: pressed ? 0 : 3.84,
                  elevation: pressed ? 0 : 5,
                },
              ]}
            >
              <Text className="font-semibold text-base text-blue-600">
                Buscar Guante
              </Text>
            </Pressable>
          ) : (
            <Pressable
              // className={`mt-10 w-48 h-14 rounded-full justify-center items-center ${message === bleMessages[0] || isConnected ? "border-2 border-gray-600 " : "border-2 border-blue-600 "}`}
              onPress={() => connect(setMessage)}
              disabled={message === bleMessages[0]}
              style={({ pressed }) => [
                {
                  marginTop: pressed ? 25 : 20,
                  justifyContent: "center",
                  alignItems: "center",
                  height: pressed ? 52 : 56,
                  width: pressed ? 186 : 190,
                  borderRadius: 100,
                  borderColor:
                    message === bleMessages[0] || isConnected
                      ? "#6c8693"
                      : "#0088cc",
                  borderWidth: 2,
                  backgroundColor: "white",
                  shadowColor:
                    message === bleMessages[0] || isConnected || pressed
                      ? "white"
                      : "black",
                  shadowOpacity: pressed ? 0 : 0.25,
                  shadowRadius: pressed ? 0 : 3.84,
                  elevation: pressed ? 0 : 5,
                },
              ]}
            >
              <Text
                className={`font-semibold text-base ${message === bleMessages[0] || isConnected ? "text-gray-600" : "text-blue-600"}`}
              >
                Conectar
              </Text>
            </Pressable>
          )}
          <Pressable
            // className={`mt-4 w-48 h-14 rounded-full justify-center items-center ${!isConnected ? "border-2 border-gray-600 " : "border-2 border-red-400 "}`}
            onPress={() => forget(setMessage)}
            disabled={!isConnected}
            style={({ pressed }) => [
              {
                marginTop: pressed ? 25 : 20,
                justifyContent: "center",
                alignItems: "center",
                height: pressed ? 52 : 56,
                width: pressed ? 186 : 190,
                borderRadius: 100,
                borderColor: !isConnected ? "#6c8693" : "#d12115",
                borderWidth: 2,
                backgroundColor: "white",
                shadowColor: !isConnected || pressed ? "white" : "black",
                shadowOpacity: pressed ? 0 : 0.25,
                shadowRadius: pressed ? 0 : 3.84,
                elevation: pressed ? 0 : 5,
              },
            ]}
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
