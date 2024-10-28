import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {Outlet} from "react-router-dom";
import NavBar from "../../../components/Home/NavBar.jsx";
import {css} from "@emotion/react";
import {MenuAdmin} from "../components/MenuAdmin.jsx";

const styles = {
    container: css`
      display: flex;
      align-items: center;
      margin-top: .6rem;
    `,
}

export const AdminLayout = () => {
    return (
        <Box>
            <Container
                disableGutters
                component="div"
                maxWidth="100%"
                sx={{
                    display: {sm: 'flex'},
                    justifyContent: {sm: 'center'},
                    backgroundColor: 'var(--bg-lightgray)'
                }}
            >
                <Box
                    css={styles.container}
                    // maxWidth="lg"
                    sx={{
                        // width: { xs: 'auto', sm: '600px', md: '900px', lg: '1024px', xl: '1536px', xxl: '1600px' },
                        width: '100%'
                    }}
                >
                    <MenuAdmin />
                </Box>
            </Container>
        </Box>
    )
}