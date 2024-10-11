import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import TrainSvg from "@/svgs/Train";
import CirculoSvg from "@/svgs/Marcos";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

const Train = () => {
  const [word, stword] = useState("");
  const [error, seterror] = useState(false);

  const handleSubmit = () => {
    if (word.trim()) {
      seterror(false);
      router.push(`/training?word=${word}`);
    } else {
      seterror(true);
    }
    // const nada = "AAAAAAAAAAAAAAAAAaa";

    // Validar que haya algo escrito
    // NO Muestras error
    // SI mueves ruta
  };

  useFocusEffect(
    useCallback(() => {
      stword("");
    }, [])
  );

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center" }}
      className="w-full  h-full bg-blue-40"
    >
      <View className="items-center bg-blue-40 w-full h-full py-6 px-6">
        <Text className="mt-3 font-semibold text-lg text-blue-800">
          Entrena la palabra que desees
        </Text>

        <View className="justify-center items-center relative mb-24">
          <View
            style={{
              width: 170,
              height: 170,

              marginTop: 98,
              borderRadius: 100,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
            className="border-2 border-blue-600 border-opacity-100"
          >
            <TrainSvg width="100%" height="100%" />
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 280,
              height: 280,
              position: "absolute",
              top: 43,
            }}
          >
            <CirculoSvg width="120%" height="120%" />
          </View>
        </View>

        <Pressable
          onPress={handleSubmit}
          className="mt-5 justify-center bg-white h-14 w-72 rounded-3xl border-2 border-blue-700"
        >
          <Text className="w-72 text-center font-bold text-lg text-blue-800">
            Iniciar entrenamiento
          </Text>
        </Pressable>

        <View className="mt-6 w-72 h-14 bg-white flex-row items-center rounded-3xl px-10 focus:border-2 focus:border-blue-300">
          <TextInput
            placeholder="Ingresa la palabra nueva"
            className="items-center text-lg text-center"
            value={word}
            onChangeText={(text) => stword(text)}
          />
        </View>
        {error && word === "" && (
          <Text className="text-red-400 text-center mt-2">
            Por favor, ingresa una palabra
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Train;
