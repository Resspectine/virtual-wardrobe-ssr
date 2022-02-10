import { useRef } from 'react';

export interface HoldClickProps {
  onMouseUp: () => void;
  onMouseDown: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const useHoldClick = <
  T extends (...args: never[]) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
>(
  callback: T,
  timeout: number
): ((...args: Parameters<T>) => HoldClickProps) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const millisecondsStart = useRef<number | null>(null);

  const onMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>, ...args: never[]): void => {
    event.persist();
    millisecondsStart.current = Date.now();

    intervalRef.current = setInterval(() => {
      if (millisecondsStart.current && Date.now() >= millisecondsStart.current + timeout) {
        callback(...args)(event);

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, 10);
  };

  const onMouseUp = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const hold = (...args: Parameters<T>): HoldClickProps => ({
    onMouseUp,
    onMouseDown: (event): void => onMouseDown(event, ...args),
  });

  return hold;
};
