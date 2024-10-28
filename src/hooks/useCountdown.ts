import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";

const useCountdown = (
  startAction: () => void,
  stopAction: () => void,
  countStart: number = 3
) => {
  const [counter, setCounter] = useState(countStart);
  const [isCounting, setIsCounting] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  const countDown = () => {
    setIsCounting(true);

    const inter = setInterval(
      () => setCounter((c) => (c > 0 ? c - 1 : 0)),
      1000
    );

    setIntervalId(inter);
  };

  useFocusEffect(
    useCallback(() => {
      return () => clearInterval(intervalId);
    }, [intervalId])
  );

  const pause = () => {
    stopAction();
    clearInterval(intervalId);
    setCounter(countStart);
    setIsCounting(false);
  };

  const restart = () => {
    setCounter(-1);
  };

  const start = () => {
    setCounter(countStart);
    countDown();
  };

  useEffect(() => {
    switch (counter) {
      case 0:
        clearInterval(intervalId);
        break;
      case 1:
        startAction();
        break;
      case -1:
        start();
        break;
    }
  }, [counter]);

  return {
    counter,
    isCounting,
    pause,
    restart,
    start,
  };
};

export default useCountdown;
