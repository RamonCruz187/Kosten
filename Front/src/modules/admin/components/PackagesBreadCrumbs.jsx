// @modules/admin/components/PackagesBreadCrumbs.jsx
import { Box, Divider, styled, Typography, useTheme } from "@mui/material";
import { LuCheck } from "react-icons/lu";

export const PackagesBreadCrumbs = ({ step = 1 }) => {
  const theme = useTheme();
  const { palette } = theme;

  return (
    <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      {/* Paso 1 - Información General */}
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <StyledPoint
          sx={{
            color: step >= 1 ? palette.primary.main : palette.grey[50],
            backgroundColor: step === 1 ? "var(--bg-hover-links)" : step > 1 ? "#72CCA0" : palette.grey[300],
          }}
        >
          <Typography variant="titleH3">{step > 1 ? <LuCheck size={20}/> : 1}</Typography>
        </StyledPoint>
        <Typography variant="callToAction" sx={{ color: palette.grey[50] }}>
          Información General
        </Typography>
      </Box>
      {/* Divider */}
      <StyledDivider />
      {/* Paso 2 - Paquete */}
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <StyledPoint
          sx={{
            color: step >= 2 ? palette.primary.main : palette.grey[50],
            backgroundColor: step === 2 ? "var(--bg-hover-links)" : step > 2 ? "#72CCA0" : palette.grey[300],
          }}
        >
          <Typography variant="titleH3">{step > 2 ? <LuCheck /> : 2}</Typography>
        </StyledPoint>
        <Typography variant="callToAction" sx={{ color: palette.grey[50] }}>
          Paquete
        </Typography>
      </Box>
      {/* Divider */}
      <StyledDivider />
      {/* Paso 3 - Destino */}
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <StyledPoint
          sx={{
            color: step >= 3 ? palette.primary.main : palette.grey[50],
            backgroundColor: step === 3 ? "var(--bg-hover-links)" : step > 3 ? "#72CCA0" : palette.grey[300],
          }}
        >
          <Typography variant="titleH3">{step > 3 ? <LuCheck /> : 3}</Typography>
        </StyledPoint>
        <Typography variant="callToAction" sx={{ color: palette.grey[50] }}>
          Destino
        </Typography>
      </Box>
    </Box>
  );
};

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  height: "2px",
  flexGrow: 1,
}));

const StyledPoint = styled(Box)(({ theme, sx = {} }) => ({
  width: "2rem",
  height: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  ...sx,
}));
