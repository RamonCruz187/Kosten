import {useState} from "react";

import {Link, Outlet} from "react-router-dom";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled, Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import { Box } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {ChevronLeft, ChevronRight } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import {UserPopover} from "../../../shared/components/UserPopover.jsx";
import {MenuOptionsBottom, MenuOptionsTop} from "../utils/Menu.jsx";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

export const MenuAdmin = ( props ) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ bgColor: 'red' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" noWrap component="div">
                            Administración
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '75px' }}>
                            <UserPopover />
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {
                        MenuOptionsTop.map((item, index) => (
                            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                <Link to={item.to} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemButton
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 2.5,
                                        },
                                        open
                                            ? {
                                                justifyContent: 'initial',
                                            }
                                            : {
                                                justifyContent: 'center',
                                            },
                                    ]}
                                >
                                    <Tooltip title={item.title} placement="right-end">
                                        <ListItemIcon
                                            sx={[
                                                {
                                                    minWidth: 0,
                                                    justifyContent: 'center',
                                                },
                                                open
                                                    ? {
                                                        mr: 3,
                                                    }
                                                    : {
                                                        mr: 'auto',
                                                    },
                                            ]}
                                        >
                                            { item.icon }
                                        </ListItemIcon>
                                    </Tooltip>
                                    <ListItemText
                                        primary={item.title}
                                        sx={[
                                            open
                                                ? {
                                                    opacity: 1,
                                                }
                                                : {
                                                    opacity: 0,
                                                },
                                        ]}
                                    />
                                </ListItemButton>
                                </Link>
                            </ListItem>
                        ))
                    }
                </List>
                <Divider />
                <List>
                    {
                        MenuOptionsBottom.map((item, index) => (
                            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 2.5,
                                        },
                                        open
                                            ? {
                                                justifyContent: 'initial',
                                            }
                                            : {
                                                justifyContent: 'center',
                                            },
                                    ]}
                                >
                                    <Tooltip title={item.title} placement="right-end">
                                        <ListItemIcon
                                            sx={[
                                                {
                                                    minWidth: 0,
                                                    justifyContent: 'center',
                                                },
                                                open
                                                    ? {
                                                        mr: 3,
                                                    }
                                                    : {
                                                        mr: 'auto',
                                                    },
                                            ]}
                                        >
                                            { item.icon }
                                        </ListItemIcon>
                                    </Tooltip>
                                    <ListItemText
                                        primary={item.title}
                                        sx={[
                                            open
                                                ? {
                                                    opacity: 1,
                                                }
                                                : {
                                                    opacity: 0,
                                                },
                                        ]}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
}