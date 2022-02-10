import { StyledComponent } from '@emotion/styled';

import { ErrorIcon, LoadingIcon, NotificationIcon, SuccessIcon, WarningIcon } from './styled';

import { NotificationType } from '@/types/notification';

export const iconByType: Record<NotificationType, StyledComponent<Record<string, unknown>>> = {
  notification: NotificationIcon,
  error: ErrorIcon,
  loading: LoadingIcon,
  success: SuccessIcon,
  warning: WarningIcon,
};
