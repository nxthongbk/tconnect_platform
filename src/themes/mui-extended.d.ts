import '@mui/material/styles/createPalette';
import '@mui/material/Button';
import { ContainerProps } from '@mui/material/Container';

declare module '@mui/material/styles/createPalette' {
  export interface PaletteOptions {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {}
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    desktop: true;
    oversize: true;
  }
}

declare module '@mui/material/Container' {
  interface ContainerProps {
    maxWidthOversize: true;
  }
}
declare module '@mui/material/styles' {
  interface TypographyVariants {
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    h4: React.CSSProperties;
    h5: React.CSSProperties;
    h6: React.CSSProperties;

    label1: React.CSSProperties;
    label2: React.CSSProperties;
    label3: React.CSSProperties;
    label4: React.CSSProperties;

    body1: React.CSSProperties;
    body2: React.CSSProperties;
    body3: React.CSSProperties;

    button1: React.CSSProperties;
    button2: React.CSSProperties;
    button3: React.CSSProperties;

    caption1: React.CSSProperties;
    caption2: React.CSSProperties;

    overline: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    h4: React.CSSProperties;
    h5: React.CSSProperties;
    h6: React.CSSProperties;

    label1: React.CSSProperties;
    label2: React.CSSProperties;
    label3: React.CSSProperties;
    label4: React.CSSProperties;

    body1: React.CSSProperties;
    body2: React.CSSProperties;
    body3: React.CSSProperties;

    button1: React.CSSProperties;
    button2: React.CSSProperties;
    button3: React.CSSProperties;

    caption1: React.CSSProperties;
    caption2: React.CSSProperties;

    overline: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    h5: true;
    h6: true;

    label1: true;
    label2: true;

    label3: true;
    label4: true;

    body1: true;
    body2: true;
    body3: true;

    button1: true;
    button2: true;
    button3: true;

    caption1: true;
    caption2: true;

    overline: true;
  }
}
