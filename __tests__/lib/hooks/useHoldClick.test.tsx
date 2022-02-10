import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks';

import { sleep } from '@/lib/helpers/testHelpers';
import { useHoldClick } from '@/lib/hooks/useHoldClick';

const event = { persist: () => {} } as React.MouseEvent<HTMLElement, MouseEvent>;

describe('useHoldClick', () => {
  test('useHoldClick', async () => {
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

    result.current().onMouseDown(event);
    result.current().onMouseUp();

    expect(clicks).toEqual(0);

    result.current().onMouseDown(event);
    await sleep(400);
    result.current().onMouseUp();

    expect(clicks).toEqual(1);

    result.current().onMouseDown(event);
    await sleep(100);
    result.current().onMouseUp();

    expect(clicks).toEqual(1);

    rerender({
      timeoutCounter: 500,
    });

    result.current().onMouseDown(event);
    await sleep(300);
    result.current().onMouseUp();

    expect(clicks).toEqual(1);

    result.current().onMouseDown(event);
    await sleep(600);
    result.current().onMouseUp();

    expect(clicks).toEqual(2);
  });
});
