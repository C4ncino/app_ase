import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import TrainSvg from "@/svgs/Train";
import CirculoSvg from "@/svgs/Marcos";
import { router } from "expo-router";
import { useState } from "react";

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
              width: 180,
              height: 180,

              marginTop: 98,
              borderRadius: 100,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
            className="border-2 border-blue-500 border-opacity-50"
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

        <View className="mt-2 w-72 h-14 bg-white flex-row items-center rounded-3xl px-10 focus:border-2 focus:border-blue-300">
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
        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            {
              marginTop: pressed ? 26 : 22,
              justifyContent: "center",
              height: pressed ? 54 : 58,
              width: pressed ? 280 : 284,
              borderRadius: 100,
              borderColor: "#006699",
              borderWidth: 2,
              backgroundColor: "white",
              shadowColor: pressed ? "" : "black",
              shadowOpacity: pressed ? 0 : 0.25,
              shadowRadius: pressed ? 0 : 3.84,
              elevation: pressed ? 0 : 5,
            },
          ]}
        >
          <Text className="w-72 text-center font-bold text-lg text-blue-800">
            Iniciar entrenamiento
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Train;
