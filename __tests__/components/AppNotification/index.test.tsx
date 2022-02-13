import { build, fake, oneOf, sequence } from '@jackfranklin/test-data-bot';
import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { AppNotification } from '@/components/AppNotification';
import { useAppNotification } from '@/store/appNotification';
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

describe('AppNotification', () => {
  test('should display notification and then remove', async () => {
    const notification = notificationBuilder();

    jest.useFakeTimers();

    const { result } = renderHook(() => useAppNotification(state => state.addNotification));

    result.current(notification);

    const { getByText, queryByText } = render(<AppNotification />);

    expect(getByText(notification.message)).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    expect(await queryByText(notification.message)).not.toBeInTheDocument();
  });
});
