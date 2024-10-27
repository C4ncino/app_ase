import { View, Text, Pressable, ScrollView } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useState, useEffect } from "react";
import { useBleContext } from "@/hooks/useBLEContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Translate = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [counter, setCounter] = useState(3);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const { data, setReceiving, receiving, isConnected } = useBleContext();

  const countDown = () => {
    const inter = setInterval(() => {
      setCounter((c) => (c > 0 ? c - 1 : 0)); //{
    }, 1000);
    setIntervalId(inter);
  };

  useEffect(() => {
    switch (counter) {
      case 0:
        clearInterval(intervalId);
        setIsPlaying(false);
        break;
      case 1:
        setReceiving(true);
        break;
      case -1:
        countDown();
        setCounter(3);
        break;

      default:
        break;
    }
  }, [counter]);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    console.log("Total de datos: ", data.length);
    data.forEach((d) => {
      console.log(d.length);
    });
  }, [data]);

  const handlePlayPress = () => {
    setIsPlaying(true);
    countDown();
  };

  const handleStopPress = () => {
    console.log("stop");
    setReceiving(false);
    clearInterval(intervalId!);
    setCounter(3);
    setIsPlaying(false);
  };

  return (
    <View className="w-full h-full items-center bg-blue-40 py-16 px-0">
      {isConnected ? (
        <View className="items-center">
          <View className="mx-9 bg-blue-30 items-center py-4 rounded-3xl relative w-80 h-5/6">
            <Text className="text-xl text-gray-400 mt-2 mb-2">Traduciendo</Text>
            <View className="flex-1 px-4 mt-2">
              <Text className="text-justify text-lg"> </Text>
            </View>
            {isPlaying && counter > 0 && (
              <Text className="text-6xl  text-gray-600 ">{counter}</Text>
            )}
          </View>

          <View className="flex flex-row mt-4">
            {!isPlaying ? (
              <Pressable
                // className="w-24 h-24 justify-center rounded-full bg-white items-center"
                onPress={handlePlayPress}
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
                onPress={handleStopPress}
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
