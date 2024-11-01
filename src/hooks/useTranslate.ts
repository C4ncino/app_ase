import { Tensor2D, tensor2d, Tensor, Rank, tidy } from "@tensorflow/tfjs";
import useBase64 from "./useBase64";
import { useModelsContext } from "./useModelsContext";

export const useTranslate = (
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  const { decodeForTranslate } = useBase64();
  const { getLargeModel, getSmallModel, getMeaning } = useModelsContext();
  const threshold = 0.5;

  const getInput = (rawData: RawMovement) => {
    const data = decodeForTranslate(rawData);

    console.log(data.length);

    return tensor2d(data, [60, 8], "float32");
  };

  const flatResult = async (result: Tensor<Rank> | Tensor<Rank>[]) => {
    let predictions: Uint8Array | Float32Array | Int32Array;

    if (Array.isArray(result)) {
      const predictionsArray = await Promise.all(
        result.map((tensor) => tensor.dataSync())
      );

      const flattened = predictionsArray.flat();

      predictions = new Float32Array(flattened.length);

      let offset = 0;
      predictionsArray.forEach((arr) => {
        predictions.set(arr as Float32Array, offset);
        offset += arr.length;
      });
    } else {
      predictions = await result.data();
    }

    return predictions;
  };

  const getLargePredictions = async (input: Tensor2D) => {
    const model = await getLargeModel();

    console.log("🚀 ~ getLargePredictions ~ model:", model);

    if (!model) return;

    const result = tidy(() => model.predict(input));

    console.log("🚀 ~ getLargePredictions ~ result:", result);

    if (!result) return;

    const predictions = await flatResult(result);

    const highestPrediction = predictions
      .map((prob, index) => (prob > threshold ? index : -1))
      .filter((index) => index !== -1);

    return highestPrediction;
  };

  const getSmallPrediction = async (input: Tensor2D, class_key: number) => {
    const model = await getSmallModel(class_key);

    const result = tidy(() => model?.predict(input));

    if (!result) return;

    const predictions = await flatResult(result);

    return predictions[0];
  };

  const translate = async (rawData: RawMovement): Promise<void> => {
    const tensor = getInput(rawData);

    console.log("🚀 ~ translate ~ tensor:", tensor);

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

    if (best === -1) return;

    setMessage((m) => `${m} ${getMeaning(bestIndex)}`);
  };

  return {
    translate,
  };
};
