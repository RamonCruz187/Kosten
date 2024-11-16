import createTheme from "@mui/material/styles/createTheme";
import {
  customPalette,
  customFonts,
  defaultParagraph,
  defaultTitle,
  defaultCTA,
  inputAdvice,
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
    transparentButton: {
      main: "rgba(0, 0, 0, 0)",
      dark: "rgba(100, 100, 100, 0.1)",
      light: "rgba(200, 200, 200, 0.25)",
      contrastText: customPalette.accent.darkest
    },
  },
  typography: {
    htmlFontSize: 16, // Asigna 16px a 1rem por defecto
    "@media (max-width:750px)": {
      htmlFontSize: 14, // Asigna 14px a 1rem para pantallas xs
    },
    // titulos
    titleXL: { 
      ...defaultTitle,
      fontSize: "2.25rem", // 36px
    },
    titleH1: { // titulo 0
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
      ...defaultParagraph,
      fontSize: "0.687rem", // 11px
      color: customPalette.tertiary.darkest,
      textTransform: "uppercase",
    },

    // párrafos
    p: {
      ...defaultParagraph,
    },
    text2: {
      ...defaultParagraph,
      fontSize: "0.75rem", // 12px
    },
    paragraphLight: {
      ...defaultParagraph,
      color: customPalette.text.light,
    },
    paragraphDetails: {
      ...defaultParagraph,
      fontSize: "0.625rem", // 10px
    },
    textBoxFill:{
      ...defaultParagraph,
      fontSize: "0.875rem", // 14px
    },
    textBox: {
      ...defaultParagraph,
      fontSize: "0.812rem", // 13px
    },
    inputAdvice: {
      ...inputAdvice,
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
          fontWeight: 500,
          textTransform: "uppercase",
          fontSize: "0.875rem", // 14px
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: "Roboto, sans-serif",
          fontSize: "1rem", // 16px
        },
      },
    },
  },
});

export default theme;
