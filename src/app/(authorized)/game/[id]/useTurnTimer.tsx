import { useEffect, useState } from 'react';

const useTurnTimer = (initialSeconds: number) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, secondsRemaining]);

  const start = () => {
    setIsActive(true);
  };

  const reset = () => {
    setIsActive(false);
    setSecondsRemaining(initialSeconds);
  };

  return { secondsRemaining, start, reset };
};

export default useTurnTimer;