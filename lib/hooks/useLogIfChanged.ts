import { useRef } from 'react';

const print = (value: any): string => {
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return value.toString();
};

export const useLogIfChanged = <T>(name: string, value: T): void => {
  const previous = useRef(value);
  const renderCount = useRef(1);

  if (!Object.is(previous.current, value)) {
    // eslint-disable-next-line no-console
    console.log(
      `${name} changed. Render Count: ${renderCount.current}, Old: ${print(previous.current)}, New: ${print(value)}`
    );
    previous.current = value;
    renderCount.current += 1;
  }
};
