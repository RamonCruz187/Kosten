import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ThemeProvider } from "@mui/material";
import theme from "../theme.js";
import Box from "@mui/material/Box";
import {NotificationProvider} from "./shared/services/notistack.service.jsx";
import {GlobalContextProvider} from "./shared/context/GlobalContext.jsx";
import {GlobalThemeContextProvider} from "./shared/theme/GlobalThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <NotificationProvider>
          <GlobalContextProvider>
              <GlobalThemeContextProvider>
                  <ThemeProvider theme={theme}>
                      <Box >
                          <App />
                      </Box>
                  </ThemeProvider>
              </GlobalThemeContextProvider>
            </GlobalContextProvider>
      </NotificationProvider>
  </StrictMode>
);
