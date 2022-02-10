import { render } from '@testing-library/react';

import { Loading } from '@/components/Loading';

describe('Loading', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<Loading />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should match snapshot with provided sxs', () => {
    const { asFragment } = render(
      <Loading
        sxs={{
          icon: {
            padding: 2,
          },
          root: {
            padding: 2,
          },
        }}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
