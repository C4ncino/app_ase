import { PropsWithChildren, createContext, useState, useEffect } from "react";
import {
  documentDirectory,
  makeDirectoryAsync,
  getInfoAsync,
  writeAsStringAsync,
  EncodingType,
} from "expo-file-system";

export const ModelsContext = createContext<ModelsContextModel>({
  largeModel: undefined,
  smallModels: {},
  setLargeModel: () => {},
  addSmallModel: () => {},
  getSmallModel: () => undefined,
  saveModel: () => Promise.resolve(),
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
  ): Promise<void> => {
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
    } catch (error) {
      console.error("Error codificando JSON a base64: ", error);
      throw error;
    }
  };

  const addSmallModel = (model: Model, id: number) => {
    setSmallModels({ ...smallModels, [id]: model });
  };

  const getSmallModel = (id: number) => smallModels[id];

  const modelsContext: ModelsContextModel = {
    largeModel,
    smallModels,
    setLargeModel,
    addSmallModel,
    getSmallModel,
    saveModel,
  };

  return (
    <ModelsContext.Provider value={modelsContext}>
      {children}
    </ModelsContext.Provider>
  );
};

export default ModelsContextProvider;
