import { waitFor } from '@testing-library/react';

import { appFetch } from '@/lib/controller';
import { ImageSection } from '@/pageComponents/Main/Garment/ImageSection';
import { render } from '@/testUtils';

jest.mock('@/lib/controller');

const mockedAppFetch = appFetch as unknown as jest.Mock<ReturnType<typeof appFetch>>;

afterEach(() => {
  mockedAppFetch.mockReset();
});

afterAll(() => {
  mockedAppFetch.mockRestore();
});

describe('ImageSection', () => {
  test('should match snapshot', async () => {
    mockedAppFetch.mockResolvedValue(new Blob());

    const { getByAltText, asFragment } = render(
      <ImageSection
        image={{
          filename: '',
          id: '',
          mimetype: '',
          path: '',
        }}
      />
    );

    await waitFor(() => expect(getByAltText('Something went wrong')).toBeInTheDocument());

    expect(mockedAppFetch).toBeCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });
});
