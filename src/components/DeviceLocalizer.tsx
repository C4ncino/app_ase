import { useBleContext } from "@/hooks/useBLEContext";
import { bleMessages } from "@/messages/bleMessages";
import { useState } from "react";
import { View, Text, Modal, Button, ActivityIndicator } from "react-native";

const DeviceLocalizer = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { scan, stopScan, connect, forget, setReceiving } = useBleContext();

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
          <Button
            onPress={() => {
              setOpen(false);
              stopScan();
            }}
            title="Cerrar"
          />
        </View>

        <View className="mx-4 justify-center items-center my-2">
          {/* TODO: Animate loading */}
          <ActivityIndicator size={64} color="#00f" />
          {message && <Text>{message}</Text>}
          {message && (
            <Button
              title="Conectar"
              onPress={() => connect(setMessage)}
              disabled={message === bleMessages[0]}
            />
          )}
        </View>
        <Button title="Olvidar" onPress={() => forget(setMessage)} />
      </Modal>
    </>
  );
};

export default DeviceLocalizer;
