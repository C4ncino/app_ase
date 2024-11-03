import { View, Text, Pressable, Animated } from "react-native";
import { router } from "expo-router";
import TranslateSVG from "@/svgs/Translate";
import MiraSvg from "@/svgs/Mira";
import { useSessionContext } from "@/hooks/useSessionContext";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";

const Home = () => {
  const { wordsCount, updateWordsCount } = useSessionContext();

  useEffect(() => {
    updateWordsCount();
  }, []);

  const bounceValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.spring(bounceValue, {
          toValue: -8,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(bounceValue, {
          toValue: 1,
          friction: 2,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceValue]);

  return (
    <View className="justify-start bg-blue-40 items-center w-full h-full pt-36">
      <View
        style={{
          width: 250,
          height: 250,
          marginLeft: 5,
          borderRadius: 125,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
        className="border-2 border-blue-700"
      >
        <TranslateSVG width="80%" height="80%" />
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 280,
          height: 280,
          position: "absolute",
          top: 167,
        }}
      >
        <MiraSvg width="130%" height="130%" />

        <Pressable
          onPress={() => router.push("/translate")}
          style={
            wordsCount === 0
              ? {
                  marginTop: 26,
                  justifyContent: "center",
                  height: 58,
                  width: 284,
                  borderRadius: 100,
                  borderColor: "#8A9EA8",
                  borderWidth: 2,
                  backgroundColor: "white",
                  shadowColor: "black",
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }
              : ({ pressed }) => [
                  {
                    marginTop: pressed ? 30 : 26,
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
                ]
          }
          // disabled={wordsCount === 0}
        >
          <Text
            className={`w-72 text-center font-bold text-lg ${wordsCount === 0 ? "text-gray-400" : "text-blue-800"}`}
          >
            Iniciar traducción
          </Text>
        </Pressable>
      </View>
      {wordsCount === 0 && (
        <View className="flex-1 pt-36 relative w-screen flex-row justify-center">
          <Text className="text-base font-semibold text-blue-700">
            Debes entrenar al menos una palabra
          </Text>

          <Animated.View
            style={{
              position: "absolute",
              bottom: 0,
              left: "33.33%",
              transform: [{ translateX: -1 }, { translateY: bounceValue }],
            }}
          >
            <Ionicons name="arrow-down" size={34} color="#006699" />
          </Animated.View>
        </View>
      )}
    </View>
  );
};

export default Home;
