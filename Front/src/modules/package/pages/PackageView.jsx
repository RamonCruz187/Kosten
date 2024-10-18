import Box from "@mui/material/Box";
import NavBar from "../../../components/Home/NavBar.jsx";
import React from "react";
import {PackageGrid} from "../components/PackageGrid.jsx";

export const PackageView = () => {

    return (<>
        <NavBar />
        <PackageGrid title="PRÓXIMAS SALIDAS" />
        <Box sx={{ }} >
            Salidas
        </Box>
    </>);

}