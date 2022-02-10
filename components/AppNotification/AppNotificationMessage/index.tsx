import { FC } from 'react';

import { iconByType } from './helper';
import { useAppNotificationMessage } from './hooks';
import { AppNotificationMessageCancel, AppNotificationMessageWrapper } from './styled';
import { AppNotificationMessageProps } from './types';

export const AppNotificationMessage: FC<AppNotificationMessageProps> = ({ onRemove, notification }) => {
  const { onClick, isRemoving, onCancelClick } = useAppNotificationMessage({
    notification,
    onRemove,
  });

  const Icon = iconByType[notification.type];

  return (
    <AppNotificationMessageWrapper type={notification.type} remove={isRemoving} onClick={onClick}>
      <Icon />
      {notification.message}
      <AppNotificationMessageCancel data-testid="cancel-app-notification" onClick={onCancelClick} />
    </AppNotificationMessageWrapper>
  );
};
