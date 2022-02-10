import create from 'zustand';

import { getLocalId } from '@/lib/helpers/localId';
import { Notification } from '@/types/notification';

interface AppNotificationStore {
  notifications: Notification[];
  addNotification: (notification: Pick<Notification, 'message' | 'type'>) => void;
  deleteNotification: (deleteId: number) => void;
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
}));
