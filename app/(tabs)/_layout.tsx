import { Ionicons } from "@expo/vector-icons";
import DeviceLocalizer from "@src/components/DeviceLocalizer";
import { Tabs } from "expo-router";

const Layout = () => {
  return (
    <Tabs screenOptions={{ headerRight: () => <DeviceLocalizer /> }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
