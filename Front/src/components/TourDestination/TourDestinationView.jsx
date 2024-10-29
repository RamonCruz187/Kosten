import { Box, Stack, Typography } from "@mui/material";
import TourDestinationCard from "./TourDestinationCard";
import aconcagua from "../../assets/TourDestination/aconcagua.jpg";
import adolfo_calle from "../../assets/TourDestination/adolfo_calle.jpg";
import cerro_champaqui from "../../assets/TourDestination/cerro_champaqui.jpg";
import cerro_del_medio from "../../assets/TourDestination/cerro_del_medio.jpg";
import cerro_penitente from "../../assets/TourDestination/cerro_penitente.jpg";
import cerro_serrata from "../../assets/TourDestination/cerro_serrata.jpg";
import cerro_tres_picos from "../../assets/TourDestination/cerro_tres_picos.jpg";
import cerro_vallecitos from "../../assets/TourDestination/cerro_vallecitos.jpg";
import la_cadenita from "../../assets/TourDestination/la_cadenita.jpg";
import tilcara from "../../assets/TourDestination/tilcara_calilegua.jpg";
import volcan_bertrand from "../../assets/TourDestination/volvan_bertrand.jpg";
import volcan_hincahuasi from "../../assets/TourDestination/volcan_Hincahuasi.jpg";
import volcan_san_francisco from "../../assets/TourDestination/volcan_san_francisco.jpg";
import { customPalette } from "../../../customStyle";



export default function TourDestinationView() {
  const data = {
    "REGIÓN NORTE (PUNA)": {
      "Tilcara Calilegua": tilcara,
      "Volcán San Francisco": volcan_san_francisco,
        "Volcán Bertrand": volcan_bertrand,
        "Volcán Hincahuasi": volcan_hincahuasi,
    },
    "REGIÓN CENTRAL": {
        "Cerro Tres Picos": cerro_tres_picos,
        "Cerro Champaquí": cerro_champaqui,
    },
    "REGIÓN CUYANA": {
        "Cerro Penitentes": cerro_penitente,
        "Cerro Vallecitos": cerro_vallecitos,
        "Adolfo Calle y Stepanek": adolfo_calle,
        "La Cadenita": la_cadenita,
        "Cerro Serrata": cerro_serrata,
        "Aconcagua": aconcagua,
    },
    "REGIÓN PATAGÓNICA": {
        "Cerro Penitentes": cerro_penitente,
        "Cerro del Medio": cerro_del_medio,
    },
  };

  return (
    <Box sx={{background: customPalette.page_bg, padding:'1rem 2rem 2rem'}}>
      {Object.entries(data).map(([region, destinations], index) => (
        <Box key={index} sx={{padding: '2rem'}}>
          <Typography variant="titleH1" sx={{color: customPalette.text.light}}>{region}</Typography>
          <Stack direction="row" sx={{gap:'4rem', flexWrap:'wrap', marginTop: '2rem'}}>
            {Object.entries(destinations).map(([destino, img], idx) => (
              <TourDestinationCard key={idx} img={img} title={destino} />
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
}
