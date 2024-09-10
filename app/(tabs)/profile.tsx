import { View, Text, TouchableOpacity } from "react-native";
import { useSessionContext } from "@/hooks/useSessionContext";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileSvg from "@/svgs/Profile";
import { Feather } from "@expo/vector-icons";

const Home = () => {
  const session = useSessionContext();
  return (
    <View className="justify-start bg-blue-40 items-start w-full h-full px-0">
      <ProfileSvg
        width="75%"
        height="20%"
        style={{
          marginHorizontal: "12%",
          marginVertical: "10%",
          borderWidth: 2,
        }}
      />
      <View className="w-full items-center">
        <Text className="items-center font-semibold text-lg">Carlos</Text>
        <Text className="items-center  text-lg">Cancino Escobar</Text>
      </View>
      <View className="  mx-9 mt-8 bg-white py-4 rounded-3xl  w-80 h-auto ">
        <View className="flex-row justify-between px-8 mt-4 ">
          <View className="px-24">
            <Text className="items-center font-semibold text-lg">Datos</Text>
          </View>
          <Feather name="edit-3" size={22} color="black" className="" />
        </View>
        <View className="mt-5 flex-row justify-between items-center mx-4 py-1 border-b-2 border-blue-400 mb-3">
          <Text className=" mb-5- px-4 text-lg   ">E-mail:</Text>
          <Text className=" px-4 text-lg  ">g:</Text>
        </View>

        <View className="flex-row justify-between items-center mx-4 py-1 border-b-2 border-blue-400 mb-3">
          <Text className=" mb-5- px-4 text-lg   ">Cumpleaños:</Text>
          <Text className=" px-4 text-lg  ">g:</Text>
        </View>
        <View className="flex-row justify-between items-center mx-4 py-1 border-b-2 border-blue-400 mb-3">
          <Text className=" mb-5- px-4 text-lg   ">Se unió desde:</Text>
          <Text className=" px-4 text-lg  ">g:</Text>
        </View>
        <View className=" flex-row justify-between items-center mx-4 py-1 border-b-2 border-blue-400 mb-6">
          <Text className=" mb-5-  px-4 text-lg   ">Número de palabras:</Text>
          <Text className=" px-4 text-lg  ">g:</Text>
        </View>
      </View>

      <View className="flex-row">
        <Text className="text-white"> {session.token} </Text>
        <View className=" flex row mx-5 gap-y-3">
          <Link href="/login">
            <Text>Login</Text>
          </Link>
          <Link href="/signup">
            <Text>Sign up</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};
export default Home;
