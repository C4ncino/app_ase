import { useSessionContext } from "@/hooks/useSessionContext";
import { View, Text, Button } from "react-native";

const LogoutButton = () => {
  const { logout } = useSessionContext();

  return (
    <View className="mr-4">
      <Button title="Logout" onPress={logout} color={"red"} />
    </View>
  );
};

export default LogoutButton;
