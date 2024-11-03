import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import DeviceLocalizer from "@/components/DeviceLocalizer";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import LogoutButton from "@/components/auth/LogoutButton";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerRight: () => <DeviceLocalizer />,
        headerTitle: () => <Text className="text-xl font-bold">iGlove</Text>,
        tabBarActiveTintColor: "#0088cc",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarStyle: {
          height: 58, // Ajusta la altura de la barra de pestañas
          paddingBottom: 6, // Opcional: agrega un poco de relleno inferior
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name="hands-asl-interpreting"
              color={focused ? "#0088cc" : color}
              size={focused ? 27 : 24}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 12 : 11,
                fontWeight: focused ? "bold" : "normal",
                color: focused ? "#0088cc" : "#8e8e93",
              }}
            >
              Traducción
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="train"
        options={{
          title: "Entrenamiento",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="brain"
              color={focused ? "#0088cc" : color}
              size={focused ? 27 : 24}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 12 : 11,
                fontWeight: focused ? "bold" : "normal",
                color: focused ? "#0088cc" : "#8e8e93",
              }}
            >
              Entrenamiento
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="vocabulary"
        options={{
          title: "Vocabulario",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="book"
              color={focused ? "#0088cc" : color}
              size={focused ? 27 : 24}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 12 : 11,
                fontWeight: focused ? "bold" : "normal",
                color: focused ? "#0088cc" : "#8e8e93",
              }}
            >
              Vocabulario
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Mi Perfil",
          headerRight: () => <LogoutButton />,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="person"
              color={focused ? "#0088cc" : color}
              size={focused ? 27 : 24}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 12 : 11,
                fontWeight: focused ? "bold" : "normal",
                color: focused ? "#0088cc" : "#8e8e93",
              }}
            >
              Mi Perfil
            </Text>
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
