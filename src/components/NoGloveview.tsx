import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NoGloveview = () => {
  return (
    <View className="justify-center items-center w-full mt-72 mb-4">
      <MaterialCommunityIcons
        name="alert-octagon-outline"
        size={72}
        color="#f55347"
      />
      <Text className="text-lg text-gray-600">No se encontró un guante</Text>
    </View>
  );
};

export default NoGloveview;
