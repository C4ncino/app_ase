import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import DeviceLocalizer from "@/components/DeviceLocalizer";
import { Tabs } from "expo-router";
import { Text } from "react-native";
import LogoutButton from "@/components/auth/LogoutButton";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerRight: () => <DeviceLocalizer />,
        headerTitle: () => <Text className="text-xl font-bold">iGlove</Text>,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Traducción",
          tabBarIcon: ({ color }) => (
            <FontAwesome6
              name="hands-asl-interpreting"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="train"
        options={{
          title: "Entrenamiento",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="brain" size={24} color={color} />
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

      <Tabs.Screen
        name="profile"
        options={{
          title: "Mi Perfil",
          headerRight: () => <LogoutButton />,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
