import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { _price, _departureInfo, _departureNames } from "../mock/_data.js";
import { iconsCardDepartures } from "../utils/utils.jsx";
import { fCurrency } from "../../../shared/utils/formatNumber.js";
import CommentsBox from "../components/CommentsBox.jsx";
import {commentsDeparture} from "../../../shared/utils/comments.js";
import { useSharedPack } from "../utils/utils.jsx";
import DeparturesSlider from "../components/DeparturesSlider.jsx";
import TruncatedText from "../components/TruncatedText.jsx";

const DepartureFull = () => {
  const [id, setId] = useState(null);
  const [img, setImg] = useState(null);
  const [sharedPack] = useSharedPack();
  const params = useParams();
  const navigate = useNavigate();
  if (!sharedPack) {
    navigate("/salidas");
  }

  useEffect(() => {
    setId(params.id.charAt(params.id.length - 1));
  }, []);

  useEffect(() => {
    if (id) {
      const img = `/images/departures/departure-${Number(id) + 1}.jpg`;
      setImg(img);
    }
  }, [id]);

  
  

  return (
    id &&
    img && (
      <>
        <Box
          sx={{
            display: { xs: "flex" },
            justifyContent: "center",
            width: "100%",
            height: {
              xs: 390, //phones 300
              sm: 400, //tablets 600
              md: 420, //small laptop 900
              lg: 440, //desktop 1024
              xl: 550, //large screens 1536
            },
            backgroundImage: `url(${img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              textAlign:"center",
              color: "white",
              display:"flex",
              flexDirection:"column",
              justifyContent:"center"
            }}
          >
            <Typography
              fontWeight="700"
              variant="h2"
              sx={{ mb: 2, fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" } }}
            >
              Trekking en {sharedPack.name}
            </Typography>
            <Button variant="contained" sx={{bgcolor:"#72CCA0", alignSelf:"center", height:"25px", fontSize:"small"}} >Comenta tu experiencia</Button>
            </Box>
        </Box>

        {/* caja con 4 tarjetas: */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",   // Una columna en pantallas pequeñas
              sm: "1fr 1fr", // Dos columnas en pantallas medianas
              md: "1fr 1fr", // Dos columnas en pantallas grandes
              lg: "1fr 1fr", // Dos columnas en pantallas muy grandes
              xl: "1fr 1fr", // Igual para pantallas extra grandes
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
              <Typography variant="p">{sharedPack.description}</Typography>
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
              <Box sx={{ display: "flex" }}>
                {iconsCardDepartures[1]}
              </Box>
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
              {sharedPack.physical_level}
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
                  {sharedPack.technical_level}
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
                  {sharedPack.included_services}
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
            <img
              src={sharedPack.images[0].url}
              alt="Descripción de la imagen"
              style={{
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
              }}
            />
          </Box>

          {/* caja 4 - esquina inf. der.: */}
          <Box  
  sx={{
    height: { xs: "250px", sm: "250px", md: "300px",  lg: "372px", xl:"450px" },
    textAlign: "center",
    paddingTop: "5%",
    bgcolor: "#F3F3F3",
    overflow: "hidden",  // Evita que el contenido desborde el contenedor
    textOverflow: "ellipsis", // Muestra puntos suspensivos si es necesario
    whiteSpace: "pre-wrap",  // Permite saltos de línea para el texto largo
    paddingX:"70px"
  }}
>
  <Typography variant="h5">Itinerario</Typography>
  <TruncatedText text={"aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaassss sssssssssssss ssssssssssssss sssssssssssssssssss sssssssssssssssss ssssssssssssssssssss ddddddddddddddddddddddddddd dddddddddddddddddddddd fffffffffffffffff ffffffffffffffffffffffffffffffff aaaaaaasssssssss ssssssssssssss sssss sssssssssssssssssssss ssss sssssssssss sssssssssssssss ssssssssssssss ssssssssssssss sssssssssssss sssssssssssss ssssssssss sssssssss ssss sssss sssssssss"}  />

</Box>

        </Box>
      
        {/* slider salidas: */}
      
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          
          <DeparturesSlider sharedPack={sharedPack}></DeparturesSlider>
        </div>
        <CommentsBox comments={commentsDeparture} />
      </>
    )
  );
};
export default DepartureFull;