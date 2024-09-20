import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import TranslateSVG from "@/svgs/Translate";
import { View, Text, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";

const Translate = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePress = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <View className=" bg-blue-40 items-center w-full h-full py-16 px-0">
      <View className="mx-9 bg-blue-30 items-center py-4  rounded-3xl   relative w-80 h-5/6 ">
        <Text className="text-xl text-gray-400  mt-2 mb-2">Traduciendo</Text>
        <View className="flex-1 px-4 mt-2">
          <Text className="text-justify text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non,
            accusamus cum quis explicabo ex ipsa praesentium doloribus. Expedita
            deserunt repellendus esse laborum aperiam tempora autem ratione,
            illum dignissimos atque minus?
          </Text>
        </View>
      </View>

      <Pressable
        className="mt-6 w-24 h-24 justify-center rounded-full bg-white items-center"
        onPress={handlePress}
      >
        {isPlaying ? (
          <Entypo name="controller-play" size={70} color="#35a766" />
        ) : (
          <Entypo name="controller-stop" size={70} color="#d12115" />
        )}
      </Pressable>
    </View>
  );
};
export default Translate;
