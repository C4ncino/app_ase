import { useAPI } from "@src/hooks/useAPI";
import { useSessionContext } from "@src/hooks/useSessionContext";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBleContext } from "@src/hooks/useBLEContext";

const Home = () => {
  const session = useSessionContext();
  const insets = useSafeAreaInsets();

  const { scan, requestPermissions } = useBleContext();

  const { post } = useAPI();

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scan();
    }
  };

  useEffect(() => {
    const get_data = async () => {
      const response = await post(
        "/users/login",
        JSON.stringify({
          username: "emilys",
          password: "emilyspass",
          expiresInMins: 30,
        })
      );
      console.log("🚀 ~ useEffect ~ response:", response);
    };

    get_data();
    scanForDevices();
  }, [post]);

  console.log("Hola");

  return (
    <View className="flex-1" style={{ paddingTop: insets.top }}>
      <Text className="text-white"> {session.name} </Text>
    </View>
  );
};

export default Home;
