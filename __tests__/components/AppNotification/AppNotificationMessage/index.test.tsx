import { build, fake, oneOf, sequence } from '@jackfranklin/test-data-bot';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { AppNotificationMessage } from '@/components/AppNotification/AppNotificationMessage';
import { render } from '@/testUtils';
import { Notification } from '@/types/notification';

export const notificationBuilder = build<Notification>({
  fields: {
    id: sequence(),
    message: fake(f => f.lorem.words(3)),
    type: oneOf('success', 'error', 'warning', 'notification', 'loading'),
  },
});

afterEach(() => {
  jest.useRealTimers();
});

describe('AppNotificationMessage', () => {
  test('should call onRemove after 3s', () => {
    const onRemove = jest.fn(() => {});
    const notification = notificationBuilder();

    jest.useFakeTimers();

    render(<AppNotificationMessage notification={notification} onRemove={onRemove} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  test("shouldn't call onRemove after 3s, should call remove after cancel click", () => {
    const onRemove = jest.fn(() => {});
    const notification = notificationBuilder({
      overrides: {
        message: 'notification',
      },
    });

    jest.useFakeTimers();

    const { getByText, getByTestId } = render(
      <AppNotificationMessage notification={notification} onRemove={onRemove} />
    );

    userEvent.click(getByText(/notification/i));

    expect(onRemove).toHaveBeenCalledTimes(0);

    userEvent.click(getByTestId('cancel-app-notification'));

    act(() => {
      jest.runAllTimers();
    });

    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
