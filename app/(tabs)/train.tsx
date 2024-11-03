import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";

import TrainSvg from "@/svgs/Train";
import CirculoSvg from "@/svgs/Marcos";

import useAPI from "@/hooks/useAPI";
import { useSessionContext } from "@/hooks/useSessionContext";
import { useNetworkContext } from "@/hooks/useNetworkContext";
import NoInternetConnection from "@/components/NoInternetConnection";

const Train = () => {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const { token, user } = useSessionContext();
  const { get } = useAPI();

  const network = useNetworkContext();

  useEffect(() => {
    network.lookForConnection();
  }, []);

  const handleSubmit = async () => {
    setIsFetching(true);
    if (word.trim()) {
      setError("");

      const response = await get(
        `words/exists/${user?.id}/${word.toLowerCase()}`,
        token
      );

      if (!response) setError("Hubo un problema de conexión");

      if (!response.exists) router.push(`/training?word=${word.toLowerCase()}`);
      else setError("La palabra ya existe");
    } else {
      setError("Por favor ingresa una palabra");
    }
    setIsFetching(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center" }}
      className="w-full  h-full bg-blue-40"
    >
      {network.isConnected ? (
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
              onChangeText={setWord}
            />
          </View>
          {error && (
            <Text className="text-red-400 text-center mt-2">{error}</Text>
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
            {isFetching ? (
              <ActivityIndicator size={24} color={"#006699"} />
            ) : (
              <Text className="w-72 text-center font-bold text-lg text-blue-800">
                Iniciar entrenamiento
              </Text>
            )}
          </Pressable>
        </View>
      ) : (
        <NoInternetConnection />
      )}
    </ScrollView>
  );
};

export default Train;
