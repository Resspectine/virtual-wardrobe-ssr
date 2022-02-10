/* eslint-disable no-plusplus */
import { render } from '@testing-library/react';

import { notificationBuilder } from './index.test';

import { AppNotificationMessage } from '@/components/AppNotification/AppNotificationMessage';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('FormSubmitSection', () => {
  test('should be success and match snapshot', () => {
    const notification = notificationBuilder({
      overrides: {
        type: 'error',
        message: 'error',
      },
    });

    const { asFragment } = render(<AppNotificationMessage notification={notification} onRemove={() => {}} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should be success and match snapshot', () => {
    const notification = notificationBuilder({
      overrides: {
        type: 'loading',
        message: 'loading',
      },
    });
    const { asFragment } = render(<AppNotificationMessage notification={notification} onRemove={() => {}} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should be success and match snapshot', () => {
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

  test('should be success and match snapshot', () => {
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
