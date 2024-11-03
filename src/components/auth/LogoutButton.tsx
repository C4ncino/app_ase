import { View, Text, Pressable } from "react-native";
import { useSessionContext } from "@/hooks/useSessionContext";

const LogoutButton = () => {
  const { logout } = useSessionContext();

  return (
    <View className="mr-4">
      <Pressable
        className="rounded-full W-auto h-10 justify-center items-center px-4"
        onPress={logout}
      >
        <Text className="font-semibold text-red-300 text-base">
          {" "}
          Cerrar sesión
        </Text>
      </Pressable>
    </View>
  );
};

export default LogoutButton;
