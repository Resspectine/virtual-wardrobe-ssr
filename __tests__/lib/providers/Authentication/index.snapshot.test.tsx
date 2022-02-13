import { waitFor } from '@testing-library/react';

import { appFetch } from '@/lib/controller';
import { AuthenticationProvider } from '@/lib/providers/Authentication';
import { render } from '@/testUtils';

jest.mock('@/lib/controller');

const mockedAppFetch = appFetch as jest.Mock<ReturnType<typeof appFetch>>;

afterEach(() => {
  mockedAppFetch.mockRestore();
});

describe('Authentication', () => {
  test('should show loading icon', async () => {
    const { asFragment } = render(<AuthenticationProvider />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should show children', async () => {
    mockedAppFetch.mockResolvedValue(() => ({
      id: '',
      email: '',
      name: '',
    }));
    const { findByText, asFragment } = render(
      <AuthenticationProvider>
        <p>Test text</p>
      </AuthenticationProvider>
    );

    await waitFor(async () => expect(await findByText('Test text')).toBeInTheDocument());

    expect(asFragment()).toMatchSnapshot();
  });
});
