import { PropsWithChildren, createContext, useState } from "react";

export const ModelsContext = createContext<ModelsContextModel>({
  largeModel: undefined,
  smallModels: {},
  setLargeModel: () => {},
  addSmallModel: () => {},
  getSmallModel: () => undefined,
});

interface Props extends PropsWithChildren {}

const ModelsContextProvider = ({ children }: Props) => {
  const [largeModel, setLargeModel] = useState<Model>();

  const [smallModels, setSmallModels] = useState<Models>({});

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
  };

  return (
    <ModelsContext.Provider value={modelsContext}>
      {children}
    </ModelsContext.Provider>
  );
};

export default ModelsContextProvider;
