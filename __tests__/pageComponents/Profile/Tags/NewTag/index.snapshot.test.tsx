import userEvent from '@testing-library/user-event';

import { NewTag } from '@/pageComponents/Profile/Tags/NewTag';
import { render } from '@/testUtils';

const closeModal = () => {};

describe('NewTag', () => {
  test('should match snapshot', async () => {
    const { asFragment } = render(<NewTag closeModal={closeModal} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("should match snapshot checked 'add more'", async () => {
    const { getByLabelText, asFragment } = render(<NewTag closeModal={closeModal} />);

    userEvent.click(getByLabelText('Add more'));

    expect(asFragment()).toMatchSnapshot();
  });
});
