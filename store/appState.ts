import create, { GetState, SetState, StoreApi } from 'zustand';
import { persist } from 'zustand/middleware';

import { Mode, newThemeMode } from '../materialUiTheme';

interface Store {
  themeMode: Mode;
  toggleThemeMode: () => void;
}

export const useAppState = create(
  persist<Store, SetState<Store>, GetState<Store>, StoreApi<Store>>(
    set => ({
      themeMode: 'green',
      toggleThemeMode: (): void => set(oldState => ({ themeMode: newThemeMode[oldState.themeMode] })),
    }),
    {
      name: 'app-state',
      version: 1,
    }
  )
);
