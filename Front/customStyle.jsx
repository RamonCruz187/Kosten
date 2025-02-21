// src/customStyle.jsx
export const grayColor = {
	// contraste con texto negro
	50: "#F3F3F3",
	100: "#E8E8E8",
	200: "#D9D9D9",
	300: "#C9C9C9",
	400: "#B5B5B5",
	500: "#9E9E9E",
	// a partir de aca contraste con texto blanco
	600: "#8A8A8A",
	700: "#747474",
	800: "#5C5C5C",
	850: "#494949",
	900: "#323232",
	950: "#080808",
};

export const primaryColor = {
	// contraste con texto negro
	50: "#FFF9E2",
	100: "#FFF3C3",
	200: "#FFEA95",
	300: "#FFDF6D",
	400: "#FFD53E",
	500: "#FFC800",
	600: "#C69B00",
	700: "#9F7C00",
	// a partir de aca contraste con texto blanco
	800: "#806400",
	900: "#614C00",
};

export const secondaryColor = {
	// contraste con texto negro
	50: "#F5F3F2",
	100: "#D7CFCB",
	200: "#BCACA4",
	300: "#937361",
	400: "#83593D",
	// a partir de aca contraste con texto blanco
	500: "#73400C",
	600: "#64380A",
	700: "#552F08",
	800: "#462707",
	900: "#361E05",
};

export const accentColor = {
	// contraste con texto negro
  50: "#F2F9F5",
  100: "#E4F3EB",
  200: "#C6E7D5",
  300: "#A1DABD",
  400: "#72CCA0",
  500: "#00BD7E",
	// a partir de aca contraste con texto blanco
  600: "#00A971",
  700: "#009262",
  800: "#007850",
  900: "#005538",
  950: "#00422B",
};

export const errorColor = {
	// contraste con texto negro
  50: "#F8F2F2",
  100: "#E4CBCB",
  200: "#D2A4A4",
  300: "#B96161",
  400: "#B13C3C",
	// a partir de aca contraste con texto blanco
  500: "#A40000",
  600: "#8E0000",
  700: "#790000",
  800: "#630000",
  900: "#4C0000",
};

export const customPalette = {
  primary: {
    // yellow
		light: primaryColor[200], // prim 200 figma
    main: primaryColor[500], // prim 500 figma
    dark: primaryColor[600], // prim 600 figma
		...primaryColor
  },
  secondary: {
    // brown
    main: secondaryColor[500], // sec 500 figma
    dark: secondaryColor[700], // sec 700 figma
		...secondaryColor
  },
  accent: {
    // green
    light: accentColor[50], // acent 50 figma
    main: accentColor[400], // acent 400 figma
    dark: accentColor[500], // acent 500 figma
    darkest1: accentColor[600], // acent 600 figma
    darkest2: accentColor[900], // accent 900 figma
    darkest3: accentColor[950], // accent 950 figma
		...accentColor
  },
  tertiary: {
    // gray
    light: grayColor[50], // gray 50 figma
    main: grayColor[300], // gray 300 figma
    dark: grayColor[500], // gray 500 figma
    darkest: grayColor[850], // gray 850 figma
		...grayColor
  },
  text: {
		light: grayColor[50], // gray 50 figma
		mid: grayColor[800], // gray 800 figma
    main: grayColor[950], // gray 950 figma
		...grayColor
  },
  error: {
		// red
    light: errorColor[500], // error 500 figma
    main: errorColor[800], // error 800 figma
    dark: errorColor[900], // error 900 figma
		...errorColor
  },
  page_bg: grayColor[850],
};

export const customFonts = {
  letter: {
    wide: 1.3,
    normal: 0.3,
  },
  family: {
    oswald: "Oswald, impact, arial, calibri, sans-serif",
    catamaran: "Catamaran, open-sans, arial, calibri, sans-serif",
  },
};

export const defaultParagraph = {
  fontFamily: customFonts.family.catamaran,
  fontWeight: "normal",
  fontSize: "0.875rem", // 14px
  letterSpacing: customFonts.letter.normal,
  color: customPalette.text.main,
};

export const defaultCTA = {
  fontFamily: customFonts.family.catamaran,
  fontWeight: "normal",
  letterSpacing: customFonts.letter.wide,
  color: customPalette.text.main,
  textTransform: "uppercase",
};

export const defaultTitle = {
  fontFamily: customFonts.family.oswald,
  letterSpacing: customFonts.letter.normal,
  fontWeight: 600,
  color: customPalette.text.main,
};

export const inputText = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: 400,
  fontSize: "1rem", // 16px
  color: customPalette.text.main,
};

export const inputAdvice = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: 400,
  fontSize: "0.875rem", // 12px
  color: customPalette.text.mid,
};
