type Model = {
  meaning: string;
  model_path: string;
};

type Models = Record<int, Model>;

type ModelsContextModel = {
  largeModel?: Model;
  smallModels: Models;

  setLargeModel: React.Dispatch<React.SetStateAction<Model | undefined>>;
  addSmallModel: (model: Model, id: number) => void;
  getSmallModel: (id: number) => Model | undefined;
};
