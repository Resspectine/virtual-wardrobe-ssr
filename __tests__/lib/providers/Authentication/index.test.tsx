import { waitFor } from '@testing-library/react';
import { NextRouter, useRouter } from 'next/router';

import { appFetch } from '@/lib/controller';
import { AuthenticationProvider } from '@/lib/providers/Authentication';
import { render } from '@/testUtils';

jest.mock('@/lib/controller');
jest.mock('next/router');

const mockedAppFetch = appFetch as jest.Mock<ReturnType<typeof appFetch>>;
const mockedUseRouter = useRouter as jest.Mock<ReturnType<typeof useRouter>>;

afterEach(() => {
  mockedAppFetch.mockRestore();
});

describe('Authentication', () => {
  test('should call useRouter push', async () => {
    const push = jest.fn(() => {});
    mockedAppFetch.mockRejectedValue('failed');
    mockedUseRouter.mockReturnValue({
      push,
    } as unknown as NextRouter);
    render(
      <AuthenticationProvider>
        <p>Test text</p>
      </AuthenticationProvider>
    );

    await waitFor(() => expect(push).toBeCalledTimes(1));
  });
});
