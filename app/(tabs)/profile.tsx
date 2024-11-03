import { View, Text, ScrollView } from "react-native";
import { useSessionContext } from "@/hooks/useSessionContext";
import ProfileSvg from "@/svgs/Profile";
import { useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNetworkContext } from "@/hooks/useNetworkContext";

const Home = () => {
  const { user, wordsCount, updateWordsCount } = useSessionContext();
  const network = useNetworkContext();
  useEffect(() => {
    updateWordsCount();
  }, []);

  return (
    <ScrollView className="bg-blue-40">
      {network.isConnected ? (
        <View className="justify-start items-center w-full h-full px-0 pt-3">
          <View
            style={{
              width: 150,
              height: 150,
              marginTop: 15,
              borderRadius: 75,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              position: "absolute",
            }}
          >
            <ProfileSvg width="85%" height="85%" />
          </View>

          <View className="mt-44 w-full items-center">
            <Text className="items-center font-semibold text-lg">
              {user?.name}
            </Text>
            <Text className="items-center  text-lg">{user?.last_name}</Text>
          </View>
          <View className="  mx-9 mt-8 bg-white py-4 rounded-3xl  w-80 h-auto ">
            <View className="flex-row justify-between px-8 mt-4 ">
              <View className="px-24">
                <Text className="items-center font-semibold text-lg">
                  Datos
                </Text>
              </View>
            </View>
            <View className="mt-5 flex-row justify-between items-center mx-4 py-1 border-b-2 border-blue-400 mb-3">
              <Text className=" mb-5- px-4 text-lg   ">E-mail:</Text>
              <Text className=" px-4 text-lg  ">{user?.email}</Text>
            </View>

            <View className="flex-row justify-between items-center mx-4 py-1 border-b-2 border-blue-400 mb-3">
              <Text className=" mb-5- px-4 text-lg   ">Cumpleaños:</Text>
              <Text className=" px-4 text-lg  ">
                {user?.bday.toLocaleDateString()}
              </Text>
            </View>
            <View className="flex-row justify-between items-center mx-4 py-1 border-b-2 border-blue-400 mb-3">
              <Text className=" mb-5- px-4 text-lg   ">Se unió desde:</Text>
              <Text className=" px-4 text-lg  ">
                {user?.creationDate.toLocaleDateString()}
              </Text>
            </View>
            <View className=" flex-row justify-between items-center mx-4 py-1 border-b-2 border-blue-400 mb-6">
              <Text className=" mb-5-  px-4 text-lg   ">
                Número de palabras:
              </Text>
              <Text className=" px-4 text-lg  ">{wordsCount}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View className="items-center justify-center py-32">
          <MaterialIcons name="wifi-off" size={72} color="#006699" />
          <Text className="text-lg">No Internet</Text>
        </View>
      )}
    </ScrollView>
  );
};
export default Home;
