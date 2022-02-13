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
  test('should match snapshot on main page', async () => {
    const push = jest.fn(() => {});
    mockedUseRouter.mockImplementation(
      () =>
        ({
          route: ROUTE_PATHS.main,
          push,
        } as unknown as NextRouter)
    );
    mockedUserProfile.mockImplementation(() => null);

    const { asFragment } = render(<Navigation />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should match snapshot on create garment page', async () => {
    const push = jest.fn(() => {});
    mockedUseRouter.mockImplementation(
      () =>
        ({
          route: ROUTE_PATHS.createGarment,
          push,
        } as unknown as NextRouter)
    );
    mockedUserProfile.mockImplementation(() => null);

    const { asFragment } = render(<Navigation />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should match snapshot on edit garment page', async () => {
    const push = jest.fn(() => {});
    mockedUseRouter.mockImplementation(
      () =>
        ({
          route: ROUTE_PATHS.editGarment(),
          push,
        } as unknown as NextRouter)
    );
    mockedUserProfile.mockImplementation(() => null);

    const { asFragment } = render(<Navigation />);

    expect(asFragment()).toMatchSnapshot();
  });
});
