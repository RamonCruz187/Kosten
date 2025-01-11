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
import { useSharedPack, usePackageById } from "../utils/utils";
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


export const DepartureFull = () => {
  const [id, setId] = useState(null);
  const [img, setImg] = useState(null);
  const [sharedPack] = useSharedPack();
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useContext(GlobalContext);
  const [openSessionRequestModal, setOpenSessionRequestModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [packageComments, setPackageComments] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(sharedPack);
  useEffect(() => {
    if (!sharedPack) {
      navigate("/salidas");
    }
  }, [sharedPack, navigate]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!params.id) return;
      
      try {
        setIsLoadingComments(true);
        setCommentsError(null);
        const response = await getPackageCommentsById(id);
        setPackageComments(response.data.data.commentDtoList || []);
      } catch (err) {
        console.error("Error al obtener comentarios:", err);
        setError('No se pudieron cargar los comentarios');
        setPackageComments([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      setImg(`/images/departures/departure-${Number(params.id) + 1}.jpg`);
    }
  }, [params.id]);


  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }


  const mainImage = images[0]?.url || '';


  if (!sharedPack || !id || !img) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          ...styles.mainContainer,
          height: styles.heightResponsive,
          backgroundImage: `url(${img})`
        }}
      >
        <Box sx={{ textAlign: "center", color: "white", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography
              fontWeight="700"
              variant="h2"
              sx={{ mb: 2, fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" } }}
            >
              Trekking en {sharedPack.name}
            </Typography>
            <Button 
            variant="contained" 
            sx={{bgcolor:"#72CCA0", alignSelf:"center", height:"25px", fontSize:"small"}} 
            onClick={ ()=>{
              state.user_auth.token ? 
                (
                  setOpenCommentModal(true)
                ) :
                (
                  setOpenSessionRequestModal(true)
                )
              }}
            >Comenta tu experiencia</Button>
            </Box>
        </Box>
        <CommentModal
          open={openCommentModal}
          onClose={() => setOpenCommentModal(false)}
          packageId = {id}
        />
        <SessionRequestModal
          openSessionRequestModal={openSessionRequestModal}
          onClose={() => setOpenSessionRequestModal(false)}
          text={"Para dejar un comentario inicia sesion."}
      />
        {/* caja con 4 tarjetas: */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr",
              lg: "1fr 1fr",
              xl: "1fr 1fr",
            },
          }}
        >
          {/* caja 1 - esquina sup. izq.: */}
          <Box  sx={{
            height: { xs: "250px", sm: "250px", md: "300px", lg: "372px", xl:"450px" },
            textAlign:"center",
            paddingTop:"5%", 
            bgcolor:"#F3F3F3"}}>
              <Typography variant="h5">De que se trata?</Typography>
              <Typography variant="body1">{description || 'Sin descripción disponible'}</Typography>
          </Box>

          {/* caja 2 - esquina sup. der.: */}
          <Box sx={{
            height: { xs: "250px", sm: "250px", md: "300px",  lg: "372px", xl:"450px"}, 
            display:"flex", 
            flexDirection:"column", 
            justifyContent:"center",
            marginLeft:"40%", 
            color:'#fff'}}>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: 1,
              }}
            >  
              {iconsCardDepartures[1] && (
    <Box sx={{ display: "flex" }}>
      {iconsCardDepartures[1]}
    </Box>
  )}
              <Typography sx={{ fontSize: { xs: ".6rem", sm: ".8rem", md: "1rem" } }}>
                {sharedPack.duration}
              </Typography>
            </Box> 
            
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex" }}>
                {iconsCardDepartures[2]}
              </Box>
              <Typography sx={{ fontSize: { xs: ".6rem", sm: ".8rem", md: "1rem" } }}>
              {sharedPack.physical_level || "dificultad no establecida"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex" }}>
                {iconsCardDepartures[3]}
              </Box>
                <Typography sx={{ fontSize: { xs: ".6rem", sm: ".8rem", md: "1rem" } }}>
                  {sharedPack.technical_level || "nivel tecnico no establecido"}
                </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex" }}>
                {iconsCardDepartures[4]}
              </Box>
                <Typography sx={{ fontSize: { xs: ".6rem", sm: ".8rem", md: "1rem" } }}>
                  {sharedPack.included_services || "servicios no establecidos"}
                </Typography>
            </Box>

          </Box>

          {/* caja 3 - esquina inf. izq.: */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: { xs: "250px", sm: "250px", md: "300px",  lg: "372px", xl:"450px" },
              overflow: "hidden",
            }}
          >
            {sharedPack.images ? (
              <img
                src={sharedPack.images[0].url}
                alt="Descripción de la imagen"
                style={{
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                }}
            />) :
            (
              <p>asd</p>
            )
            }

          </Box>

          {/* caja 4 - esquina inf. der.: */}
          <Box  
  sx={{
    height: { xs: "250px", sm: "250px", md: "300px",  lg: "372px", xl:"450px" },
    textAlign: "center",
    paddingTop: "5%",
    bgcolor: "#F3F3F3",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "pre-wrap",
    paddingX:"70px"
  }}
