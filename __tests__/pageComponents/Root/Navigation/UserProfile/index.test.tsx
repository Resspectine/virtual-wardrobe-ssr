import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { NextRouter, useRouter } from 'next/router';

import { appFetch } from '@/lib/controller';
import UserProfile from '@/pageComponents/Root/Navigation/UserProfile';
import { placeholderImageUrl } from '@/pageComponents/Root/Navigation/UserProfile/constants';
import { useAppState } from '@/store/appState';
import { StoreUser, useUser } from '@/store/user';
import { render } from '@/testUtils';
import { File } from '@/types/file';

jest.mock('next/router');
jest.mock('@/lib/controller');

const mockedAppFetch = appFetch as unknown as jest.Mock<ReturnType<typeof appFetch>>;
const mockedUseRouter = useRouter as unknown as jest.Mock<ReturnType<typeof useRouter>>;

afterEach(() => {
  mockedAppFetch.mockReset();
  mockedUseRouter.mockReset();
});

afterAll(() => {
  mockedAppFetch.mockRestore();
  mockedUseRouter.mockRestore();
});

describe('UserProfile', () => {
  test('should toggle theme mode, call useRouter push on profile and logout click', async () => {
    const push = jest.fn(() => {});
    mockedUseRouter.mockImplementation(
      () =>
        ({
          push,
        } as unknown as NextRouter)
    );
    mockedAppFetch.mockImplementation(() => Promise.resolve());

    const { result } = renderHook(() => useAppState(state => state.themeMode));

    const { getByRole, getByText, getByAltText } = render(<UserProfile />);

    userEvent.click(getByRole('button'));
    userEvent.click(getByText('Profile'));
    expect(push).toBeCalledTimes(1);

    userEvent.click(getByRole('button'));
    userEvent.click(getByText('Toggle theme'));
    expect(result.current).toBe('red');

    userEvent.click(getByRole('button'));
    userEvent.click(getByText('Logout'));

    await waitFor(() => expect(getByAltText('avatar')).not.toHaveAttribute('src', placeholderImageUrl));

    expect(mockedAppFetch).toBeCalledTimes(1);
  });

  test('should load profile image', async () => {
    mockedAppFetch.mockResolvedValue(new Blob());
    const { result } = renderHook(() => useUser(state => state.setUser));

    result.current({
      avatar: {} as File,
    } as StoreUser);

    const { asFragment, getByAltText } = render(<UserProfile />);

    expect(getByAltText('avatar')).toHaveAttribute('src', placeholderImageUrl);

    expect(mockedAppFetch).toBeCalledTimes(1);

    await waitFor(async () => expect(getByAltText('avatar')).not.toHaveAttribute('src', placeholderImageUrl));

    expect(asFragment()).toMatchSnapshot();
  });
});
