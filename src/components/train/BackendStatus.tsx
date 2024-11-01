import { View, Text, Pressable } from "react-native";
import React from "react";
import {
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ChainedIcons from "../Icons";
import { router } from "expo-router";

interface Props {
  state: number;
  message: string;
  goBackToGetData: () => void;
}

const BackendStatus = ({ state, message, goBackToGetData }: Props) => {
  const params = { size: 50, color: "#006699" };
  const getIconName = () => {
    switch (state) {
      case 1:
        return <FontAwesome6 name="magnifying-glass" {...params} />;
      case 2:
        return <FontAwesome6 name="brain" {...params} />;
      case 3:
        return <Feather name="tool" {...params} />;
      case 4:
        return <Ionicons name="save-outline" {...params} />;
    }
  };
  return (
    <View className="w-full justify-center items-center h-full py-48">
      <Text className="text-lg  mt-4 mb-4">{message}</Text>

      {state >= 1 && state <= 4 && (
        <View className="mt-4">
          <ChainedIcons icon={getIconName()} />
        </View>
      )}

      {state === 5 && (
        <View className="items-center">
          <FontAwesome6 name="circle-check" size={72} color="green" cla />
          <Pressable
            onPress={() => router.replace("/")}
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
              Volver al inicio
            </Text>
          </Pressable>
        </View>
      )}
      {state === 6 && (
        <View className="items-center">
          <MaterialCommunityIcons
            name="alert-octagon-outline"
            size={72}
            color="#f55347"
          />
          <Pressable
            onPress={goBackToGetData}
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
              Volver a tomar muestras
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default BackendStatus;
