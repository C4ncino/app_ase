import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

const useModelsFiles = () => {
  const baseDir = FileSystem.documentDirectory + "models/";

  const saveFile = async (
    jsonObject: object,
    fileName: string
  ): Promise<void> => {
    try {
      // Convierte el objeto JSON a una cadena
      const jsonString = JSON.stringify(jsonObject);

      const dirInfo = await FileSystem.getInfoAsync(baseDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(baseDir, { intermediates: true });
        Alert.alert(
          "Directorio creado",
          `El directorio models fue creado en: ${baseDir}`
        );
      } else {
        Alert.alert("Directorio ya existe", "El directorio models ya existe");
      }

      const filePath = baseDir + fileName;
      // Guarda el archivo codificado en base64 en el sistema de archivos
      await FileSystem.writeAsStringAsync(filePath, jsonString, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      console.log(`Archivo guardado en ${filePath}`);
    } catch (error) {
      console.error("Error codificando JSON a base64: ", error);
      throw error;
    }
  };

  const readFile = async (fileName: string): Promise<object> => {
    try {
      const filePath = baseDir + fileName;
      // Lee el archivo JSON como texto
      const jsonString = await FileSystem.readAsStringAsync(filePath, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // Convierte la cadena de texto a un objeto JSON
      const jsonObject = JSON.parse(jsonString);

      return jsonObject;
    } catch (error) {
      console.error("Error leyendo el archivo JSON: ", error);
      throw error;
    }
  };

  return {
    saveFile,
    readFile,
  };
};

export default useModelsFiles;
