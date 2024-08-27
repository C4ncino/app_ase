import { View, Text } from "react-native";
import { useSessionContext } from "@/hooks/useSessionContext";

const Home = () => {
  const session = useSessionContext();

  return (
    <View className="flex-1">
      <Text className="text-white"> {session.token} </Text>
    </View>
  );
};

export default Home;
