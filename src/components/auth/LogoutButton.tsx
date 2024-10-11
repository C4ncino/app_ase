import { useSessionContext } from "@/hooks/useSessionContext";
import { View, Text, Button, Pressable } from "react-native";

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
      {/* <Button title="Logout" onPress={logout} color={"red"} /> */}
    </View>
  );
};

export default LogoutButton;
