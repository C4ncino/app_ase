import DeviceLocalizer from "@/components/ble/DeviceLocalizer";
import { Stack } from "expo-router";
import { Text } from "react-native";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerRight: () => <DeviceLocalizer />,
        headerTitle: () => <Text className="text-xl font-bold">iGlove</Text>,
      }}
    />
  );
};

export default Layout;
