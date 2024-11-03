import { tensor, Tensor, Rank, tidy } from "@tensorflow/tfjs";
import useBase64 from "./useBase64";
import { useModelsContext } from "./useModelsContext";

export const useTranslate = (
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  const { decodeForTranslate } = useBase64();
  const { memorizedLargeModel, getSmallModel, getMeaning } = useModelsContext();
  const threshold = 0.5;

  const getInput = (rawData: RawMovement) => {
    const data = decodeForTranslate(rawData);

    return tensor([data], [1, 60, 8]);
  };

  const getLargePredictions = async (input: Tensor) => {
    const model = await memorizedLargeModel;

    if (!model) return;

    const result = tidy(() => model.predict(input) as Tensor<Rank>);

    if (!result) return;

    const predictions = result.dataSync();

    result.dispose();

    const highestPrediction = predictions
      .map((prob, index) => (prob > threshold ? index : -1))
      .filter((index) => index !== -1);

    return highestPrediction;
  };

  const getSmallPrediction = async (input: Tensor, class_key: number) => {
    const model = await getSmallModel(class_key);

    if (!model) return;

    const result = tidy(() => model.predict(input) as Tensor<Rank>);

    model.dispose();

    if (!result) return;

    const predictions = result.dataSync();

    result.dispose();

    return predictions[0];
  };

  const translate = async (rawData: RawMovement): Promise<void> => {
    const tensor = getInput(rawData);

    const predictions = await getLargePredictions(tensor);

    console.log("🚀 ~ translate ~ predictions:", predictions);

    if (!predictions) return;

    let best = -1;
    let bestIndex = -1;

    for (const prediction of predictions) {
      const smallPrediction = await getSmallPrediction(tensor, prediction);

      console.log("🚀 ~ translate ~ smallPrediction:", smallPrediction);

      if (!smallPrediction) continue;

      if (smallPrediction > best) {
        best = smallPrediction;
        bestIndex = prediction;
      }
    }

    tensor.dispose();

    if (best === -1) return;

    setMessage((m) => `${m} ${getMeaning(bestIndex)}`);
  };

  return {
    translate,
  };
};
