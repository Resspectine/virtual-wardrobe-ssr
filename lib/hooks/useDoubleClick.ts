import { useRef } from 'react';

type UseDoubleClick = <T extends (...args: never[]) => void>(
  callback: T,
  timeout: number
) => (...args: Parameters<T>) => void;

export const useDoubleClick: UseDoubleClick = (callback, timeout) => {
  const timerRef = useRef<number | null>(null);

  return (...args): void => {
    if (!timerRef.current) {
      timerRef.current = Date.now();

      return;
    }

    if (Date.now() - timerRef.current <= timeout) {
      callback(...args);
    }

    timerRef.current = null;
  };
};
