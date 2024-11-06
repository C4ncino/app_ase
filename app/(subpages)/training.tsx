import { useCallback } from "react";
import { View, ScrollView } from "react-native";
import { useFocusEffect, useLocalSearchParams } from "expo-router";

import useTrain from "@/hooks/useTrain";
import { useBleContext } from "@/hooks/useBLEContext";

import NoGloveView from "@/components/ble/NoGloveview";
import GettingData from "@/components/train/GettingData";
import BackendStatus from "@/components/train/BackendStatus";

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
      contentContainerStyle={{ justifyContent: "center", height: "100%" }}
      className="bg-blue-40"
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
        <NoGloveView />
      )}
    </ScrollView>
  );
};

export default Training;
