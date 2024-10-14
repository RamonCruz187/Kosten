import React from 'react';
import AppRoutes from './routes/AppRoutes';
import {GlobalContextProvider} from "./shared/context/GlobalContext.jsx";

const App = () => {
  return (
      <GlobalContextProvider>
        <AppRoutes />
      </GlobalContextProvider>
  );
};

export default App;

