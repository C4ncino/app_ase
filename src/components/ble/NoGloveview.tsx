import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NoGloveView = () => {
  return (
    <View className="justify-center items-center w-full pb-32">
      <MaterialCommunityIcons
        name="alert-octagon-outline"
        size={72}
        color="#f55347"
      />
      <Text className="text-lg text-gray-600">No se encontró un guante</Text>
    </View>
  );
};

export default NoGloveView;
