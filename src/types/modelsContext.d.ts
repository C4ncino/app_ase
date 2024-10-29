type ModelData = {
  json: {
    [key: string]: any;
  };
  weights: {
    [key: string]: string;
  };
};

type Model = {
  meaning: string;
  model_path: string;
};

interface LargeModel extends Model {
  last_update: string;
}

type Models = Record<int, Model>;

type ModelsContextModel = {
  largeModel?: Model;
  smallModels: Models;

  setLargeModel: React.Dispatch<React.SetStateAction<Model | undefined>>;
  addSmallModel: (model: Model, id: number) => void;
  getSmallModel: (id: number) => Model | undefined;
};
