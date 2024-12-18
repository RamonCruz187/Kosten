// Front/src/modules/admin/layout/AdminLayout.jsx
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { MenuAdmin } from "../components/MenuAdmin.jsx";
// import { Breadcrumb } from "../../../shared/components/Breadcrumb/Breadcrumb.jsx";

export const AdminLayout = () => {
  return (
    <Box
      component="div"
      sx={{
				position: "relative",
				maxWidth: "100%",
				height: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "var(--bg-lightgray)",
      }}
    >
      <MenuAdmin />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <Box sx={{ m: 2, }}>
          <Breadcrumb />
        </Box> */}
        <Outlet />
      </Box>
    </Box>
  );
};
