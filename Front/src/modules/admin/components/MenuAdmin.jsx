import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
  styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { MenuOptionsTop } from "../utils/Menu.jsx";
// import { MenuOptionsBottom } from "../utils/Menu.jsx";

const drawerWidth = 295;

const Sidebar = styled(Box)(({ theme, open }) => ({
	height: "100%",
  width: open ? drawerWidth : theme.spacing(8),
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "var(--bg-boldgray)",
  color: "var(--color-links)",
  display: "flex",
  flexDirection: "column",
  position: "relative", // Ajustado al contenedor padre
}));

export const MenuAdmin = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2];
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = useState(isLargeScreen ? true : false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box>
      {/* Sidebar */}
      <Sidebar open={open}>
        {/* Botón para abrir/cerrar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 1,
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: "var(--color-links)" }}
          >
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
        <List sx={{ flexGrow: 1 }}>
          {MenuOptionsTop.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                display: "block",
                backgroundColor: currentPath === item.to.split("/")[2] && "var(--bg-hover-links)",
                color: currentPath === item.to.split("/")[2] && "var(--color-hover-links)",
                "&:hover": {
                  backgroundColor: "var(--bg-hover-links)",
                  color: "var(--color-hover-links)",
                },
              }}
            >
              <Link
                to={item.to}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  // padding: "10px",
                  color: "inherit",
                }}
              >
                <Tooltip title={item.title} placement="right">
                  <Box
                    component="span"
                    sx={{
                      // minWidth: 44,
											fontSize: "1.5rem",
                      display: "flex",
                      justifyContent: "center",
                      marginX: open ? "10px" : "auto",
											paddingY: "10px",
											
                    }}
                  >
                    {item.icon}
                  </Box>
                </Tooltip>
								<Typography
									variant="titleH2"
									sx={{ 
										fontWeight: 400, 
										whiteSpace: "nowrap",
										color: "inherit", 
										width: open ? "100%" : "0",
										overflow: "hidden",
										transition: "width 0.3s ease-in-out, opacity 0.15s ease-in-out",
									}}
								>
									{item.title}
								</Typography>
              </Link>
            </ListItem>
          ))}
        </List>
      </Sidebar>
    </Box>
  );
};
