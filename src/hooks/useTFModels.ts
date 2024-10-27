import { documentDirectory } from "expo-file-system";
import * as tf from "@tensorflow/tfjs";

const useTFModels = () => {
  const baseDir = documentDirectory + "models/";

  const load = async () => {
    const filePath = baseDir + "";

    const model = await tf.loadLayersModel(filePath);

    console.log(model);
  };

  return {
    load,
  };
};

export default useTFModels;
