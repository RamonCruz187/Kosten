// src/modules/Departures/pages/DepartureFull.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Box,
  Typography,
  Alert,
  CircularProgress,
  useTheme
} from "@mui/material";
import { iconsCardDepartures } from "../utils/utils";
import { usePackageById } from "../utils/utils";
import DeparturesSlider from "../components/DeparturesSlider";
import TruncatedText from "../components/TruncatedText";
import SessionRequestModal from '../components/SessionRequestModal';
import { GlobalContext } from '../../../shared/context/GlobalContext';
import CommentModal from '../components/CommentModal';
import { getPackageCommentsById } from "../../../api/commentApi";
import  CommentsBox  from '../components/CommentsBox';
import { CallToActionButton } from "@/shared/components/buttons/CallToActionButton";

const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%", 
    maxWidth: '100vw',
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
    paddingRight:"20px"
  }
};

const InfoItem = ({ icon, text }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, paddingY: 1 }}>
    {icon}
    <Typography sx={styles.infoText}>{text}</Typography>
  </Box>
);

const DepartureFull = () => {
  const { id } = useParams();
  const { state } = useContext(GlobalContext);
  
  const navigate = useNavigate();
  const theme = useTheme();
  const { palette } = theme;
  const [img, setImg] = useState(null);
  const [openSessionRequestModal, setOpenSessionRequestModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [packageComments, setPackageComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const { pack: currentPack, isLoading, error } = usePackageById(id);
  const [commentsError, setCommentsError] = useState(null);

  const packToUse = currentPack;


  useEffect(() => {
    if (id) {
      const imageNumber = id.charAt(id.length - 1);
      setImg(`/images/departures/departure-${Number(imageNumber) + 1}.jpg`);
    }
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!id) return;
      
      try {
        setIsLoadingComments(true);
        setCommentsError(null);
        const response = await getPackageCommentsById(id);
        setPackageComments(response.data.data.commentDtoList || []);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setCommentsError('No se pudieron cargar los comentarios');
      } finally {
        setIsLoadingComments(false);
      }
    };

    fetchComments();
  }, [id]);

  const handleCommentClick = () => {
    state.user_auth.token ? setOpenCommentModal(true) : setOpenSessionRequestModal(true);
  };


  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
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

  if (!packToUse) {
    navigate("/salidas");
    return null;
  }

  return (
    <>
      <Box sx={{ overflowX: 'hidden', width: '100%' }}>
      <Box
        sx={{
          ...styles.mainContainer,
          height: styles.heightResponsive,
          backgroundImage: `url(${packToUse.bannerPhoto.url})`,
          position: 'relative'
        }}
      >
        <Box sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          width: '100%',
          height: '100%',
          position: 'absolute'
        }}
        />
        <Box sx={{ 
          textAlign: "center", 
          color: "white", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center",
          zIndex: 5
        }}>
          <Typography
            fontWeight="700"
            variant="titleH1"
            color="text.light"
            sx={{ mb: 2, fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5", lg: "2.8rem", xl: "3rem" }}}
          >
            Trekking en {packToUse.name}
          </Typography>
          <CallToActionButton
            text="Comenta tu experiencia"
            onClick={handleCommentClick}
            islarge={false}
          />
        </Box>
      </Box>

      <CommentModal
        open={openCommentModal}
        onClose={() => setOpenCommentModal(false)}
        packageId={id}
      />
      
      <SessionRequestModal
        openSessionRequestModal={openSessionRequestModal}
        onClose={() => setOpenSessionRequestModal(false)}
        action="comentar"
        title="COMENTAR SALIDA"
      />

        <Box sx={{ 
          display: "grid", 
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          width: '100%',
          maxWidth: '100vw'
        }}>
        {/* Description Box */}
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: {xs: "2rem 1rem", sm: "2rem", md: "3rem", lg: "3rem 2rem 3rem 3rem", xl: "3rem 2rem 3rem 4rem"}, 
          backgroundColor: palette.tertiary.light, 

        }}>
          <Typography variant="titleH2"
            sx={{
              textAlign: "center",
              fontSize: { xs: "20px", sm: "22px", md: "24px", xl: "28px" },
              marginBottom: "1rem"
            }}
          >
            ¿De qué se trata?
          </Typography>
          <Typography variant="p"
          sx={{ 
            // padding:'10px'
						fontSize: { xs: "12px", sm: "12px", md: "14px", xl: "18px" }, // mismo que itinerario
          }}
          >{packToUse.description || 'Sin descripción disponible'}</Typography>
        </Box>

        {/* Info Box */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center",
          fontSize: { xs: "20px", sm: "22px", md: "24px", xl: "28px" },
          paddingLeft: {xs: "unset", sm: "25%"},
          marginX: {xs: "auto", sm: "unset"},
          paddingY: {xs: "2rem", sm: "2rem", md: "3rem", lg: "3rem", xl: "4rem"},
          color: palette.text.light,
        }}>
          <InfoItem icon={iconsCardDepartures[1]} text={packToUse.duration || "duración no establecida"}/>
          <InfoItem icon={iconsCardDepartures[2]} text={packToUse.physical_level || "dificultad no establecida"} />
          <InfoItem icon={iconsCardDepartures[3]} text={packToUse.technical_level || "nivel técnico no establecido"} />
          <InfoItem icon={iconsCardDepartures[4]} text={packToUse.included_services || "servicios no establecidos"} />
        </Box>

        {/* Image Box */}
       <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
        {packToUse?.itineraryPhoto?.url ? (
          <Box
            // component="img"
            // src={packToUse.itineraryPhoto.url}
            alt={`Imagen de ${packToUse.name}`}
            sx={{ 
              width: "100%", 
              height: "100%", 
              backgroundImage: `url(${packToUse.itineraryPhoto.url})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        ) : (
          // Puedes mostrar una imagen por defecto o un mensaje
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Imagen no disponible
          </Typography>
        )}
      </Box>

        {/* Itinerary Box */}
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: {xs: "2rem 1rem", sm: "2rem", md: "3rem", lg: "3rem 2rem", xl: "3rem 4rem 3rem 2rem"}, 
          backgroundColor: palette.tertiary.light, 

        }}>
          <Typography variant="titleH2" sx={{textAlign: "center", fontSize: { xs: "20px", sm: "22px", md: "24px", xl: "28px" }, marginBottom: "1rem"}}>Itinerario</Typography>
          <TruncatedText text={packToUse.itinerary || "Itinerario no disponible"} />
        </Box>
      </Box>

       {/* slider salidas: */}
      
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          width: '100%',
          overflow: 'hidden'
        }}>
          <DeparturesSlider sharedPack={packToUse}></DeparturesSlider>
        </Box>

      {isLoadingComments ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) 
      : (
        <CommentsBox comments={packageComments} packageName={packToUse.name} handleCommentClick={handleCommentClick} />
      )}
      </Box>
    </>
  );
};

export default DepartureFull;