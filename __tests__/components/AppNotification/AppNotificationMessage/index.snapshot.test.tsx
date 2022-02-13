/* eslint-disable no-plusplus */

import { notificationBuilder } from './index.test';

import { AppNotificationMessage } from '@/components/AppNotification/AppNotificationMessage';
import { render } from '@/testUtils';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('AppNotificationMessage', () => {
  test('should be error and match snapshot', () => {
    const notification = notificationBuilder({
      overrides: {
        type: 'error',
        message: 'error',
      },
    });

    const { asFragment } = render(<AppNotificationMessage notification={notification} onRemove={() => {}} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should be loading and match snapshot', () => {
    const notification = notificationBuilder({
      overrides: {
        type: 'loading',
        message: 'loading',
      },
    });
    const { asFragment } = render(<AppNotificationMessage notification={notification} onRemove={() => {}} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should be notification and match snapshot', () => {
    const notification = notificationBuilder({
      overrides: {
        type: 'notification',
        message: 'notification',
      },
    });
    const { asFragment } = render(<AppNotificationMessage notification={notification} onRemove={() => {}} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should be success and match snapshot', () => {
    const notification = notificationBuilder({
      overrides: {
        type: 'success',
        message: 'success',
      },
    });
    const { asFragment } = render(<AppNotificationMessage notification={notification} onRemove={() => {}} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should be warning and match snapshot', () => {
    const notification = notificationBuilder({
      overrides: {
        type: 'warning',
        message: 'warning',
      },
    });
    const { asFragment } = render(<AppNotificationMessage notification={notification} onRemove={() => {}} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
