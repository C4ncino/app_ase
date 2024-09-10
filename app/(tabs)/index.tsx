import { View, Text, TouchableOpacity } from "react-native";
import { useSessionContext } from "@/hooks/useSessionContext";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import TranslateSVG from "@/svgs/Translate";

const Home = () => {
  const session = useSessionContext();

  return (
    <View className=" justify-start bg-blue-40 items-start w-full h-full px-0">
      <TranslateSVG
        width="75%"
        height="22%"
        style={{
          marginHorizontal: "10%",
          marginVertical: "10%",
          marginTop: "50%",
          //   borderWidth: 1,
        }}
      />
      <TouchableOpacity className="ml-12 justify-center items-center bg-white h-14 w-72 rounded-3xl border-2 border-blue-700">
        <Text className=" font-bold text-lg text-blue-800">
          Iniciar traducción
        </Text>
      </TouchableOpacity>

      {/* <View className="flex-1">
      <Text className="text-white"> {session.token} </Text>
      <View className="mx-5 gap-y-3">
        <Link href="/login">
          <Text>Login</Text>
        </Link>
        <Link href="/signup">
          <Text>Sign up</Text>
        </Link>
      </View>
    </View> */}
    </View>
  );
};
export default Home;
