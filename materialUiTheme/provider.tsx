import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import { FC, useMemo } from 'react';

import { materialTheme } from '.';

import { useAppState } from '@/store/appState';

export const ThemeProvider: FC = ({ children }) => {
  const themeMode = useAppState(state => state.themeMode);
  const theme = useMemo(() => materialTheme(themeMode), [themeMode]);

  return <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>;
};
