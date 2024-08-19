import { useBleContext } from "@src/hooks/useBLEContext";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

const DeviceLocalizer = () => {
  const [message, setMessage] = useState("");

  const { scan } = useBleContext();

  useEffect(() => {
    scan();
  }, [scan]);

  return (
    <View>
      <Text>DeviceLocalizer</Text>

      {message && <Text>{message}</Text>}
    </View>
  );
};

export default DeviceLocalizer;
