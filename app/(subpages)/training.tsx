import {
  View,
  Text,
  Pressable,
  ScrollView,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import CirculoSvg from "@/svgs/Marcos";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useBleContext } from "@/hooks/useBLEContext";
import useAPI from "@/hooks/useAPI";
import { useSessionContext } from "@/hooks/useSessionContext";
import { sensor_data } from "@/messages/test";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Training = () => {
  const { word } = useLocalSearchParams();

  const [counter, setCounter] = useState(3);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  const [isPlaying, setIsPlaying] = useState(true);

  const [intervalValidateId, setIntervalValidateId] =
    useState<NodeJS.Timeout>();

  const [taskId, setTaskId] = useState("");

  const { data, setReceiving, receiving, isConnected, setData } =
    useBleContext();

  const { token } = useSessionContext();
  const { post, get } = useAPI();

  const countDown = () => {
    setIsPlaying(true);

    const inter = setInterval(() => {
      console.log(inter);
      setCounter((c) => (c > 0 ? c - 1 : 0));
    }, 1000);

    setIntervalId(inter);
  };

  const reset = () => {
    setReceiving(false);
    clearInterval(intervalId);
    setCounter(3);
    setIsPlaying(false);
  };

  const validate = async () => {
    const response = await post(
      "train/validate",
      JSON.stringify({ sensor_data: sensor_data }),
      token
    );

    if (response) {
      setData((d) => d.filter((_, i) => !response.bad_samples.includes(i)));
      setTaskId(response.task);
    }
  };

  useEffect(() => {
    if (isConnected) countDown();
    setData([]);
  }, [isConnected]);

  useEffect(() => {
    switch (counter) {
      case 0:
        clearInterval(intervalId);
        break;
      case 1:
        setReceiving(true);
        break;
      case -1:
        setCounter(3);
        countDown();
        break;
    }
  }, [counter]);

  useEffect(() => {
    if (taskId === "") {
      if (receiving) {
        setReceiving(false);
        setCounter(-1);
      }

      if (data.length === 20) {
        validate();
      }
    }
  }, [data]);

  useEffect(() => {
    if (taskId) {
      const intervalId = setInterval(async () => {
        const response = await get(`train/validate/${taskId}`, token);

        if (response && response.ready) {
          setData((d) => d.filter((_, i) => !response.bad_samples.includes(i)));
          console.log(response.bad_samples);

          clearInterval(intervalValidateId);
        }
      }, 1000);

      setIntervalValidateId(intervalId);
    }
  }, [taskId]);

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center" }}
      className="w-full  h-full bg-blue-40"
    >
      {isConnected ? (
        <View className="items-center bg-blue-40 w-full h-full py-6 px-6">
          {data.length >= 20 ? (
            <View className="w-full justify-center items-center gap-5">
              <ActivityIndicator />
              <Text>Espera un momento</Text>
            </View>
          ) : (
            <>
              <Text className="mt-6 font-semibold text-lg text-blue-800">
                El entrenamiento comienza en:
              </Text>

              <View className="justify-center items-center relative my-28 w-screen h-40 pt-2">
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
                <View className="mt-4 relative jutify-center items-center">
                  {isPlaying ? (
                    <Text className="font-semibold text-9xl text-blue-800 text-center">
                      {counter >= 0 ? counter : 0}
                    </Text>
                  ) : (
                    <Ionicons
                      name="pause"
                      size={120}
                      color="gray"
                      style={{ top: -12 }}
                    />
                  )}
                </View>
              </View>
              {isPlaying ? (
                <Pressable
                  onPress={reset}
                  // className="mt-5 justify-center bg-orange-300 h-14 w-72 rounded-3xl "
                  style={({ pressed }) => [
                    {
                      marginTop: pressed ? 30 : 26,
                      justifyContent: "center",
                      height: pressed ? 54 : 58,
                      width: pressed ? 284 : 284,
                      borderRadius: 100,
                      backgroundColor: "#fdba74",
                      shadowColor: pressed ? "" : "black",
                      shadowOpacity: pressed ? 0 : 0.25,
                      shadowRadius: pressed ? 0 : 3.84,
                      elevation: pressed ? 0 : 5,
                    },
                  ]}
                >
                  <Text className="w-72 text-center font-bold text-lg text-white">
                    Pausar
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={countDown}
                  // className="mt-5 justify-center bg-blue-300 h-14 w-72 rounded-3xl "
                  style={({ pressed }) => [
                    {
                      marginTop: pressed ? 30 : 26,
                      justifyContent: "center",
                      height: pressed ? 54 : 58,
                      width: pressed ? 280 : 284,
                      borderRadius: 100,
                      backgroundColor: "#33bbff",
                      shadowColor: pressed ? "" : "black",
                      shadowOpacity: pressed ? 0 : 0.25,
                      shadowRadius: pressed ? 0 : 3.84,
                      elevation: pressed ? 0 : 5,
                    },
                  ]}
                >
                  <Text className="w-72 text-center font-bold text-lg text-white">
                    Continuar
                  </Text>
                </Pressable>
              )}
              <View className="mt-5 w-72 h-14 flex-row items-center justify-center">
                <Text className="items-center text-lg text-gray-500 ">
                  {data.length} / 20
                </Text>
              </View>
            </>
          )}
        </View>
      ) : (
        <View className="justify-center items-center w-full mt-72 mb-4">
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
      {/* <Button title="Validar" onPress={validate} /> */}
    </ScrollView>
  );
};

export default Training;
