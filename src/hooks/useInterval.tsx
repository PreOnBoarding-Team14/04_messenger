import { useEffect, useRef } from 'react';

interface UseIntervalProps {
  callback: () => void;
  delay: number;
}

export default function useInterval({ callback, delay }: UseIntervalProps) {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (delay) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
