import { Entypo } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useEffect, useCallback, useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";

import useCountdown from "@/hooks/useCountdown";
import NoGloveView from "@/components/ble/NoGloveview";
import { useTranslate } from "@/hooks/useTranslate";
import { useBleContext } from "@/hooks/useBLEContext";

const Translate = () => {
  const { isConnected, setReceiving, setData, data } = useBleContext();
  const { start, pause, counter, isCounting } = useCountdown(
    () => setReceiving(true),
    () => setReceiving(false)
  );
  const [message, setMessage] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const { translate } = useTranslate(setMessage);

  useFocusEffect(
    useCallback(() => {
      setData([]);

      return () => {
        setReceiving(false);
      };
    }, [isConnected])
  );

  const tryTranslate = async () => {
    if (data.length === 0) return;

    console.log("🚀 ~ tryTranslate ~ data:", data.length);

    for (let i = 0; i < data.length; i++) {
      // const currentMovement = data.shift();

      // if (!currentMovement) break;

      await translate(data[i]);
    }

    setData([]);

    setIsTranslating(false);
  };

  useEffect(() => {
    if (!isTranslating) return;
    tryTranslate();
  }, [isTranslating]);

  const onStart = () => {
    setData([]);
    start();
  };

  const onStop = () => {
    pause();
    setIsTranslating(true);
  };

  return (
    <View className="w-full h-full items-center bg-blue-40 py-16 px-0">
      {isConnected ? (
        <View className="items-center">
          <View className="mx-9 bg-blue-30 items-center py-4 rounded-3xl relative w-80 h-5/6">
            <Text className="text-xl text-gray-400 mt-2 mb-2">
              {isTranslating ? "Traduciendo" : ""}
            </Text>
            <View className="flex-1 px-4 mt-2">
              <Text className="text-justify text-lg">{message}</Text>
            </View>
            {isTranslating && <ActivityIndicator size={40} color={"#006699"} />}
            {isCounting && counter > 0 && (
              <Text className="text-6xl text-gray-600">{counter}</Text>
            )}
          </View>

          <View className="flex flex-row mt-4">
            {!isCounting ? (
              <Pressable
                onPress={onStart}
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
                onPress={onStop}
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
        <NoGloveView />
      )}
    </View>
  );
};

export default Translate;
