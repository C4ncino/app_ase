import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useBleContext } from "@/hooks/useBLEContext";
import useTrain from "@/hooks/useTrain";
import GettingData from "@/components/train/GettingData";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
      {/* <Button title="Validar" onPress={validate} /> */}
    </ScrollView>
  );
};

export default Training;
