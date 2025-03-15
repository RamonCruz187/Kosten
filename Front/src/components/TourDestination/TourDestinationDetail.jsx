// src/components/TourDestination/TourDestinationDetail.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { usePackageById } from "@/modules/Departures/utils/utils";
import SessionRequestModal from "@/modules/Departures/components/SessionRequestModal";
import { ColorButton } from "@/shared/components/buttons/ColorButton";
import GalleryComponent from "@components/PhotosGallery/GalleryComponent";
import { formatLongTexts } from "@/shared/utils/formatLongTexts";

const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxWidth: "100vw",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  heightResponsive: {
    xs: 390,
    sm: 400,
    md: 420,
    lg: 440,
    xl: 550,
  },
  contentBox: {
    height: { xs: "250px", sm: "250px", md: "300px", lg: "372px", xl: "450px" },
  },
  infoText: {
    fontSize: { xs: ".6rem", sm: ".8rem", md: "1rem" },
    paddingRight: "20px",
  },
};

const TourDestinationDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const theme = useTheme();
  const { palette } = theme;
  const [openSessionRequestModal, setOpenSessionRequestModal] = useState(false);
  const { pack: packToUse, isLoading, error } = usePackageById(id);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Box sx={{ overflowX: "hidden", width: "100%" }}>
        <Box
          sx={{
            ...styles.mainContainer,
            height: styles.heightResponsive,
            backgroundImage: `url(${packToUse?.bannerPhoto.url})`,
            position: "relative",
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          />
          <Box
            sx={{
              textAlign: "center",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 5,
            }}
          >
            <Typography
              fontWeight="700"
              variant="titleH1"
              color="text.light"
              sx={{
                mb: 2,
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.2rem",
                  md: "2.5",
                  lg: "2.8rem",
                  xl: "3rem",
                },
              }}
            >
              Trekking en {packToUse?.name}
            </Typography>
          </Box>
        </Box>

        <SessionRequestModal
          openSessionRequestModal={openSessionRequestModal}
          onClose={() => setOpenSessionRequestModal(false)}
          action="comentar"
          title="COMENTAR SALIDA"
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            width: "100%",
            maxWidth: "100vw",
          }}
        >
          {/* Ubicacion Box */}
          <Box
            sx={{
              order: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: {
                xs: "2rem 1rem",
                sm: "2rem",
                md: "3rem",
                lg: "3rem 2rem 3rem 3rem",
                xl: "3rem 2rem 3rem 4rem",
              },
              backgroundColor: palette.tertiary.light,
            }}
          >
            <Typography
              variant="titleH2"
              sx={{
                textAlign: "center",
                fontSize: { xs: "20px", sm: "22px", md: "24px", xl: "28px" },
                marginBottom: "1rem",
              }}
            >
              UBICACIÓN
            </Typography>
            {packToUse?.historyInfo
              ? 
              formatLongTexts(packToUse?.locationInfo).map((info, index) => (
                <Typography key={`locationInfo-${index}`} variant="p"
                  sx={{fontSize: { xs: "14px", xl: "18px" },}}
                >
                  {info.trim() === "" ? "\u00A0" : info}
                </Typography>
              ))
              
              :
              <Typography variant="p"
                sx={{fontSize: { xs: "14px", xl: "18px" },}}
              >
                Sin descripción de ubicación disponible
              </Typography>
            }
          </Box>

          {/* Ubicacion Img */}
          <Box
            sx={{
              order: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              minHeight: "30vh",
            }}
          >
            {packToUse?.destinyPhotos && packToUse?.destinyPhotos[0]?.url ? (
              <Box
                alt={`Imagen de ${packToUse?.name}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${packToUse?.destinyPhotos[0].url})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
            ) : (
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Imagen no disponible
              </Typography>
            )}
          </Box>

          {/* Historia Img */}
          <Box
            sx={{
              order: { xs: 4, sm: 3 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              minHeight: "30vh",
            }}
          >
            {packToUse?.destinyPhotos && packToUse?.destinyPhotos[1]?.url ? (
              <Box
                alt={`Imagen de ${packToUse?.name}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${packToUse?.destinyPhotos[1].url})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
            ) : (
              // Puedes mostrar una imagen por defecto o un mensaje
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Imagen no disponible
              </Typography>
            )}
          </Box>

          {/* Historia Box */}
          <Box
            sx={{
              order: { xs: 3, sm: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: {
                xs: "2rem 1rem",
                sm: "2rem",
                md: "3rem",
                lg: "3rem 2rem",
                xl: "3rem 4rem 3rem 2rem",
              },
              backgroundColor: palette.tertiary.light,
            }}
          >
            <Typography
              variant="titleH2"
              sx={{
                textAlign: "center",
                fontSize: { xs: "20px", sm: "22px", md: "24px", xl: "28px" },
                marginBottom: "1rem",
              }}
            >
              HISTORIA
            </Typography>
            {packToUse?.historyInfo
              ? 
              formatLongTexts(packToUse?.historyInfo).map((info, index) => (
                <Typography key={`historyInfo-${index}`} variant="p"
                  sx={{fontSize: { xs: "14px", xl: "18px" },}}
                >
                  {info.trim() === "" ? "\u00A0" : info}
                </Typography>
              ))
              
              :
              <Typography variant="p"
                sx={{fontSize: { xs: "14px", xl: "18px" },}}
              >
                Sin historia disponible
              </Typography>
            }
          </Box>

          {/* Actividad Box */}
          <Box
            sx={{
              order: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: {
                xs: "2rem 1rem",
                sm: "2rem",
                md: "3rem",
                lg: "3rem 2rem 3rem 3rem",
                xl: "3rem 2rem 3rem 4rem",
              },
              backgroundColor: palette.tertiary.light,
            }}
          >
            <Typography
              variant="titleH2"
              sx={{
                textAlign: "center",
                fontSize: { xs: "20px", sm: "22px", md: "24px", xl: "28px" },
                marginBottom: "1rem",
              }}
            >
              QUÉ ACTIVIDAD PROPONEMOS?
            </Typography>
            {packToUse?.activityInfo
              ? 
              formatLongTexts(packToUse?.activityInfo).map((activity, index) => (
                <Typography key={`activityInfo-${index}`} variant="p"
                  sx={{fontSize: { xs: "14px", xl: "18px" },}}
                >
                  {activity.trim() === "" ? "\u00A0" : activity}
                </Typography>
              ))
              
              :
              <Typography variant="p"
                sx={{fontSize: { xs: "14px", xl: "18px" },}}
              >
                Sin actividad disponible
              </Typography>
            }
            <ColorButton
            type="greenButton"
            text="VER SALIDAS DISPONIBLES"
            onClick={() => {
              navigate(`/salidas/${id}`);
            }}
            sx={{ marginTop: "2rem", alignSelf: "center" }}
            />
          </Box>

          {/* ACividad Img */}
          <Box
            sx={{
              order: 6,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              minHeight: "30vh",
            }}
          >
            {packToUse?.destinyPhotos && packToUse?.destinyPhotos[2]?.url ? (
              <Box
                alt={`Imagen de ${packToUse?.name}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${packToUse?.destinyPhotos[2].url})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
            ) : (
              // Puedes mostrar una imagen por defecto o un mensaje
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Imagen no disponible
              </Typography>
            )}
          </Box>
        </Box>
        <GalleryComponent images={packToUse?.images} />
      </Box>
    </>
  );
};

export default TourDestinationDetail;
