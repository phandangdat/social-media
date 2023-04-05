import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0072e5',
    },
    background: {
      default: '#0A1929',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...{
            padding: theme.spacing(2),
            borderWidth: '1.5px',
          },
        }),
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'md',
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#001e3c',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 18,
        },
      },
    },
  },
});

export default theme;
