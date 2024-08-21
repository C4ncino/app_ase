import { AntDesign } from "@expo/vector-icons";
import { useBleContext } from "@src/hooks/useBLEContext";
import { useState } from "react";
import { View, Text, Modal, Button } from "react-native";

const DeviceLocalizer = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { scan } = useBleContext();

  const onOpen = () => {
    setOpen(true);
    scan(setMessage);
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
        </View>
      </Modal>
    </>
  );
};

export default DeviceLocalizer;
