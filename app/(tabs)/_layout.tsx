import { Ionicons } from "@expo/vector-icons";
import DeviceLocalizer from "@/components/DeviceLocalizer";
import { Tabs } from "expo-router";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerRight: () => <DeviceLocalizer />,
        title: "iGlove",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="vocabulary"
        options={{
          title: "Vocabulario",
          tabBarIcon: ({ color }) => (
            <Ionicons name="book" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
