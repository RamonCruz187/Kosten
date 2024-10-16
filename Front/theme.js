import createTheme from "@mui/material/styles/createTheme";
import {
  customPalette,
  customFonts,
  defaultParagraph,
  defaultTitle,
  defaultCTA,
} from "./customStyle";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  palette: {
    // generales
    primary: {
      main: customPalette.primary.main,
    },
    secondary: {
      main: customPalette.secondary.main,
    },
    accent: {
      main: customPalette.accent.main,
    },
    // botones
    yellowButton: {
      main: customPalette.primary.main,
      dark: customPalette.primary.dark,
    },
    brownButton: {
      main: customPalette.secondary.main,
      dark: customPalette.secondary.dark,
      contrastText: customPalette.accent.light,
    },
    grayButton: {
      main: customPalette.tertiary.main,
      dark: customPalette.tertiary.dark,
    },
    greenButton: {
      main: customPalette.accent.darkest,
      dark: customPalette.accent.darkest2,
      contrastText: customPalette.accent.light,
    },
  },
  typography: {
    htmlFontSize: 16, // Asigna 16px a 1rem por defecto
    "@media (max-width:750px)": {
      htmlFontSize: 14, // Asigna 14px a 1rem para pantallas xs
    },
    // titulos
    titleH1: {
      ...defaultTitle,
      fontSize: "1.5rem", // 24px
    },
    titleH2: {
      ...defaultTitle,
      fontSize: "1.25rem", // 20px
    },
    titleH3: {
      ...defaultTitle,
      fontWeight: "normal",
      fontSize: "1rem", // 16px
    },

    // CTA
    callToAction: {
      ...defaultCTA,
      fontSize: "1.25rem", // 20px
      fontWeight: "600",
    },

    // subtitulos
    subtitleBold: {
      ...defaultParagraph,
      fontWeight: "600",
      fontSize: "0.875rem", // 14px
    },
    subtitle: {
      ...defaultParagraph,
      fontSize: "0.875rem", // 14px
    },

    // buttons
    buttonMini: {
      fontSize: "0.687rem", // 11px
    },

    // párrafos
    p: {
      ...defaultParagraph,
    },
    paragraphLight: {
      ...defaultParagraph,
      color: customPalette.text.light,
    },
    paragraphDetails: {
      ...defaultParagraph,
      fontSize: "0.625rem", // 10px
    },
    textBox: {
      ...defaultParagraph,
      fontSize: "0.812rem", // 13px
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        // Establece el estilo predeterminado del botón
        variant: "contained",
        size: "small",
      },
      styleOverrides: {
        // sobreescribe estilos de botones
        root: {
          borderRadius: 8,
          padding: ".5rem 1rem",
          letterSpacing: customFonts.letter.wide,
          width: "fit-content",
          fontFamily: customFonts.family.catamaran,
          fontWeight: "normal",
          textTransform: "uppercase",
        },
      },
    },
  },
});

export default theme;
