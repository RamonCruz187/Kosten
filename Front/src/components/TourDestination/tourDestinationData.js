import aconcagua from "../../assets/TourDestination/aconcagua.jpg";
import adolfo_calle from "../../assets/TourDestination/adolfo_calle.jpg";
import cerro_champaqui from "../../assets/TourDestination/cerro_champaqui.jpg";
import cerro_del_medio from "../../assets/TourDestination/cerro_del_medio.jpg";
import cerro_penitentes from "../../assets/TourDestination/cerro_penitente.jpg";
import cerro_serrata from "../../assets/TourDestination/cerro_serrata.jpg";
import cerro_tres_picos from "../../assets/TourDestination/cerro_tres_picos.jpg";
import cerro_vallecitos from "../../assets/TourDestination/cerro_vallecitos.jpg";
import la_cadenita from "../../assets/TourDestination/la_cadenita.jpg";
import tilcara from "../../assets/TourDestination/tilcara_calilegua.jpg";
import volcan_bertrand from "../../assets/TourDestination/volvan_bertrand.jpg";
import volcan_hincahuasi from "../../assets/TourDestination/volcan_Hincahuasi.jpg";
import volcan_san_francisco from "../../assets/TourDestination/volcan_san_francisco.jpg";

export const tourDestinationData = {
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
    "Cerro Penitentes": cerro_penitentes,
    "Cerro Vallecitos": cerro_vallecitos,
    "Adolfo Calle y Stepanek": adolfo_calle,
    "La Cadenita": la_cadenita,
    "Cerro Serrata": cerro_serrata,
    "Aconcagua": aconcagua,
  },
  "REGIÓN PATAGÓNICA": {
    "Cerro Penitentes": cerro_penitentes,
    "Cerro del Medio": cerro_del_medio,
  },
};

// Cerro Penitentes Details
import cerroPenitenteBanner from "../../assets/TourDestination/cerro_penitentes/banner.jpg";
import cerroPenitenteRow1 from "../../assets/TourDestination/cerro_penitentes/row1.jpg";
import cerroPenitenteRow2 from "../../assets/TourDestination/cerro_penitentes/row2.jpg";
import cerroPenitenteRow3 from "../../assets/TourDestination/cerro_penitentes/row3.jpg";

export const destinationCerroPenitentes = {
  row0: {
    id: "Cerro Penitentes",
    imgBanner: cerroPenitenteBanner,
  },
  row1: {
    title: "Ubicación",
    imgRow: cerroPenitenteRow1,
    text: ` El cerro se ubica en la cordillera central de los Andes, a 180 km desde la capital de la provincia de Mendoza y se eleva a 4360 m sobre el nivel del mar.
            _Por su ubicación geográfica te deja observar increíbles paisajes. Desde su cumbre, se puede visualizar la Pared Sur del gigante de América, el famoso Cerro Aconcagua.
            También se logra ver volcán Tupungato, Cerro Tolosa, entre otros macizos.
            `,
  },
  row2: {
    title: "Historia",
    imgRow: cerroPenitenteRow2,
    text: `Se lo conoce como Cerro Penitentes por las estructuras rocosas, cercanas a su cumbre, de formas muy particulares que se asemejan a monjes peregrinando.
    _Además es sitio arqueológico, donde los Incas utilizaron como altares para sus ceremonias.
    `,
  },
  row3: {
    title: "QUÉ ACTIVIDAD PROPONEMOS?",
    imgRow: cerroPenitenteRow3,
    text: `Desde Kosten proponemos una expedición comenzando en las inmediaciones del Centro de Ski Penitentes, a pocos kilómetros de Puente del Inca. 
    _Desde ahí nos introducimos en la Quebrada de Vargas, donde se arma campamento a una altura de 3000 m sobre el nivel del mar.  Desde ese punto se inicia el ascenso a la cumbre del Cerro Penitentes. 
    _Es una de las opciones elegidas por muchas personas que desean empezar en el montañismo de altura o para aclimatarse previo a otros objetivos mayores.
    `,
  },
};
