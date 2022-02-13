import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks';

import { useLogIfChanged } from '@/lib/hooks/useLogIfChanged';

let counter = 1;
// eslint-disable-next-line no-plusplus
jest.spyOn(console, 'log').mockImplementation(() => counter++);

afterEach(() => {
  counter = 1;
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('useLogIfChanged', () => {
  test('useLogIfChanged for string', async () => {
    const { rerender } = renderHook(({ value }) => useLogIfChanged('testValue', value), {
      initialProps: {
        value: '200',
      },
    });

    expect(counter).toEqual(1);

    rerender({
      value: '23333',
    });

    expect(counter).toEqual(2);

    rerender({
      value: '23333',
    });

    expect(counter).toEqual(2);

    rerender({
      value: '2333',
    });

    expect(counter).toEqual(3);
  });

  test('useLogIfChanged for object', async () => {
    const testObj = {
      test: false,
    };

    const { rerender } = renderHook(({ value }) => useLogIfChanged('testValue', value), {
      initialProps: {
        value: {
          test: true,
        },
      },
    });

    expect(counter).toEqual(1);

    rerender({
      value: testObj,
    });

    expect(counter).toEqual(2);

    rerender({
      value: testObj,
    });

    expect(counter).toEqual(2);

    rerender({
      value: {
        test: false,
      },
    });

    expect(counter).toEqual(3);
  });
});
