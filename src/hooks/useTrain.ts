import { useEffect, useState } from "react";

import useAPI from "./useAPI";
import useCountdown from "./useCountdown";
import { messages } from "@/messages/train";
import { sensor_data } from "@/messages/test";
import { useBleContext } from "./useBLEContext";
import { useSessionContext } from "./useSessionContext";

const useTrain = (word: string) => {
  const { token, user, refresh } = useSessionContext();
  const { post, get } = useAPI();

  const { data, setReceiving, receiving, isConnected, setData } =
    useBleContext();

  const { counter, isCounting, pause, restart, start } = useCountdown(
    () => setReceiving(true),
    () => setReceiving(false)
  );

  const [state, setState] = useState(0);
  const [message, setMessage] = useState("");
  const [taskId, setTaskId] = useState("");

  const [chars, setChars] = useState<Characteristics>();

  useEffect(() => {
    if (isConnected) start();
    setData([]);
  }, [isConnected]);

  useEffect(() => {
    setMessage(messages[state]);
  }, [state]);

  useEffect(() => {
    if (taskId === "") {
      if (receiving) {
        setReceiving(false);
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
    const response = await post(
      "train/validate",
      JSON.stringify({ sensor_data: sensor_data }),
      token
    );

    if (response) {
      setData((d) => d.filter((_, i) => !response.bad_samples.includes(i)));
      setTaskId(response.task);
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

        if (data.length - bad_samples.length < 15) {
          setState(6);
          clearInterval(intervalId);

          return;
        }

        setData((d) => d.filter((_, i) => !bad_samples.includes(i)));

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
            sensor_data: sensor_data,
          }),
          token
        );

        setTaskId(trainResponse.task);
        clearInterval(intervalId);
      }
    }, 1000);
  };

  const checkTraining = () => {
    const intervalId = setInterval(async () => {
      const response: TrainTaskResponse = await get(`train/${taskId}`, token);

      if (response && response.ready) {
        setTaskId(response.train_large_task);

        clearInterval(intervalId);
      }
    }, 1000);
  };

  useEffect(() => {
    if (taskId === "") return;

    if (state === 0) checkValidate();
    else if (state === 1) checkTraining();
  }, [taskId]);

  return {
    validate,
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
