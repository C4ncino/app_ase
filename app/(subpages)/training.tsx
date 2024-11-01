import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useCallback } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6, Feather } from "@expo/vector-icons";
import useTrain from "@/hooks/useTrain";
import { useBleContext } from "@/hooks/useBLEContext";
import GettingData from "@/components/train/GettingData";
import ChainedIcons from "@/components/Icons";

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
    <ScrollView
      contentContainerStyle={{ justifyContent: "center" }}
      className="w-full  h-full bg-blue-40"
    >
      {/* {isConnected ? ( */}
      <View className="items-center bg-blue-40 w-full h-full py-6 px-6">
        {/* {state > 0 ? ( */}
        <View className="w-full justify-center items-center h-full py-48">
          {/* <ActivityIndicator size={42} color="#0088cc" /> */}
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
        {/* ) : (
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
           )} */}
      </View>
    </ScrollView>
  );
};

export default Training;
