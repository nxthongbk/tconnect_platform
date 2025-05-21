import { createTheme } from '@mui/material/styles';

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export const theme = createTheme({
  palette: {
    primary: {
      main: cssVar('--primary'),
    },
    secondary: {
      main: cssVar('--white'),
    },

    background: {
      default: '#00233D',
    },
    text: {
      primary: cssVar('--text-primary'),
    },
  },

  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '&.MuiContainer-maxWidthOversize': {
            padding: '0px 32px !important',
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        fontFamily: 'Noto Sans',
        variantMapping: {
          button: 'p',
          caption: 'caption',
          overline: 'p',
        },
      },
    },
  },
  typography: {
    fontFamily: ['Noto Sans'].join(','),
    h1: {
      fontSize: 56,
      lineHeight: '72px',
      fontWeight: 700,
    },
    h2: {
      fontSize: 48,
      lineHeight: '56px',
      fontWeight: 700,
      letterSpacing: '0.08px',
    },
    h3: {
      fontSize: 40,
      lineHeight: '48px',
      fontWeight: 700,
      letterSpacing: '0.036px',
    },
    h4: {
      fontSize: 32,
      lineHeight: '40px',
      fontWeight: 700,
    },
    h5: {
      fontSize: 24,
      lineHeight: '32px',
      fontWeight: 700,
    },
    h6: {
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 600,
    },

    label1: {
      fontSize: 18,
      lineHeight: '28px',
      fontWeight: 600,
      letterSpacing: '0.024px',
    },
    label2: {
      fontSize: 16,
      lineHeight: '24px',
      fontWeight: 600,
      letterSpacing: '0.021px',
    },
    label3: {
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: 600,
      letterSpacing: '0.024px',
    },
    label4: {
      fontSize: 12,
      lineHeight: '18px',
      fontWeight: 600,
      letterSpacing: '0.021px',
    },
    body1: {
      fontSize: 18,
      lineHeight: '28px',
      fontWeight: 400,
      letterSpacing: '0.024px',
    },
    body2: {
      fontSize: 16,
      lineHeight: '24px',
      fontWeight: 400,
      letterSpacing: '0.021px',
    },
    body3: {
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: 400,
      letterSpacing: '0.021px',
    },
    button1: {
      fontSize: 18,
      lineHeight: '28px',
      fontWeight: 500,
      letterSpacing: '0.024px',
    },
    button2: {
      fontSize: 16,
      lineHeight: '24px',
      fontWeight: 500,
      letterSpacing: '0.024px',
    },
    button3: {
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: 500,
      letterSpacing: '0.024px',
    },
    caption1: {
      fontSize: 12,
      lineHeight: '18px',
      fontWeight: 400,
      letterSpacing: '0.048px',
    },
    caption2: {
      fontSize: 10,
      lineHeight: '16px',
      fontWeight: 400,
      letterSpacing: '0.048px',
    },
    overline: {
      fontSize: 10,
      lineHeight: '15px',
      fontWeight: 400,
      letterSpacing: '0.15px',
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 800,
      desktop: 1200,
      oversize: 1920,
    },
  },
});
