// Front/src/modules/admin/layout/AdminLayout.jsx
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { MenuAdmin } from "../components/MenuAdmin.jsx";

export const AdminLayout = () => {
  return (
    <Box
      component="div"
      sx={{
				position: "relative",
				maxWidth: "100%",
				minHeight: "80dvh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "var(--bg-lightgray)",
      }}
    >
      <MenuAdmin />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
