import {
  View,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useBleContext } from "@/hooks/useBLEContext";
import useTrain from "@/hooks/useTrain";
import GettingData from "@/components/train/GettingData";

const Training = () => {
  const { word } = useLocalSearchParams();

  const { isConnected } = useBleContext();
  const { validate, samples, message, state, goBackToGetData, countDown } =
    useTrain(word as string);

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
              {state === 6 && (
                <Pressable onPress={goBackToGetData}>
                  <Text>Volver a tomar muestras</Text>
                </Pressable>
              )}
            </View>
          ) : (
            <GettingData
              isCounting={countDown.isCounting}
              counter={countDown.counter}
              pause={countDown.pause}
              restart={countDown.restart}
              samples={samples}
            />
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
