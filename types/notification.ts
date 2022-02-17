export type NotificationType = 'success' | 'error' | 'warning' | 'notification' | 'loading';

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  key?: string;
}
