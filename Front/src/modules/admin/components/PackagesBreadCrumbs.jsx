// @modules/admin/components/PackagesBreadCrumbs.jsx
import { Box, Divider, styled, Typography, useTheme } from "@mui/material";
import { LuCheck } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";

export const PackagesBreadCrumbs = ({ step = 1, completeSteps = { isCompleteTwo: false, isCompleteThree: false} }) => {
  const theme = useTheme();
  const { palette } = theme;
  const params = useParams();
  const packageId = params?.id || null;
  const navigate = useNavigate();

  const handleClick = (step) => {
    if (!packageId) return;
    if (step === 1) return navigate(`/admin/paquetes/basico/${packageId}`);
    if (step === 2) return navigate(`/admin/paquetes/detalles/${packageId}`);
    if (step === 3) return navigate(`/admin/paquetes/destinos/${packageId}`);
  };

  return (
    <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      {/* Paso 1 - Información General */}
      <Box 
        sx={{ 
          display: "flex", 
          gap: "1rem", 
          alignItems: "center",
          cursor: !packageId || step === 1 ? 'not-pointer' : 'pointer'
        }}
        onClick={() => handleClick(1)}
      >
        <StyledPoint
          sx={{
            color: step >= 1 ? palette.primary.main : palette.grey[50],
            backgroundColor: step === 1 ? palette.primary.main : step > 1 ? palette.accent.main : palette.grey[300],
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {step > 1 || params?.id
            ? <LuCheck size={step > 1 ? 24 : 20} color={palette.text.main}/> 
            : <Typography variant="titleH3">1</Typography>
          }
          
        </StyledPoint>
        <Typography variant="callToAction" sx={{ color: palette.grey[50] }}>
          Información General
        </Typography>
      </Box>
      {/* Divider */}
      <StyledDivider />
      {/* Paso 2 - Paquete */}
      <Box 
        sx={{ 
          display: "flex", 
          gap: "1rem", 
          alignItems: "center",
          cursor: !packageId || step === 2 ? 'not-pointer' : 'pointer'
        }}
        onClick={() => handleClick(2)}
      >
        <StyledPoint
          sx={{
            color: step >= 2 ? palette.primary.main : palette.grey[50],
            backgroundColor: step === 2 ? palette.primary.main : step > 2 && completeSteps.isCompleteTwo ? palette.accent.main : palette.grey[300],
          }}
        >
          <Typography variant="titleH3">{completeSteps.isCompleteTwo ? <LuCheck size={step > 2 ? 24 : 20}/> : 2}</Typography>
        </StyledPoint>
        <Typography variant="callToAction" sx={{ color: palette.grey[50] }}>
          Paquete
        </Typography>
      </Box>
      {/* Divider */}
      <StyledDivider />
      {/* Paso 3 - Destino */}
      <Box 
        sx={{ 
          display: "flex", 
          gap: "1rem", 
          alignItems: "center",
          cursor: !packageId || step === 3 ? 'not-pointer' : 'pointer'
        }}
        onClick={() => handleClick(3)}
      >
        <StyledPoint
          sx={{
            color: step >= 3 ? palette.primary.main : palette.grey[50],
            backgroundColor: step === 3 ? palette.primary.main : step > 3 ? palette.accent.main : palette.grey[300],
          }}
        >
          <Typography variant="titleH3">{completeSteps.isCompleteThree ? <LuCheck size={step > 3 ? 24 : 20}/> : 3}</Typography>
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
