import { PropsWithChildren, createContext, useState, useEffect } from "react";
import {
  documentDirectory,
  makeDirectoryAsync,
  getInfoAsync,
  writeAsStringAsync,
  EncodingType,
} from "expo-file-system";
import { loadLayersModel } from "@tensorflow/tfjs";
import {
  Model,
  ModelData,
  Models,
  ModelsContextModel,
} from "@/types/modelsContext";

export const ModelsContext = createContext<ModelsContextModel>({
  saveModel: () => Promise.resolve(""),

  setLargeModel: () => {},
  addSmallModel: () => {},

  getLargeModel: () => Promise.resolve(undefined),
  getSmallModel: () => Promise.resolve(undefined),
});

interface Props extends PropsWithChildren {}

const ModelsContextProvider = ({ children }: Props) => {
  const [largeModel, setLargeModel] = useState<Model>();
  const [smallModels, setSmallModels] = useState<Models>({});
  const baseDir = documentDirectory + "models/";

  useEffect(() => {
    createDir("models/");
  }, []);

  const createDir = async (dirName: string) => {
    const dirInfo = await getInfoAsync(baseDir + dirName);

    if (!dirInfo.exists)
      await makeDirectoryAsync(baseDir + dirName, {
        intermediates: true,
      });

    return baseDir + dirName;
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
        const filePath = path + key + ".bin";

        await writeAsStringAsync(filePath, value, {
          encoding: EncodingType.Base64,
        });
      });

      return jsonFilePath;
    } catch (error) {
      console.error("Error codificando JSON a base64: ", error);
      throw error;
    }
  };

  const addSmallModel = (model: Model, id: number) => {
    setSmallModels({ ...smallModels, [id]: model });
  };

  const load = async (modelPath: string) => {
    const model = await loadLayersModel(modelPath);

    return model;
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

  const modelsContext: ModelsContextModel = {
    saveModel,
    setLargeModel,
    addSmallModel,
    getLargeModel,
    getSmallModel,
  };

  return (
    <ModelsContext.Provider value={modelsContext}>
      {children}
    </ModelsContext.Provider>
  );
};

export default ModelsContextProvider;
