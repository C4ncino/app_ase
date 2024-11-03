import { LayersModel } from "@tensorflow/tfjs";

type ModelData = {
  json: {
    [key: string]: any;
  };
  weights: {
    [key: string]: string;
  };
};

type ClassKey = number;

type Model = {
  meaning?: string;
  model_path: string;
};

interface LargeModel extends Model {
  last_update: string;
}

type Models = Record<ClassKey, Model>;

type ModelsContextModel = {
  largeModel?: LargeModel;
  smallModels?: Models;

  saveModel: (modelData: ModelData, dirName: string) => Promise<string>;

  setLargeModel: React.Dispatch<React.SetStateAction<LargeModel | undefined>>;
  addSmallModel: (model: Model, id: number) => void;

  getSmallModel: (id: number) => Promise<LayersModel | undefined>;

  getMeaning: (id: number) => string | undefined;

  memorizedLargeModel: Promise<LayersModel | undefined>;
};
