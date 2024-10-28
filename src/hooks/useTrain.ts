import { useEffect, useState } from "react";

import useAPI from "./useAPI";
import useCountdown from "./useCountdown";
import { messages } from "@/messages/train";
import { useBleContext } from "./useBLEContext";
import { useSessionContext } from "./useSessionContext";
import useBase64 from "./useBase64";
import { useModelsContext } from "./useModelsContext";

const useTrain = (word: string) => {
  const MAX_SAMPLES = 20;

  const { token, user, refresh } = useSessionContext();
  const { post, get } = useAPI();

  const { data, setReceiving, receiving, isConnected, setData } =
    useBleContext();

  const { counter, isCounting, pause, restart, start } = useCountdown(
    () => setReceiving(true),
    () => setReceiving(false)
  );

  const { decodeGloveData } = useBase64();
  const { saveModel, addSmallModel, setLargeModel } = useModelsContext();

  const [state, setState] = useState(0);
  const [message, setMessage] = useState("");
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    console.log("useEffect de Conectado");

    if (isConnected) start();
    setData([]);
  }, [isConnected]);

  useEffect(() => {
    console.log("useEffect de state");
    setMessage(messages[state]);
  }, [state]);

  useEffect(() => {
    console.log("useEffect de data");
    if (taskId === "") {
      setReceiving(false);

      if (data.length === MAX_SAMPLES) {
        setState(1);
        validate();
      } else if (receiving) restart();
    }
  }, [data]);

  const goBackToGetData = () => {
    setState(0);
    pause();
  };

  const validate = async () => {
    setReceiving(false);

    const response: ValidateResponse = await post(
      "train/validate",
      JSON.stringify({ sensor_data: decodeGloveData(data) }),
      token
    );

    if (response) {
      setData((d) => d.filter((_, i) => !response.samples.includes(i)));

      if (response.success) setTaskId(response.task);
      else setState(6);
    }
  };

  const checkValidate = () => {
    const intervalId = setInterval(async () => {
      const response: ValidateTaskResponse = await get(
        `train/validate/${taskId}`,
        token
      );

      if (response && response.ready) {
        const bad_samples = response.result.bad_samples;

        setData((d) => d.filter((_, i) => !bad_samples.includes(i)));

        if (data.length - bad_samples.length < 15) {
          setState(6);
          clearInterval(intervalId);
          return;
        }

        const trainResponse: TrainResponse = await post(
          "train",
          JSON.stringify({
            user_id: user?.id,
            word: word,
            chars: {
              centroid: response.result.centroid,
              radius: response.result.radius,
              threshold: response.result.threshold,
            },
            sensor_data: decodeGloveData(data),
          }),
          token
        );

        setState(2);
        setTaskId(trainResponse.task);
        clearInterval(intervalId);
      }
    }, 2000);
  };

  const checkTraining = () => {
    const intervalId = setInterval(async () => {
      const response: TrainTaskResponse = await get(`train/${taskId}`, token);

      if (response && response.ready) {
        const modelResponse = await get(
          `train/${response.word.id}/model`,
          token
        );

        if (modelResponse) {
          const modelPath = await saveModel(
            modelResponse.model,
            `${response.word.class_key}/`
          );
          addSmallModel(
            {
              meaning: response.word.word,
              model_path: modelPath,
            },
            response.word.id
          );
        }

        setState(3);

        setTaskId(response.train_large_task);

        clearInterval(intervalId);
      }
    }, 5000);
  };

  const checkLargeModel = () => {
    const intervalId = setInterval(async () => {
      const response: TrainLargeTaskResponse = await get(
        `train/large-model/${taskId}`,
        token
      );

      if (response && response.ready) {
        const modelPath = await saveModel(
          response.result.model,
          "generalModel/"
        );

        setLargeModel({
          model_path: modelPath,
        });

        setState(4);
        clearInterval(intervalId);
      }
    }, 5000);
  };

  useEffect(() => {
    console.log("useEffect de taskId");
    if (taskId === "") return;
    switch (state) {
      case 1:
        checkValidate();
        break;

      case 2:
        checkTraining();
        break;

      case 3:
        checkLargeModel();
        break;

      case 4:
        const intervalId = setInterval(async () => {
          await refresh();
          setState(5);
          clearInterval(intervalId);
        }, 1000);
    }
  }, [taskId]);

  return {
    MAX_SAMPLES,
    samples: data.length,
    state,
    message,
    goBackToGetData,
    countDown: {
      counter,
      isCounting,
      pause,
      restart,
    },
  };
};

export default useTrain;
