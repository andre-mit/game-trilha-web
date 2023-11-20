"use client";
import { useEffect, useState } from "react";

export const useCountdown = (deadline: Date) => {
  const [time, setTime] = useState(
    Math.max(0, Math.floor((deadline.getTime() - Date.now()) / 1000))
  );

  const decrement = () =>
    setTime((prevTime) => {
      return prevTime === 0 ? 0 : prevTime - 1;
    });

  useEffect(() => {
    const id = setInterval(decrement, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setTime(Math.max(0, Math.floor((deadline.getTime() - Date.now()) / 1000)));
  }, [deadline]);

  const format = (num: number): string => {
    return num < 10 ? "0" + num : num.toString();
  };

  return {
    days: format(Math.floor(time / (3600 * 24))),
    hours: format(Math.floor((time / 3600) % 24)),
    minutes: format(Math.floor((time / 60) % 60)),
    seconds: format(time % 60),
  };
};
