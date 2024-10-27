import { useEffect, useState } from "react";

import useAPI from "./useAPI";
import useCountdown from "./useCountdown";
import { messages } from "@/messages/train";
import { useBleContext } from "./useBLEContext";
import { useSessionContext } from "./useSessionContext";
import useBase64 from "./useBase64";

const useTrain = (word: string) => {
  const { token, user, refresh } = useSessionContext();
  const { post, get } = useAPI();

  const { data, setReceiving, receiving, isConnected, setData } =
    useBleContext();

  const { counter, isCounting, pause, restart, start } = useCountdown(
    () => setReceiving(true),
    () => setReceiving(false)
  );

  const { decodeGloveData } = useBase64();

  const [state, setState] = useState(0);
  const [message, setMessage] = useState("");
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    if (isConnected) start();
    setData([]);
  }, [isConnected]);

  useEffect(() => {
    setMessage(messages[state]);
  }, [state]);

  useEffect(() => {
    if (taskId === "") {
      setReceiving(false);

      if (state === 0 && receiving) {
        restart();
      }

      if (data.length === 20) {
        setState(1);
        validate();
      }
    }
  }, [data]);

  const goBackToGetData = () => {
    setState(0);
    pause();
  };

  const validate = async () => {
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
    }, 1000);
  };

  const checkTraining = () => {
    const intervalId = setInterval(async () => {
      const response: TrainTaskResponse = await get(`train/${taskId}`, token);

      if (response && response.ready) {
        // TODO: Add word to models Context

        setState(3);

        setTaskId(response.train_large_task);

        clearInterval(intervalId);
      }
    }, 1000);
  };

  const checkLargeModel = () => {
    const intervalId = setInterval(async () => {
      const response: TrainLargeTaskResponse = await get(
        `train/large-model/${taskId}`,
        token
      );

      if (response && response.ready) {
        // TODO: add model to context

        setState(4);
        clearInterval(intervalId);
      }
    }, 1000);
  };

  useEffect(() => {
    if (taskId === "") return;

    if (state === 1) checkValidate();
    else if (state === 2) checkTraining();
    else if (state === 3) checkLargeModel();
    else if (state === 4) {
      const intervalId = setInterval(async () => {
        await refresh();
        setState(5);
        clearInterval(intervalId);
      }, 1000);
    }
  }, [taskId]);

  return {
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
