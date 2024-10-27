import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import TranslateSVG from "@/svgs/Translate";
import MiraSvg from "@/svgs/Mira";

const Home = () => {
  return (
    <View className="justify-start bg-blue-40 items-center w-full h-full pt-36 ">
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
          style={({ pressed }) => [
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
          ]}
        >
          <Text className="w-72 text-center font-bold text-lg text-blue-800">
            Iniciar traducción
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;
