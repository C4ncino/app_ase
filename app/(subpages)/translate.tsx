import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from "react-native";

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
  const [isWriting, setIsWriting] = useState(false);

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

    for (let i = 0; i < data.length; i++) await translate(data[i]);

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
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#E5F7FF",
        paddingVertical: 64,
      }}
    >
      {isConnected ? (
        <View className="items-center">
          <View className="mx-9 bg-blue-30 items-center py-4 rounded-3xl relative w-80 h-5/6">
            <Text className="text-xl text-gray-400 mt-2">
              {isTranslating ? "Traduciendo" : ""}
            </Text>
            {message !== "" && (
              <View className="absolute -top-6 bg-blue-30 left-1/2 -translate-x-8 rounded-full p-1 border-4 border-blue-30">
                <Pressable
                  className="border-2 border-red-200 rounded-full p-1"
                  onPress={() => setMessage("")}
                >
                  <MaterialCommunityIcons
                    name="delete-forever-outline"
                    size={36}
                    color={"#f55347"}
                  />
                </Pressable>
              </View>
            )}
            <TextInput
              multiline
              value={message}
              onChangeText={setMessage}
              style={{ textAlignVertical: "top" }}
              onPress={() => setIsWriting(true)}
              onBlur={() => setIsWriting(false)}
              numberOfLines={isWriting ? 16 : 28}
              className="w-full text-justify px-6 py-2"
            />
            <View className="absolute bottom-2">
              {isTranslating && (
                <ActivityIndicator size={40} color={"#006699"} />
              )}
              {isCounting && counter > 0 && (
                <Text className="text-6xl text-gray-600">{counter}</Text>
              )}
              {counter === 0 && !isTranslating && (
                <Text className="text-xl text-gray-600">Recibiendo Datos</Text>
              )}
            </View>
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
    </ScrollView>
  );
};

export default Translate;
