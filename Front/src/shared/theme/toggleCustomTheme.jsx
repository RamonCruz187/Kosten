import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { AutoAwesomeRounded, Flare } from "@mui/icons-material";
import {useGlobalTheme} from "../hooks/useGlobalTheme.jsx";
import {Typography} from "@mui/material";

export function ToggleCustomTheme() {

    const { showCustomTheme, toggleCustomTheme } = useGlobalTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={showCustomTheme}
                onChange={toggleCustomTheme}
                aria-label="Toggle design language"
                sx={{
                    backgroundColor: 'background.default',
                    '& .Mui-selected': {
                        pointerEvents: 'none',
                    },
                }}
            >
                <ToggleButton value={true}>
                    <AutoAwesomeRounded sx={{ fontSize: '14px', mr: 1 }} />

                    <Typography sx={{ display: { xs: "none", md: "block" } }}>
                        Personalizado
                    </Typography>

                </ToggleButton>
                <ToggleButton data-screenshot="toggle-default-theme" value={false}>
                    <Flare sx={{ fontSize: '14px', mr: 1 }} />

                    <Typography sx={{ display: { xs: "none", md: "block" } }}>
                        Material 2
                    </Typography>

                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}