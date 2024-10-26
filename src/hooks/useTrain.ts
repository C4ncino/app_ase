import { useEffect, useState } from "react";

import useAPI from "./useAPI";
import useCountdown from "./useCountdown";
import { sensor_data } from "@/messages/test";
import { useBleContext } from "./useBLEContext";
import { useSessionContext } from "./useSessionContext";

const useTrain = () => {
  const { token } = useSessionContext();
  const { post, get } = useAPI();

  const [taskId, setTaskId] = useState("");

  const { data, setReceiving, receiving, isConnected, setData } =
    useBleContext();

  const { restart, start } = useCountdown(() => setReceiving(true));

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

  useEffect(() => {
    if (isConnected) start();
    setData([]);
  }, [isConnected]);

  useEffect(() => {
    if (taskId === "") {
      if (receiving) {
        setReceiving(false);
        restart();
      }

      if (data.length === 20) validate();
    }
  }, [data]);

  useEffect(() => {
    if (taskId) {
      const intervalId = setInterval(async () => {
        const response = await get(`train/validate/${taskId}`, token);

        if (response && response.ready) {
          setData((d) => d.filter((_, i) => !response.bad_samples.includes(i)));
          setTaskId("");
          clearInterval(intervalId);
        }
      }, 1000);
    }
  }, [taskId]);

  return {
    validate,
    samples_size: data.length,
  };
};

export default useTrain;
