import { View, Text, Pressable, ScrollView, Button } from "react-native";
import CirculoSvg from "@/svgs/Marcos";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useBleContext } from "@/hooks/useBLEContext";
import useAPI from "@/hooks/useAPI";
import { useSessionContext } from "@/hooks/useSessionContext";
import { sensor_data } from "@/messages/test";

const Training = () => {
  const { word } = useLocalSearchParams();

  const [counter, setCounter] = useState(3);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  const [intervalValidateId, setIntervalValidateId] =
    useState<NodeJS.Timeout>();

  const [taskId, setTaskId] = useState("");

  const { data, setReceiving, receiving, isConnected, setData } =
    useBleContext();

  const { token } = useSessionContext();
  const { post, get } = useAPI();

  const countDown = () => {
    const inter = setInterval(() => {
      setCounter((c) => (c > 0 ? c - 1 : 0));
    }, 1000);

    setIntervalId(inter);
  };

  const validate = async () => {
    const response = await post(
      "train/validate",
      JSON.stringify({ sensor_data: sensor_data }),
      token
    );

    if (response) {
      // TODO: delete bad samples
      setTaskId(response.task);

      const intervalId = setInterval(async () => {
        const responseTask = await get(
          `train/validate/${response.task}`,
          token
        );

        if (responseTask && responseTask.ready) {
          // TODO delete bad samples
          console.log(responseTask.bad_samples);

          clearInterval(intervalId);
        }
      }, 1000);

      setIntervalValidateId(intervalId);
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
        setReceiving((r) => !r);
        break;
      case -1:
        countDown();
        setCounter(3);
        break;
    }
  }, [counter]);

  useEffect(() => {
    if (receiving) {
      setReceiving((r) => !r);
      setCounter(-1);
    }

    if (data.length === 20) {
    }
  }, [data]);

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center" }}
      className="w-full  h-full bg-blue-40"
    >
      {isConnected ? (
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
                {counter >= 0 ? counter : 0}
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
      ) : (
        <Text>No se encontró un guante</Text>
      )}

      <Button title="Validar" onPress={validate} />
    </ScrollView>
  );
};

export default Training;
