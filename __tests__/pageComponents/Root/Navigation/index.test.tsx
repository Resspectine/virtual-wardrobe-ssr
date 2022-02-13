import userEvent from '@testing-library/user-event';
import { NextRouter, useRouter } from 'next/router';

import Navigation from '@/pageComponents/Root/Navigation';
import UserProfile from '@/pageComponents/Root/Navigation/UserProfile';
import { ROUTE_PATHS } from '@/routes/constants';
import { render } from '@/testUtils';

jest.mock('next/router');
jest.mock('@/pageComponents/Root/Navigation/UserProfile');

const mockedUseRouter = useRouter as unknown as jest.Mock<ReturnType<typeof useRouter>>;
const mockedUserProfile = UserProfile as unknown as jest.Mock<ReturnType<typeof UserProfile>>;

afterEach(() => {
  mockedUseRouter.mockRestore();
  mockedUserProfile.mockRestore();
});

describe('Navigation', () => {
  test('should call useRouter push on url click', async () => {
    const push = jest.fn(() => {});
    mockedUseRouter.mockImplementation(
      () =>
        ({
          route: ROUTE_PATHS.main,
          push,
        } as unknown as NextRouter)
    );
    mockedUserProfile.mockImplementation(() => null);

    const { getByText } = render(<Navigation />);

    userEvent.click(getByText(/create garment/i));

    expect(push).toBeCalledTimes(1);
    expect(push).toBeCalledWith('/create/garment');
  });
});
