import Box from "@mui/material/Box";
import NavBar from "../../../components/Home/NavBar.jsx";
import React from "react";
import { DepartureGrid } from "../components/DepartureGrid.jsx";

export const DepartureView = () => {

    return (<>
        <NavBar />
        <DepartureGrid title="PRÓXIMAS SALIDAS" />
        <Box sx={{ }} >
            Salidas
        </Box>
    </>);

}