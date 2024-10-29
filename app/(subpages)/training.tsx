import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useCallback } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import useTrain from "@/hooks/useTrain";
import { useBleContext } from "@/hooks/useBLEContext";
import GettingData from "@/components/train/GettingData";

const Training = () => {
  const { word } = useLocalSearchParams();

  const { isConnected, setReceiving } = useBleContext();
  const { samples, message, state, goBackToGetData, countDown, MAX_SAMPLES } =
    useTrain(word as string);

  useFocusEffect(
    useCallback(() => {
      return () => setReceiving(false);
    }, [])
  );

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center" }}
      className="w-full  h-full bg-blue-40"
    >
      {isConnected ? (
        <View className="items-center bg-blue-40 w-full h-full py-6 px-6">
          {state > 0 ? (
            <View className="w-full justify-center items-center gap-5">
              <ActivityIndicator size={72} color="#0088cc" />
              <Text>{message}</Text>
              {state === 5 && (
                <Pressable onPress={() => router.replace("/")}>
                  <Text>Volver al inicio</Text>
                </Pressable>
              )}
              {state === 6 && (
                <Pressable onPress={goBackToGetData}>
                  <Text>Volver a tomar muestras</Text>
                </Pressable>
              )}
            </View>
          ) : (
            <GettingData
              maxSamples={MAX_SAMPLES}
              isCounting={countDown.isCounting}
              counter={countDown.counter}
              pause={countDown.pause}
              restart={countDown.restart}
              samples={samples}
            />
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
    </ScrollView>
  );
};

export default Training;
