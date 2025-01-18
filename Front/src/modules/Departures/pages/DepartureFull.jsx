import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Box,
  Button, 
  Typography,
  Alert,
  CircularProgress
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
  <Box sx={{ display: "flex", gap: 1,  }}>
    <Box sx={{ display: "flex", pt:'5px' }}>{icon}</Box>
    <Typography sx={styles.infoText}>{text}</Typography>
  </Box>
);

const DepartureFull = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(GlobalContext);
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
        }}
      >
        <Box sx={{ textAlign: "center", color: "white", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography
            fontWeight="700"
            variant="h2"
            sx={{ mb: 2, fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" }}}
          >
            Trekking en {packToUse.name}
          </Typography>
          <Button 
            variant="contained" 
            sx={{ bgcolor: "#72CCA0", alignSelf: "center", height: "25px", fontSize: "small",
              '&:hover': {
                backgroundColor: '#00BD7E',
              },
              '&:active': {
                backgroundColor: '#00BD7E',
              },
            }}
            onClick={handleCommentClick}
          >
            Comenta tu experiencia
          </Button>
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
        text="Para dejar un comentario inicia sesion."
      />

        <Box sx={{ 
          display: "grid", 
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          width: '100%',
          maxWidth: '100vw'
        }}>
        {/* Description Box */}
        <Box sx={{ ...styles.contentBox, textAlign: "center", paddingTop: "5%", bgcolor: "#F3F3F3" }}>
          <Typography variant="h5">¿De qué se trata?</Typography>
          <Typography variant="body1"
          sx={{ padding:'10px'}}
          >{packToUse.description || 'Sin descripción disponible'}</Typography>
        </Box>

        {/* Info Box */}
        <Box sx={{ 
          ...styles.contentBox, 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          marginLeft: { xs: "16px", sm: "25%" }, // Hacer responsive el margen
          color: '#fff',
          pr: 2 // Añadir padding right para evitar desbordamiento
        }}>
          <InfoItem sx={{ padding:'10px'}} icon={iconsCardDepartures[1]} text={packToUse.duration || "duración no establecida"}/>
          <InfoItem icon={iconsCardDepartures[2]} text={packToUse.physical_level || "dificultad no establecida"} />
          <InfoItem icon={iconsCardDepartures[3]} text={packToUse.technical_level || "nivel técnico no establecido"} />
          <InfoItem sx={{ padding:'10px'}} icon={iconsCardDepartures[4]} text={packToUse.included_services || "servicios no establecidos"} />
        </Box>

        {/* Image Box */}
       <Box sx={{ ...styles.contentBox, display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
        {packToUse?.itineraryPhoto?.url ? (
          <img
            src={packToUse.itineraryPhoto.url}
            alt={`Imagen de ${packToUse.name}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          // Puedes mostrar una imagen por defecto o un mensaje
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Imagen no disponible
          </Typography>
        )}
      </Box>

        {/* Itinerary Box */}
        <Box sx={{ ...styles.contentBox, textAlign: "center", paddingTop: "5%", bgcolor: "#F3F3F3", paddingX: "70px" }}>
          <Typography variant="h5">Itinerario</Typography>
          <TruncatedText text={packToUse.itinerary || "Itinerario no disponible"} />
        </Box>
      </Box>

       {/* slider salidas: */}
      
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          width: '100%',
          overflow: 'hidden'
        }}>
          <DeparturesSlider sharedPack={packToUse}></DeparturesSlider>
        </div>

      {isLoadingComments ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) 
      : (
        <CommentsBox comments={packageComments} packageName={packToUse.name} />
      )}
      </Box>
    </>
  );
};

export default DepartureFull;