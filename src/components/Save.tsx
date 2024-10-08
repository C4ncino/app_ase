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
    const dirPath = `${FileSystem.documentDirectory}my_files/`;

    try {
      // Crear el directorio si no existe
      const dirInfo = await FileSystem.getInfoAsync(dirPath);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });
        Alert.alert(
          "Directorio creado",
          `El directorio my_files fue creado en: ${dirPath}`
        );
      } else {
        Alert.alert("Directorio ya existe", "El directorio my_files ya existe");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo crear el directorio");
      console.error(error);
    }

    const path = `${FileSystem.documentDirectory}my_files/${fileName}`;

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
  const listFiles = async () => {
    try {
      // Leer el contenido del directorio de documentos
      const filesList = await FileSystem.readDirectoryAsync(
        `${FileSystem.documentDirectory}my_files/`
      );
      filesList.map((file) => {
        console.log(file);
      });
      Alert.alert(
        "Archivos listados",
        "Archivos en el directorio listados correctamente."
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo leer el directorio");
      console.error(error);
    }
  };
  return (
    <View>
      <Button title="Guardar archivo" onPress={saveFile} />
      <Button title="Listar archivos" onPress={listFiles} />
    </View>
  );
};

export default SaveBase64ToFile;
