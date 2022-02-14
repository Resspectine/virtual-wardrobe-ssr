import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks';

import { useHoldClick } from '@/lib/hooks/useHoldClick';
import { sleep } from '@/testUtils';

const eventClick = { persist: () => {} } as React.MouseEvent<HTMLElement, MouseEvent>;
const eventTouch = { persist: () => {} } as React.TouchEvent<HTMLDivElement>;

describe('useHoldClick', () => {
  test('should work correctly with clicks', async () => {
    let clicks = 0;
    const { result, rerender } = renderHook(
      ({ timeoutCounter }) =>
        useHoldClick(
          () => (): void => {
            clicks += 1;
          },
          timeoutCounter
        ),
      {
        initialProps: {
          timeoutCounter: 200,
        },
      }
    );

    result.current().onMouseDown(eventClick);
    result.current().onMouseUp();

    expect(clicks).toEqual(0);

    result.current().onMouseDown(eventClick);
    await sleep(400);
    result.current().onMouseUp();

    expect(clicks).toEqual(1);

    result.current().onMouseDown(eventClick);
    await sleep(100);
    result.current().onMouseUp();

    expect(clicks).toEqual(1);

    rerender({
      timeoutCounter: 500,
    });

    result.current().onMouseDown(eventClick);
    await sleep(300);
    result.current().onMouseUp();

    expect(clicks).toEqual(1);

    result.current().onMouseDown(eventClick);
    await sleep(600);
    result.current().onMouseUp();

    expect(clicks).toEqual(2);
  });

  test('should work correctly with touches', async () => {
    let clicks = 0;
    const { result, rerender } = renderHook(
      ({ timeoutCounter }) =>
        useHoldClick(
          () => (): void => {
            clicks += 1;
          },
          timeoutCounter
        ),
      {
        initialProps: {
          timeoutCounter: 200,
        },
      }
    );

    result.current().onTouchStart(eventTouch);
    result.current().onTouchEnd();

    expect(clicks).toEqual(0);

    result.current().onTouchStart(eventTouch);
    await sleep(400);
    result.current().onTouchEnd();

    expect(clicks).toEqual(1);

    result.current().onTouchStart(eventTouch);
    await sleep(100);
    result.current().onTouchEnd();

    expect(clicks).toEqual(1);

    rerender({
      timeoutCounter: 500,
    });

    result.current().onTouchStart(eventTouch);
    await sleep(300);
    result.current().onTouchEnd();

    expect(clicks).toEqual(1);

    result.current().onTouchStart(eventTouch);
    await sleep(600);
    result.current().onTouchEnd();

    expect(clicks).toEqual(2);
  });
});
