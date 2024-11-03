import { useCallback } from "react";
import { View, ScrollView, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams } from "expo-router";

import useTrain from "@/hooks/useTrain";
import { useBleContext } from "@/hooks/useBLEContext";
import { useNetworkContext } from "@/hooks/useNetworkContext";

import NoGloveView from "@/components/ble/NoGloveview";
import GettingData from "@/components/train/GettingData";
import BackendStatus from "@/components/train/BackendStatus";

const Training = () => {
  const { word } = useLocalSearchParams();

  const network = useNetworkContext();

  const { isConnected, setReceiving } = useBleContext();
  const { samples, message, state, goBackToGetData, countDown, MAX_SAMPLES } =
    useTrain(word as string);

  useFocusEffect(
    useCallback(() => {
      network.lookForConnection();
      return () => setReceiving(false);
    }, [])
  );

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center" }}
      className="w-full  h-full bg-blue-40"
    >
      {network.isConnected ? (
        <>
          {isConnected ? (
            <View className="items-center bg-blue-40 w-full h-full py-6 px-6">
              {state > 0 ? (
                <BackendStatus
                  message={message}
                  state={state}
                  goBackToGetData={goBackToGetData}
                />
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
            <NoGloveView />
          )}
        </>
      ) : (
        <View className="items-center justify-center py-32">
          <MaterialIcons name="wifi-off" size={72} color="#006699" />
          <Text className="text-lg">No Internet</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Training;
