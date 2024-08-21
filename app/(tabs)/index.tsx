import { View, Text } from "react-native";
import { useSessionContext } from "@src/hooks/useSessionContext";

const Home = () => {
  const session = useSessionContext();

  return (
    <View className="flex-1">
      <Text className="text-white"> {session.name} </Text>
    </View>
  );
};

export default Home;
