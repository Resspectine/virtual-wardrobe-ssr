import { TouchEvent, useRef } from 'react';

export interface HoldClickProps {
  onMouseUp: () => void;
  onMouseDown: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onTouchStart: React.TouchEventHandler<HTMLDivElement>;
  onTouchEnd: () => void;
  onTouchMove: () => void;
}

export const isTouchEvent = (
  event: React.MouseEvent<HTMLElement, MouseEvent> | TouchEvent<HTMLDivElement>
): event is TouchEvent<HTMLDivElement> => !!(event as TouchEvent<HTMLDivElement>).touches;

export const useHoldClick = <
  T extends (
    ...args: never[]
  ) => (event: React.MouseEvent<HTMLElement, MouseEvent> | TouchEvent<HTMLDivElement>) => void
>(
  callback: T,
  timeout: number
): ((...args: Parameters<T>) => HoldClickProps) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const millisecondsStart = useRef<number | null>(null);

  const clearIntervalFromRef = () => intervalRef.current && clearInterval(intervalRef.current);

  const onMouseDown = (
    event: React.MouseEvent<HTMLElement, MouseEvent> | TouchEvent<HTMLDivElement>,
    ...args: never[]
  ): void => {
    event.persist();
    millisecondsStart.current = Date.now();

    intervalRef.current = setInterval(() => {
      if (millisecondsStart.current && Date.now() >= millisecondsStart.current + timeout) {
        callback(...args)(event);

        clearIntervalFromRef();
      }
    }, 10);
  };

  const onMouseUp = (): void => {
    clearIntervalFromRef();
  };

  const hold = (...args: Parameters<T>): HoldClickProps => ({
    onMouseUp,
    onMouseDown: (event): void => onMouseDown(event, ...args),
    onTouchStart: (event): void => onMouseDown(event, ...args),
    onTouchEnd: onMouseUp,
    onTouchMove: onMouseUp,
  });

  return hold;
};
