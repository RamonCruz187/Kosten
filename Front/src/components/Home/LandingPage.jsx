import React from 'react';
import AppAppBar from "../../shared/components/AppAppBar.jsx";
import Box from "@mui/material/Box";

const LandingPage = () => {
  return (
    <Box sx={{ mt: 15 }}>
        <AppAppBar />
      <h1>Welcome to the App</h1>
      <p>This is the landing page.</p>
    </Box>
  );
};

export default LandingPage;
