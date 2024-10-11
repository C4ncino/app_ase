import { Pressable, Text } from "react-native";
import { Entypo, Feather, FontAwesome6, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useBleContext } from "@/hooks/useBLEContext";

const BackFile = () => {
  const { setReceiving } = useBleContext();

  const onPress = () => {
    setReceiving(false);
    console.log("Hola");
    router.push("/");
  };

  return (
    <Pressable onPress={onPress} className="flex-row gap-2 items-center">
      <FontAwesome6 name="arrow-left" size={24} color="black" />
      <Text className="text-xl font-bold">iGlove</Text>
    </Pressable>
  );
};

export default BackFile;
