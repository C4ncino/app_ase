import { View, Text } from "react-native";
import { useSessionContext } from "@/hooks/useSessionContext";
import { Link } from "expo-router";

const Home = () => {
  const session = useSessionContext();

  return (
    <View className="flex-1">
      <Text className="text-white"> {session.token} </Text>
      <View className="mx-5 gap-y-3">
        <Link href="/login">
          <Text>Login</Text>
        </Link>
        <Link href="/signup">
          <Text>Sign up</Text>
        </Link>
      </View>
    </View>
  );
};

export default Home;
