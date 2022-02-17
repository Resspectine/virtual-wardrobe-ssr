import create from 'zustand';

import { getLocalId } from '@/lib/helpers/localId';
import { Notification } from '@/types/notification';

interface AppNotificationStore {
  notifications: Notification[];
  addNotification: (notification: Pick<Notification, 'message' | 'type' | 'key'>) => void;
  deleteNotification: (deleteId: number) => void;
  deleteNotificationByKey: (key: string) => void;
}

export const useAppNotification = create<AppNotificationStore>((set, get) => ({
  notifications: [],
  addNotification: (notification): void =>
    set({
      notifications: [...get().notifications, { ...notification, id: getLocalId() }],
    }),
  deleteNotification: (deleteId): void =>
    set({
      notifications: get().notifications.filter(({ id: elementId }) => elementId !== deleteId),
    }),
  deleteNotificationByKey: (key): void =>
    set({
      notifications: get().notifications.filter(({ key: elementKey }) => elementKey !== key),
    }),
}));
