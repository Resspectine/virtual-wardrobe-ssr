import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserProfile from '@/pageComponents/Root/Navigation/UserProfile';
import { placeholderImageUrl } from '@/pageComponents/Root/Navigation/UserProfile/constants';
import { render } from '@/testUtils';

describe('UserProfile', () => {
  test('should match snapshot closed', async () => {
    const { asFragment, getByAltText } = render(<UserProfile />);

    await waitFor(async () => expect(getByAltText('avatar')).not.toHaveAttribute('src', placeholderImageUrl));

    expect(asFragment()).toMatchSnapshot();
  });

  test('should match snapshot opened', async () => {
    const { baseElement, getByRole, getByAltText } = render(<UserProfile />);

    userEvent.click(getByRole('button'));

    await waitFor(async () => expect(getByAltText('avatar')).not.toHaveAttribute('src', placeholderImageUrl));

    expect(baseElement).toMatchSnapshot();
  });
});
