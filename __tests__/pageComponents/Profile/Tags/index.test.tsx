import { build, sequence } from '@jackfranklin/test-data-bot';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { appFetch } from '@/lib/controller';
import Tags from '@/pageComponents/Profile/Tags';
import { render } from '@/testUtils';
import { Tag } from '@/types/tag';

jest.mock('@/lib/controller');

const mockedAppFetch = appFetch as unknown as jest.Mock<ReturnType<typeof appFetch>, Parameters<typeof appFetch>>;

afterEach(() => {
  mockedAppFetch.mockReset();
});

afterAll(() => {
  mockedAppFetch.mockRestore();
});

export const tagBuilder = build<Tag>({
  fields: {
    id: sequence(String),
    title: sequence(x => `Tag${x}`),
  },
});

let tags: Tag[] = [tagBuilder()];

const deleteTag = (id: string): void => {
  tags = tags.filter(tag => tag.id !== id);
};

describe('Tags', () => {
  test('should show tags, delete tags', async () => {
    mockedAppFetch.mockImplementation(async (requestInfo, options) => {
      if (options?.method === 'DELETE') {
        deleteTag(requestInfo.toString().split('/').slice(-1)[0]);
      }

      return tags;
    });

    const { getByTestId, getByText, queryByTestId } = render(<Tags />);

    await waitFor(() => expect(mockedAppFetch).toBeCalledTimes(1));
    expect(getByText(tags[0].title)).toBeInTheDocument();

    userEvent.click(getByTestId('CancelIcon'));

    await waitFor(() => expect(mockedAppFetch).toBeCalledTimes(3));

    userEvent.click(getByText('Add new tag'));

    userEvent.click(getByText('Close'));

    await waitFor(() => expect(queryByTestId('CancelIcon')).not.toBeInTheDocument());
  });
});
