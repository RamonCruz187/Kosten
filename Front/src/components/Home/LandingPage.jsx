import React from 'react';
import AppAppBar from "../../shared/components/AppAppBar.jsx";
import Box from "@mui/material/Box";
import {PackageGrid} from "../../modules/package/components/PackageGrid.jsx";

const LandingPage = () => {
  return (
    <Box sx={{ mt: 15 }}>
        <AppAppBar />
        <PackageGrid title="PRÓXIMAS SALIDAS" />
      <h1>Welcome to the App</h1>
      <p>This is the landing page.</p>
    </Box>
  );
};

export default LandingPage;