>
  <Typography variant="h5">Itinerario</Typography>
  <TruncatedText text={"aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaassss sssssssssssss ssssssssssssss sssssssssssssssssss sssssssssssssssss ssssssssssssssssssss ddddddddddddddddddddddddddd dddddddddddddddddddddd fffffffffffffffff ffffffffffffffffffffffffffffffff aaaaaaasssssssss ssssssssssssss sssss sssssssssssssssssssss ssss sssssssssss sssssssssssssss ssssssssssssss ssssssssssssss sssssssssssss sssssssssssss ssssssssss sssssssss ssss sssss sssssssss"}  />

</Box>

        </Box>
      
      <SessionRequestModal
        openSessionRequestModal={openSessionRequestModal}
        onClose={() => setOpenSessionRequestModal(false)}
        text="Para dejar un comentario inicia sesion."
      />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
        {/* Description Box */}
        <Box sx={{ ...styles.contentBox, textAlign: "center", paddingTop: "5%", bgcolor: "#F3F3F3" }}>
          <Typography variant="h5">¿De qué se trata?</Typography>
          <Typography variant="body1"
          sx={{ padding:'10px'}}
          >{packToUse.description || 'Sin descripción disponible'}</Typography>
        </Box>

        {/* Info Box */}
        <Box sx={{ ...styles.contentBox, display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "25%", color: '#fff' }}>
          <InfoItem sx={{ padding:'10px'}} icon={iconsCardDepartures[1]} text={packToUse.duration} />
          <InfoItem icon={iconsCardDepartures[2]} text={packToUse.physical_level || "dificultad no establecida"} />
          <InfoItem icon={iconsCardDepartures[3]} text={packToUse.technical_level || "nivel técnico no establecido"} />
          <InfoItem sx={{ padding:'10px'}} icon={iconsCardDepartures[4]} text={packToUse.included_services || "servicios no establecidos"} />
        </Box>

        {/* Image Box */}
        <Box sx={{ ...styles.contentBox, display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
          {packToUse.itineraryPhoto.url && (
            <img
              src={packToUse.itineraryPhoto.url}
              alt={`Imagen de ${packToUse.name}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </Box>

        {/* Itinerary Box */}
        <Box sx={{ ...styles.contentBox, textAlign: "center", paddingTop: "5%", bgcolor: "#F3F3F3", paddingX: "70px" }}>
          <Typography variant="h5">Itinerario</Typography>
          <TruncatedText text={packToUse.itinerary || "Itinerario no disponible"} />
        </Box>
      </Box>

       {/* slider salidas: */}
      
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          
          <DeparturesSlider sharedPack={sharedPack}></DeparturesSlider>
        </div>

      {isLoadingComments ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) 
      : (
        <CommentsBox comments={packageComments} packageName={packToUse.name} />
      )}
    </>
  );
};
