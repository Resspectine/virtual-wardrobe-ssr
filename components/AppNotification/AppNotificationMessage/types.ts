import { Notification } from '@/types/notification';

export interface AppNotificationMessageProps {
  notification: Notification;
  onRemove: (id: number) => void;
}
