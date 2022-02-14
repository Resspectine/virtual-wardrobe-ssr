import { waitFor } from '@testing-library/react';
import { NextRouter, useRouter } from 'next/router';

import { appFetch } from '@/lib/controller';
import { AuthenticationProvider } from '@/lib/providers/Authentication';
import { ROUTE_PATHS } from '@/routes/constants';
import { render } from '@/testUtils';

jest.mock('@/lib/controller');
jest.mock('next/router');

const mockedAppFetch = appFetch as jest.Mock<ReturnType<typeof appFetch>>;
const mockedUseRouter = useRouter as jest.Mock<ReturnType<typeof useRouter>>;

afterEach(() => {
  mockedAppFetch.mockRestore();
  mockedUseRouter.mockRestore();
});

describe('Authentication', () => {
  test('should show loading icon', async () => {
    mockedUseRouter.mockReturnValue({
      push: () => {},
      route: ROUTE_PATHS.main,
    } as unknown as NextRouter);
    const { asFragment } = render(<AuthenticationProvider />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should show children', async () => {
    mockedAppFetch.mockResolvedValue(() => ({
      id: '',
      email: '',
      name: '',
    }));
    mockedUseRouter.mockReturnValue({
      push: () => {},
      route: ROUTE_PATHS.main,
    } as unknown as NextRouter);
    const { findByText, asFragment } = render(
      <AuthenticationProvider>
        <p>Test text</p>
      </AuthenticationProvider>
    );

    await waitFor(async () => expect(await findByText('Test text')).toBeInTheDocument());

    expect(asFragment()).toMatchSnapshot();
  });
});
