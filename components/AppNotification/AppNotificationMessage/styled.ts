import { Cancel } from '@mui/icons-material';
import DoneIcon from '@mui/icons-material/Done';
import MaterialErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';
import SyncIcon from '@mui/icons-material/Sync';
import { Box, styled } from '@mui/system';

import { NotificationType } from '@/types/notification';

const variants: Record<
  NotificationType,
  {
    color: string;
    backgroundColor: string;
    borderColor: string;
  }
> = {
  notification: {
    backgroundColor: '#fff',
    borderColor: '#7fbffe',
    color: '#000',
  },
  warning: {
    backgroundColor: '#fff',
    borderColor: '#ffeb3b',
    color: '#000',
  },
  error: {
    backgroundColor: '#fff',
    borderColor: '#f44336',
    color: '#000',
  },
  loading: {
    backgroundColor: '#fff',
    borderColor: '#8561c5',
    color: '#000',
  },
  success: {
    backgroundColor: '#fff',
    borderColor: '#a2cf6e',
    color: '#000',
  },
};

export const AppNotificationMessageWrapper = styled(Box)<{ remove: boolean; type: NotificationType }>(
  ({ remove, type }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    cursor: 'pointer',
    padding: '5px 10px',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 6,
    animation: !remove ? 'enter 300ms cubic-bezier(0.15, 0.7, 0.71, 1.29)' : 'left 500ms linear',
    marginBottom: 10,
    '@keyframes enter': {
      '0%': {
        transform: 'translateX(-100%)',
      },
      '100%': {
        transform: 'translateX(0)',
      },
    },
    '@keyframes left': {
      '0%': { transform: 'translateX(0)', opacity: 1 },
      '100%': { transform: 'translateX(100%)', opacity: 0 },
    },
    ...variants[type],
  })
);

export const AppNotificationMessageCancel = styled(Cancel)({
  cursor: 'pointer',
  marginLeft: 5,
  color: '#000',
});

export const LoadingIcon = styled(SyncIcon)({
  animation: 'rotate 1s linear infinite',
  color: '#8561c5',
  marginRight: 5,
  '@keyframes rotate': {
    '0%': { transform: 'rotate(360deg)' },
    '100%': { transform: 'rotate(0deg)' },
  },
});

export const SuccessIcon = styled(DoneIcon)({
  marginRight: 5,
  color: '#a2cf6e',
});

export const ErrorIcon = styled(ReportIcon)({
  marginRight: 5,
  color: '#f44336',
});

export const NotificationIcon = styled(MaterialErrorIcon)({
  marginRight: 5,
  color: '#7fbffe',
});

export const WarningIcon = styled(MaterialErrorIcon)({
  marginRight: 5,
  color: '#ffeb3b',
});
