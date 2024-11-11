import {
  PropsWithChildren,
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  documentDirectory,
  makeDirectoryAsync,
  getInfoAsync,
  writeAsStringAsync,
  EncodingType,
  readDirectoryAsync,
  readAsStringAsync,
} from "expo-file-system";
import { loadLayersModel, ready, io } from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";

import {
  LargeModel,
  Model,
  ModelData,
  Models,
  ModelsContextModel,
} from "@/types/modelsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";

export const ModelsContext = createContext<ModelsContextModel>({
  largeModel: undefined,
  smallModels: undefined,
  saveModel: () => Promise.resolve(""),

  setLargeModel: () => {},
  addSmallModel: () => {},

  getSmallModel: () => Promise.resolve(undefined),

  getMeaning: () => "",

  memorizedLargeModel: Promise.resolve(undefined),
});

interface Props extends PropsWithChildren {}

const ModelsContextProvider = ({ children }: Props) => {
  const [largeModel, setLargeModel] = useState<LargeModel>();
  const [smallModels, setSmallModels] = useState<Models>();
  const baseDir = documentDirectory + "models/";

  async function logAllFilesInDirectory(directoryUri: string) {
    try {
      const files = await readDirectoryAsync(directoryUri);

      for (const file of files) {
        const fileUri = `${directoryUri}/${file}`;
        const fileInfo = await getInfoAsync(fileUri);

        if (fileInfo.isDirectory) await logAllFilesInDirectory(fileUri);
        else console.log("🚀 ~ logAllFilesInDirectory ~ fileUri:", fileUri);
      }
    } catch (error) {
      console.error("Error reading directory:", error);
    }
  }

  useEffect(() => {
    createDir("models");
    // logAllFilesInDirectory(baseDir);

    const loadModelsInfo = async () => {
      await ready();

      const largeModelJson = await AsyncStorage.getItem("largeModel");
      const smallModelsJson = await AsyncStorage.getItem("smallModels");
      console.log("🚀 ~ loadModelsInfo ~ smallModelsJson:", smallModelsJson);

      if (largeModelJson) setLargeModel(JSON.parse(largeModelJson));
      if (smallModelsJson) setSmallModels(JSON.parse(smallModelsJson));
    };

    loadModelsInfo();
  }, []);

  useEffect(() => {
    console.log("🚀 ~ ModelsContextProvider ~ largeModel:", largeModel);
    if (!largeModel) return;

    const saveLargeModel = async () => {
      await AsyncStorage.setItem("largeModel", JSON.stringify(largeModel));
    };

    saveLargeModel();
  }, [largeModel]);

  useEffect(() => {
    console.log("🚀 ~ saveSmallModels ~ smallModels:", smallModels);
    if (!smallModels) return;

    const saveSmallModels = async () => {
      await AsyncStorage.setItem("smallModels", JSON.stringify(smallModels));
    };

    saveSmallModels();
  }, [smallModels]);

  const createDir = async (dirName: string) => {
    const dirInfo = await getInfoAsync(baseDir + dirName);

    if (!dirInfo.exists)
      await makeDirectoryAsync(baseDir + dirName, {
        intermediates: true,
      });

    return baseDir + dirName + "/";
  };

  const saveModel = async (
    modelData: ModelData,
    dirName: string
  ): Promise<string> => {
    try {
      const path = await createDir(dirName);

      const jsonFilePath = path + "model.json";

      const jsonString = JSON.stringify(modelData.json);

      await writeAsStringAsync(jsonFilePath, jsonString, {
        encoding: EncodingType.UTF8,
      });

      Object.entries(modelData.weights).map(async ([key, value]) => {
        const filePath = path + key;

        await writeAsStringAsync(filePath, value, {
          encoding: EncodingType.Base64,
        });
      });

      return path;
    } catch (error) {
      console.error("Error codificando JSON a base64: ", error);
      throw error;
    }
  };

  const addSmallModel = (model: Model, id: number) =>
    setSmallModels((previous) => {
      if (!previous) return { [id]: model };
      previous[id] = model;
      return previous;
    });

  const readBinaryFile = async (filePath: string) => {
    const base64String = await readAsStringAsync(filePath, {
      encoding: EncodingType.Base64,
    });

    const binaryString = atob(base64String);

    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
  };

  const load = useCallback(async (modelPath?: string) => {
    if (!modelPath) return;

    const modelJson = await readAsStringAsync(modelPath + "model.json", {
      encoding: EncodingType.UTF8,
    });

    const data = JSON.parse(modelJson);

    const manifest = data["weightsManifest"][0].weights;

    const model = await loadLayersModel(io.fromMemory(data));

    const arrayBuffer = await readBinaryFile(modelPath + "weights.bin");

    const weightsInfo = io.decodeWeights(arrayBuffer, manifest);

    const weightsTensor = Object.values(weightsInfo);

    model.setWeights(weightsTensor);

    return model;
  }, []);

  const getSmallModel = async (id: number) => {
    if (!smallModels) return undefined;

    const modelInfo = smallModels[id];

    if (!modelInfo) return undefined;

    return await load(modelInfo.model_path);
  };

  const getMeaning = (id: number) =>
    smallModels ? smallModels[id].meaning : "";

  const memorizedLargeModel = useMemo(() => {
    return load(largeModel?.model_path);
  }, [largeModel, load]);

  const modelsContext: ModelsContextModel = {
    smallModels,
    largeModel,
    saveModel,
    setLargeModel,
    addSmallModel,
    getSmallModel,
    getMeaning,
    memorizedLargeModel,
  };

  return (
    <ModelsContext.Provider value={modelsContext}>
      {children}
    </ModelsContext.Provider>
  );
};

export default ModelsContextProvider;
