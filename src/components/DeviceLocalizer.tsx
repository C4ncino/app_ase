import { AntDesign } from "@expo/vector-icons";
import { useBleContext } from "@/hooks/useBLEContext";
import { bleMessages } from "@/messages/bleMessages";
import { useState } from "react";
import { View, Text, Modal, Button } from "react-native";

const DeviceLocalizer = () => {
  const [open, setOpen] = useState(false);
  const [found, setFound] = useState(false);
  const [message, setMessage] = useState("");

  const { scan, connect } = useBleContext();

  const onOpen = () => {
    setOpen(true);

    setTimeout(async () => {
      setFound(true);
    }, 2000);

    scan(setMessage);
  };

  const connectToDevice = async () => {
    const response = await connect();

    if (response === 1) {
      setMessage(bleMessages[1]);
      return;
    } else if (response === 2) {
      setMessage(bleMessages[4]);
      return;
    }
    setFound(false);
  };

  return (
    <>
      <View className="mx-4">
        <Button onPress={onOpen} title="Conectar" />
      </View>

      <Modal visible={open}>
        <View className="flex-row justify-between mx-4 mt-3">
          <Text className="text-lg font-bold">Buscar Guante</Text>
          <Button onPress={() => setOpen(false)} title="Cerrar" />
        </View>

        <View className="mx-4 justify-center items-center">
          {/* TODO: Animate loading */}
          <View>
            <AntDesign name="loading1" size={50} color="black" />
          </View>
          {message && <Text>{message}</Text>}

          {found && <Button title="Conectar" onPress={connectToDevice} />}
        </View>
      </Modal>
    </>
  );
};

export default DeviceLocalizer;
