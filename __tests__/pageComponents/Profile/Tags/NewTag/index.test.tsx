import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { appFetch } from '@/lib/controller';
import { NewTag } from '@/pageComponents/Profile/Tags/NewTag';
import { render } from '@/testUtils';

jest.mock('@/lib/controller');

const mockedAppFetch = appFetch as unknown as jest.Mock<ReturnType<typeof appFetch>>;

afterEach(() => {
  mockedAppFetch.mockReset();
});

afterAll(() => {
  mockedAppFetch.mockRestore();
});

describe('NewTag', () => {
  test("should call appFetch with correct params, don't close modal when 'add more' checked", async () => {
    const closeModal = jest.fn(() => {});
    mockedAppFetch.mockResolvedValue(() => Promise.resolve());

    const { getByLabelText, getByText } = render(<NewTag closeModal={closeModal} />);

    userEvent.type(getByLabelText('Title'), 'Test tag');

    userEvent.click(getByText('Submit'));

    await waitFor(() => expect(mockedAppFetch).toBeCalledTimes(1));
    await waitFor(() => expect(mockedAppFetch).toBeCalledWith('tag', { body: { title: 'Test tag' }, method: 'POST' }));

    userEvent.type(getByLabelText('Title'), 'Test tag2');
    userEvent.click(getByLabelText('Add more'));

    userEvent.click(getByText('Submit'));

    await waitFor(() => expect(mockedAppFetch).toBeCalledTimes(2));
    await waitFor(() => expect(closeModal).toBeCalledTimes(1));
    await waitFor(() => expect(mockedAppFetch).toBeCalledWith('tag', { body: { title: 'Test tag2' }, method: 'POST' }));

    userEvent.click(getByText('Close'));
    await waitFor(() => expect(closeModal).toBeCalledTimes(2));
  });
});
