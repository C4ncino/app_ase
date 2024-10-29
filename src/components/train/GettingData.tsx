import { View, Text, Pressable, StyleSheet } from "react-native";
import CirculoSvg from "@/svgs/Marcos";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  isCounting: boolean;
  counter: number;
  pause: () => void;
  restart: () => void;
  samples: number;
}

const GettingData = ({
  isCounting,
  counter,
  pause,
  restart,
  samples,
}: Props) => {
  return (
    <>
      <Text className=" mt-3 font-semibold text-lg text-blue-800">
        El entrenamiento comienza en:
      </Text>
      <View className="justify-center items-center relative my-28 w-screen h-40 pt-2">
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 280,
            height: 280,
            position: "absolute",
          }}
        >
          <CirculoSvg width="120%" height="120%" />
        </View>
        <View className="mt-4">
          {isCounting ? (
            <Text className=" font-semibold text-9xl text-blue-800">
              {counter >= 0 ? counter : 0}
            </Text>
          ) : (
            <Ionicons
              name="pause"
              size={120}
              color="gray"
              style={{ top: -12 }}
            />
          )}
        </View>
      </View>
      {isCounting ? (
        <Pressable
          onPress={pause}
          style={({ pressed }) => [
            styles.baseStyle,
            pressed ? styles.pressedStyle : styles.shadowStyle,
            { backgroundColor: "#fdba74" },
          ]}
        >
          <Text className="w-72 text-center font-bold text-lg text-white">
            Pausar
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={restart}
          style={({ pressed }) => [
            styles.baseStyle,
            pressed ? styles.pressedStyle : styles.shadowStyle,
            { backgroundColor: "#33bbff" },
          ]}
        >
          <Text className="w-72 text-center font-bold text-lg text-white">
            Continuar
          </Text>
        </Pressable>
      )}
      <View className="mt-5 w-72 h-14 flex-row items-center justify-center">
        <Text className="items-center text-lg text-gray-500 ">
          {samples} / 20
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  baseStyle: {
    justifyContent: "center",
    height: 58,
    width: 284,
    borderRadius: 100,
    backgroundColor: "#fdba74",
    marginTop: 26,
  },
  shadowStyle: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pressedStyle: {
    height: 54,
    shadowColor: "",
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    marginTop: 30,
  },
});

export default GettingData;
