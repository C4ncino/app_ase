import { View, ScrollView } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import useTrain from "@/hooks/useTrain";
import { useBleContext } from "@/hooks/useBLEContext";
import GettingData from "@/components/train/GettingData";
import BackendStatus from "@/components/train/BackendStatus";
import NoGloveview from "@/components/NoGloveview";

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
        <NoGloveview />
      )}
    </ScrollView>
  );
};

export default Training;
