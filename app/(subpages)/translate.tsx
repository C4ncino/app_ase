import { View, Text, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useCallback, useState } from "react";
import { useBleContext } from "@/hooks/useBLEContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useCountdown from "@/hooks/useCountdown";
import { useFocusEffect } from "expo-router";
import { useTranslate } from "@/hooks/useTranslate";

const Translate = () => {
  const { isConnected, setReceiving, setData, data } = useBleContext();
  const { start, pause, counter, isCounting } = useCountdown(
    () => setReceiving(true),
    () => setReceiving(false)
  );
  const [message, setMessage] = useState("");
  const { translate } = useTranslate(setMessage);

  useFocusEffect(
    useCallback(() => {
      setData([]);

      return () => {
        setReceiving(false);
      };
    }, [])
  );

  useEffect(() => {
    if (data.length === 0) return;

    const currentMovement = data.shift();

    if (!currentMovement) return;

    translate(currentMovement);
  }, [data]);

  return (
    <View className="w-full h-full items-center bg-blue-40 py-16 px-0">
      {isConnected ? (
        <View className="items-center">
          <View className="mx-9 bg-blue-30 items-center py-4 rounded-3xl relative w-80 h-5/6">
            <Text className="text-xl text-gray-400 mt-2 mb-2">
              {isCounting || counter === 0 ? "Traduciendo" : ""}
            </Text>
            <View className="flex-1 px-4 mt-2">
              <Text className="text-justify text-lg">{message}</Text>
            </View>
            {isCounting && counter > 0 && (
              <Text className="text-6xl  text-gray-600 ">{counter}</Text>
            )}
          </View>

          <View className="flex flex-row mt-4">
            {!isCounting ? (
              <Pressable
                // className="w-24 h-24 justify-center rounded-full bg-white items-center"
                onPress={start}
                style={({ pressed }) => [
                  {
                    marginTop: pressed ? 12 : 8,
                    justifyContent: "center",
                    height: pressed ? 81 : 85,
                    width: pressed ? 81 : 85,
                    borderRadius: 100,
                    backgroundColor: "white",
                    shadowColor: pressed ? "" : "black",
                    shadowOpacity: pressed ? 0 : 0.25,
                    shadowRadius: pressed ? 0 : 3.84,
                    elevation: pressed ? 0 : 5,
                  },
                ]}
              >
                <Entypo
                  name="controller-play"
                  size={70}
                  color="#35a766"
                  style={{ paddingStart: 9 }}
                />
              </Pressable>
            ) : (
              <Pressable
                // className="w-24 h-24 justify-center rounded-full bg-white items-center"
                onPress={pause}
                style={({ pressed }) => [
                  {
                    marginTop: pressed ? 12 : 8,
                    justifyContent: "center",
                    alignItems: "center",
                    height: pressed ? 81 : 85,
                    width: pressed ? 81 : 85,
                    borderRadius: 100,
                    backgroundColor: "white",
                    shadowColor: pressed ? "" : "black",
                    shadowOpacity: pressed ? 0 : 0.25,
                    shadowRadius: pressed ? 0 : 3.84,
                    elevation: pressed ? 0 : 5,
                  },
                ]}
              >
                <Entypo name="controller-stop" size={70} color="#d12115" />
              </Pressable>
            )}
          </View>
        </View>
      ) : (
        <View className="justify-center items-center w-full h-full">
          <MaterialCommunityIcons
            name="alert-octagon-outline"
            size={72}
            color="#f55347"
          />
          <Text className="text-lg text-gray-600">
            No se encontró un guante
          </Text>
        </View>
      )}
    </View>
  );
};

export default Translate;
