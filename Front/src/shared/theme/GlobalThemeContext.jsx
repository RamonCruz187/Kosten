import {createContext, useCallback, useMemo, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getCustomTheme from "./getCustomTheme.jsx";

export const LIGHT_MODE = 'light';
export const DARK_MODE = 'dark';

export const GlobalThemeContext = createContext(null);

export const GlobalThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState(LIGHT_MODE);
    const [showCustomTheme, setShowCustomTheme] = useState(true);
    const customTheme = useMemo(() => createTheme(getCustomTheme(mode)), [mode]);
    const defaultTheme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

    const toggleColorMode = useCallback(() => {
        setMode((prev) => (prev === DARK_MODE ? LIGHT_MODE : DARK_MODE));
    }, []);
    const toggleCustomTheme = useCallback(() => {
        setShowCustomTheme((prev) => !prev);
    }, []);

    const contextValue = useMemo(() => ({
        mode,
        showCustomTheme,
        customTheme,
        defaultTheme,
        toggleColorMode,
        toggleCustomTheme
    }), [mode, showCustomTheme, customTheme, defaultTheme, toggleColorMode, toggleCustomTheme]);

    return (
        <GlobalThemeContext.Provider value={ contextValue }>
            <ThemeProvider theme={ showCustomTheme ? customTheme : defaultTheme}>
                <CssBaseline />

                { children }

            </ThemeProvider>
        </GlobalThemeContext.Provider>
    );

}