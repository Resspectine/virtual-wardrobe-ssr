import create from 'zustand';

import { File } from '@/types/file';
import { User } from '@/types/user';

export type StoreUser = Omit<User, 'password'>;

interface Store {
  user: StoreUser | null | undefined;
  setUser: (user: StoreUser) => void;
  updateUserAvatar: (avatar: File) => void;
  removeUser: () => void;
}

export const useUser = create<Store>(set => ({
  user: undefined,
  setUser: (user): void =>
    set({
      user,
    }),
  updateUserAvatar: (avatar): void =>
    set(({ user }) => ({
      user: user && {
        ...user,
        avatar,
      },
    })),
  removeUser: (): void =>
    set({
      user: null,
    }),
}));
