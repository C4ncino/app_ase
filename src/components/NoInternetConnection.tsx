import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const NoInternetConnection = () => {
  return (
    <View className="items-center justify-center py-32">
      <MaterialIcons name="wifi-off" size={72} color="#006699" />
      <Text className="text-lg">No Internet</Text>
    </View>
  );
};

export default NoInternetConnection;
