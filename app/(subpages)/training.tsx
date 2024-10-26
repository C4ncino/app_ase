import {
  View,
  Text,
  Pressable,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import CirculoSvg from "@/svgs/Marcos";
import { useLocalSearchParams } from "expo-router";
import { useBleContext } from "@/hooks/useBLEContext";
import useCountdown from "@/hooks/useCountdown";
import useTrain from "@/hooks/useTrain";

const Training = () => {
  const { word } = useLocalSearchParams();

  const { setReceiving, isConnected } = useBleContext();
  const { counter, isCounting, pause, restart } = useCountdown(() =>
    setReceiving(true)
  );
  const { validate, samples_size } = useTrain();

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center" }}
      className="w-full  h-full bg-blue-40"
    >
      {isConnected ? (
        <View className="items-center bg-blue-40 w-full h-full py-6 px-6">
          {samples_size >= 20 ? (
            <View className="w-full justify-center items-center gap-5">
              <ActivityIndicator />
              <Text>Espera un momento</Text>
            </View>
          ) : (
            <>
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
                    {isCounting ? (
                      <>{counter >= 0 ? counter : 0}</>
                    ) : (
                      <Text>A</Text>
                    )}
                  </Text>
                </View>
              </View>
              {isCounting ? (
                <Pressable
                  onPress={pause}
                  className="mt-5 justify-center bg-orange-300 h-14 w-72 rounded-3xl "
                >
                  <Text className="w-72 text-center font-bold text-lg text-white">
                    Pausar
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={restart}
                  className="mt-5 justify-center bg-blue-300 h-14 w-72 rounded-3xl "
                >
                  <Text className="w-72 text-center font-bold text-lg text-white">
                    Continuar
                  </Text>
                </Pressable>
              )}
              <View className="mt-5 w-72 h-14 flex-row items-center justify-center">
                <Text className="items-center text-lg text-gray-500 ">
                  {samples_size} / 20
                </Text>
              </View>
            </>
          )}
        </View>
      ) : (
        <Text>No se encontró un guante</Text>
      )}

      <Button title="Validar" onPress={validate} />
    </ScrollView>
  );
};

export default Training;
