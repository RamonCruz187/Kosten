import React from 'react';
import AppRoutes from './routes/AppRoutes';
import {GlobalContextProvider} from "./shared/context/GlobalContext.jsx";
import {GlobalThemeContextProvider} from "./shared/theme/GlobalThemeContext.jsx";

const App = () => {
  return (
      <GlobalContextProvider>
          <GlobalThemeContextProvider>
              <AppRoutes />
          </GlobalThemeContextProvider>
      </GlobalContextProvider>
  );
};

export default App;

