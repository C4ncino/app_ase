import { View, Text, Pressable, ScrollView } from "react-native";
import CirculoSvg from "@/svgs/Marcos";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

const Training = () => {
  const { word } = useLocalSearchParams();

  const [counter, setCounter] = useState(3);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  const countDown = () => {
    const inter = setInterval(() => {
      setCounter((c) => c - 1);
    }, 1000);

    setIntervalId(inter);
  };

  useEffect(() => {
    countDown();
  }, []);

  useEffect(() => {
    if (counter === 0) clearInterval(intervalId);
  }, [counter]);

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center" }}
      className="w-full  h-full bg-blue-40"
    >
      <View className="items-center bg-blue-40 w-full h-full py-6 px-6">
        <Text className=" mt-3 font-semibold text-lg text-blue-800">
          El entrenamiento comienza en:
        </Text>
        <View className="justify-center items-center relative mt-28 mb-28">
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 280,
              height: 280,
              position: "absolute",
            }}
          >
            <CirculoSvg width="120%" height="120%" />
          </View>
          <View className="mt-4">
            <Text className=" font-semibold text-9xl text-blue-800">
              {counter}
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => {}}
          className="mt-5 justify-center bg-blue-300 h-14 w-72 rounded-3xl "
        >
          <Text className="w-72 text-center font-bold text-lg text-white">
            Pausar
          </Text>
        </Pressable>
        <View className="mt-5 w-72 h-14 flex-row items-center justify-center">
          <Text className="items-center text-lg text-gray-500 ">
            Número de entrenamientos:{" "}
          </Text>
          <Text className="items-center text-lg text-gray-500">3</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Training;
