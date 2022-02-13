import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';

import { fileFetch } from '@/lib/controller/file';
import NamePicture from '@/pageComponents/Profile/NamePicture';
import { placeholderImageUrl } from '@/pageComponents/Root/Navigation/UserProfile/constants';
import { useUser } from '@/store/user';
import { render } from '@/testUtils';

jest.mock('@/lib/controller/file');

const mockedFileFetch = fileFetch as jest.Mock<ReturnType<typeof fileFetch>>;

const user = {
  email: 'email@mail.com',
  id: '1',
  name: 'Test Name',
};

const response = new Response('"response"', {
  status: 200,
});

describe('NamePicture', () => {
  test('should display user name, profile picture, upload new profile picture', async () => {
    mockedFileFetch.mockImplementation(() => Promise.resolve(response));
    const { result } = renderHook(() => useUser(state => state.setUser));

    result.current(user);

    const { getByText, getByAltText, getByRole } = render(<NamePicture />);

    expect(getByText(user.name)).toBeInTheDocument();

    await waitFor(async () => expect(getByAltText('avatar')).not.toHaveAttribute('src', placeholderImageUrl));

    userEvent.upload(getByRole('button'), new File([], 'test'));
    await waitFor(() => expect(mockedFileFetch).toBeCalledTimes(1));
  });
});
