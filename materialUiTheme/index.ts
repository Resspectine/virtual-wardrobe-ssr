import { green, red } from '@mui/material/colors';
import { createTheme, PaletteOptions, Theme } from '@mui/material/styles';

export type Mode = 'red' | 'green';

export const newThemeMode: Record<Mode, Mode> = {
  green: 'red',
  red: 'green',
};

const colorThemes: Record<Mode, PaletteOptions> = {
  red: {
    background: {
      default: '#efeff5',
    },
    text: {
      secondary: red['700'],
    },
  },
  green: {
    background: {
      default: '#efeff5',
    },
    text: {
      secondary: green['700'],
    },
  },
};

export const materialTheme = (mode: Mode): Theme =>
  createTheme({
    palette: colorThemes[mode],
    typography: {
      fontFamily: 'Montserrat, Times New Roman',
    },
  });
