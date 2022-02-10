import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks';

import { useDoubleClick } from '../../../lib/hooks/useDoubleClick';

import { sleep } from '@/lib/helpers/testHelpers';

describe('useDoubleClick', () => {
  test('useDoubleClick', async () => {
    let clicks = 0;
    const { result, rerender } = renderHook(
      ({ timeoutCounter }) =>
        useDoubleClick(() => {
          clicks += 1;
        }, timeoutCounter),
      {
        initialProps: {
          timeoutCounter: 200,
        },
      }
    );

    result.current();
    result.current();

    expect(clicks).toEqual(1);

    result.current();
    await sleep(100);
    result.current();

    expect(clicks).toEqual(2);

    result.current();
    await sleep(300);
    result.current();

    expect(clicks).toEqual(2);

    rerender({
      timeoutCounter: 500,
    });

    result.current();
    result.current();

    expect(clicks).toEqual(3);

    result.current();
    await sleep(600);
    result.current();

    expect(clicks).toEqual(3);

    result.current();
    await sleep(300);
    result.current();

    expect(clicks).toEqual(4);
  });
});
