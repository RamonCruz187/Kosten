import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {Box, Breadcrumbs} from "@mui/material";
import {Home, NavigateNext} from "@mui/icons-material";

export const Breadcrumb = () => {
    const location = useLocation(); // Utiliza useLocation para obtener la ruta actual
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    const GenericComponent = ({ to, icon, text }) => {
        return (
            <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                to={ to }
                style={{ textDecoration: 'none' }}
            >
                { icon ? icon : null }

                <Box sx={{
                    color: 'gray',
                    '&:hover': {
                        color: 'lightgray',
                    }
                }}>
                    { text ? text : '' }
                </Box>
            </Link>
        );
    }

    const HomeIcon = () =>{
        return (
            <Home sx={{
                color: 'gray',
                fontSize: '1.1rem',
                '&:hover': {
                    color: 'lightgray',
                }
            }} fontSize="inherit" />
        );
    }

    useEffect(() => {

        let route = '';
        const breads = location.pathname === '/' ?
            <GenericComponent key={0} to={'/'} icon={<HomeIcon />} /> :
            location.pathname.split('/').map((segment, index) =>   {

                if (segment === '') {
                    if (index === 0) {
                        return (<GenericComponent key="home" to={'/'} icon={<HomeIcon />} />);
                    }
                    return null;
                }

                route += `/${segment}`;
                return (
                    <GenericComponent
                        key={segment}
                        to={route}
                        text={segment.split('-')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                    />
                );
            }).filter(Boolean);

        setBreadcrumbs(breads);
    }, [location.pathname]);

    return (
        <Breadcrumbs
            maxItems={4}
            separator={<NavigateNext fontSize="small" />}
        >
            { breadcrumbs }
        </Breadcrumbs>
    );
}