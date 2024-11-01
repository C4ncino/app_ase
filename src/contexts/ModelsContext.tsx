import { PropsWithChildren, createContext, useState, useEffect } from "react";
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
import useAPI from "@/hooks/useAPI";

export const ModelsContext = createContext<ModelsContextModel>({
  largeModel: undefined,
  smallModels: {},
  saveModel: () => Promise.resolve(""),

  setLargeModel: () => {},
  addSmallModel: () => {},

  getLargeModel: () => Promise.resolve(undefined),
  getSmallModel: () => Promise.resolve(undefined),

  getMeaning: () => "",
});

interface Props extends PropsWithChildren {}

const ModelsContextProvider = ({ children }: Props) => {
  const [largeModel, setLargeModel] = useState<LargeModel>();
  const [smallModels, setSmallModels] = useState<Models>({});
  const baseDir = documentDirectory + "models/";

  const { post } = useAPI();

  async function logAllFilesInDirectory(directoryUri: string) {
    try {
      const files = await readDirectoryAsync(directoryUri);

      for (const file of files) {
        const fileUri = `${directoryUri}/${file}`;
        const fileInfo = await getInfoAsync(fileUri);

        if (fileInfo.isDirectory) {
          await logAllFilesInDirectory(fileUri);
        } else {
          console.log("File:", fileUri);
        }
      }
    } catch (error) {
      console.error("Error reading directory:", error);
    }
  }

  useEffect(() => {
    createDir("models");
    logAllFilesInDirectory(baseDir);

    const loadModelsInfo = async () => {
      await ready();

      const largeModelJson = await AsyncStorage.getItem("largeModel");
      const smallModelsJson = await AsyncStorage.getItem("smallModels");

      if (largeModelJson) setLargeModel(JSON.parse(largeModelJson));
      if (smallModelsJson) setSmallModels(JSON.parse(smallModelsJson));
    };

    loadModelsInfo();
  }, []);

  useEffect(() => {
    console.log("🚀 ~ ModelsContextProvider ~ largeModel:", largeModel);

    const saveLargeModel = async () => {
      const response = await post(
        "models/check_version/1",
        JSON.stringify({
          date: "30-10-2024 00:00:00",
        })
      );

      if (!response) return;

      console.log(
        "🚀 ~ ModelsContextProvider ~ saveLargeModel ~ response:",
        response.latest_model.model
      );
      const modelPath = await saveModel(
        response.latest_model.model,
        "generalModel"
      );
      console.log("🚀 ~ saveLargeModel ~ modelPath:", modelPath);

      if (!largeModel) return;
      largeModel.model_path =
        "file:///data/user/0/com.tr.ibero/files/models//generalModel/";
      await AsyncStorage.setItem("largeModel", JSON.stringify(largeModel));
    };

    saveLargeModel();
  }, []);

  useEffect(() => {
    console.log("🚀 ~ saveSmallModels ~ smallModels:", smallModels);

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

  const addSmallModel = (model: Model, id: number) => {
    setSmallModels({ ...smallModels, [id]: model });
  };

  const load = async (modelPath: string) => {
    console.log("🚀 ~ load ~ modelPath:", modelPath);
    const files = await readDirectoryAsync(modelPath);

    console.log("🚀 ~ load ~ files:", files);

    const jsonFile = modelPath + "model.json";
    const binFile = modelPath + "mi_modelo_gru.weights.bin";

    const modelJson = await readAsStringAsync(modelPath + "model.json", {
      encoding: EncodingType.UTF8,
    });

    const data = JSON.parse(modelJson);

    const weights = await readAsStringAsync(
      modelPath + "mi_modelo_gru.weights.bin",
      {
        encoding: EncodingType.Base64,
      }
    );

    const model2 = await loadLayersModel(data);

    console.log("🚀 ~ load ~ model2:", JSON.stringify(model2.summary()));
    const layers = model2.layers;
    layers.forEach((layer) => {
      const weights = layer.getWeights();
      console.log(`Layer: ${layer.name}, Weights:`, weights);
    });

    // console.log("🚀 ~ load ~ model:", model);

    // model.setWeights

    return model2;
  };

  const getLargeModel = async () => {
    if (!largeModel) return undefined;

    return await load(largeModel.model_path);
  };

  const getSmallModel = async (id: number) => {
    const modelInfo = smallModels[id];

    if (!modelInfo) return undefined;

    return await load(modelInfo.model_path);
  };

  const getMeaning = (id: number) => smallModels[id].meaning;

  const modelsContext: ModelsContextModel = {
    smallModels,
    largeModel,
    saveModel,
    setLargeModel,
    addSmallModel,
    getLargeModel,
    getSmallModel,
    getMeaning,
  };

  return (
    <ModelsContext.Provider value={modelsContext}>
      {children}
    </ModelsContext.Provider>
  );
};

export default ModelsContextProvider;
