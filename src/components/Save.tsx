import React from "react";
import { Button, View, Alert } from "react-native";
import * as FileSystem from "expo-file-system";

interface Props {
  base64Data: string;
  fileName: string;
}

const SaveBase64ToFile = ({ base64Data, fileName }: Props) => {
  const saveFile = async () => {
    // El directorio de documentos donde se guardará el archivo
    const path = `${FileSystem.documentDirectory}${fileName}`;

    try {
      // Escribir el archivo
      await FileSystem.writeAsStringAsync(path, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      Alert.alert("Archivo guardado", `El archivo se guardó en: ${path}`);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el archivo");
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Guardar archivo" onPress={saveFile} />
    </View>
  );
};

export default SaveBase64ToFile;
