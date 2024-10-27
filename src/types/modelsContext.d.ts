import { LayersModel } from "@tensorflow/tfjs";

type ModelData = {
  json: {
    [key: string]: any;
  };
  weights: {
    [key: string]: string;
  };
};

type Model = {
  meaning?: string;
  model_path: string;
};

interface LargeModel extends Model {
  last_update: string;
}

type Models = Record<int, Model>;

type ModelsContextModel = {
  saveModel: (modelData: ModelData, dirName: string) => Promise<string>;

  setLargeModel: React.Dispatch<React.SetStateAction<Model | undefined>>;
  addSmallModel: (model: Model, id: number) => void;

  getLargeModel: () => Promise<LayersModel | undefined>;
  getSmallModel: (id: number) => Promise<LayersModel | undefined>;
};
