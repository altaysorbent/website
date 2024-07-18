'use client';

import { createTheme } from '@mui/material/styles';
import { Exo_2 } from 'next/font/google';

const exo2 = Exo_2({
  weight: ['400', '500', '600', '700'],
  subsets: ['cyrillic'],
  display: 'block',
});

export const theme = createTheme({
  palette: {
    primary: {
      main: '#47885e',
    },
    secondary: {
      main: '#ffab23',
    },
  },
  typography: {
    fontFamily: exo2.style.fontFamily,
  },
});
