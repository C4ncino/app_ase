import { useSessionContext } from "@src/hooks/useSessionContext";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBleContext } from "@src/hooks/useBLEContext";

const Home = () => {
  const session = useSessionContext();
  const insets = useSafeAreaInsets();

  const { scan, requestPermissions } = useBleContext();

  useEffect(() => {
    const scanForDevices = async () => {
      const isPermissionsEnabled = await requestPermissions();
      if (isPermissionsEnabled) {
        scan();
      }
    };

    scanForDevices();
  }, [requestPermissions, scan]);

  console.log("Hola");

  return (
    <View className="flex-1" style={{ paddingTop: insets.top }}>
      <Text className="text-white"> {session.name} </Text>
    </View>
  );
};

export default Home;
