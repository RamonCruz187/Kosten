// src/shared/components/buttons/CallToActionButton.jsx
import { Button, useMediaQuery, useTheme } from "@mui/material"

// No tiene iconos
export const CallToActionButton = ({
islarge = true,
text = 'VER NUESTRAS SALIDAS',
onClick = () => {},
sx,
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Button
			variant="contained"
			color="primary"
			size= {islarge && !isMobile ? "large" : "small"}
			onClick= {onClick}
			sx={{
				paddingX: {xs: islarge ? "2rem" : "1rem", sm: islarge ? "5rem" : "1rem"},
				fontSize: {xs: islarge ? "18px" : "14px", sm: islarge ? "20px" : "16px"},
				...sx
    	}}
    >
			{text}
    </Button>
  )
}


