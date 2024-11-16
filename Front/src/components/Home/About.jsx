import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
} from "@mui/material";
import img from "../../assets/about.jpg";
import imgquienessomos from "../../assets/quienes-somos.jpg";
import staffalejandro from "../../assets/staff-alejandro.jpg";
import staffpablo from "../../assets/staff-pablo.jpg";
import staffmariano from "../../assets/staf-mariano.jpg";

const staffMembers = [
  {
    name: 'Pablo Haedo',
    image: staffpablo,
    alt: 'Pablo Haedo',
  },
  {
    name: 'Mariano Vaucheret',
    image: staffmariano,
    alt: 'Mariano Vaucheret',
  },
  {
    name: 'Alejandro Tomassino',
    image: staffalejandro,
    alt: 'Alejandro Tomassino',
  },
];


const About = () => {
  return (
    <>
      <Box>
        <Box>
          <img
            src={img}
            alt="Imagen Fondo"
            style={{
              width: "100%",
              height: "auto",
              margin: "0",
              padding: "0",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>
        <Box
          sx={{
            background: "#080808",
            padding: "0",
            display: "flex",
            
            objectFit: "cover",
            flexDirection: { xs: "column", md: "column", lg: "row", xl: "row", sm: "column" },
          }}
        >
          <Box
            sx={{
              flex: 1,
              padding: "4rem",
              textAlign: "center",
              alignContent: "center",
              marginRight: {xl:"120px", lg:"120px", md:"120px", sm:"0px", xs:"0px"},
              marginLeft: {xl:"120px", lg:"120px", md:"120px", sm:"0px", xs:"0px"},
             
              
            }}
          >
            <Typography variant="titleH1" color="#F3F3F3">
              QUIÉNES SOMOS <br />
              <br />
            </Typography>
            <Typography
              variant="paragraphLight"
              color="#F3F3F3"
              sx={{ marginTop: "1rem", fontSize: "20px" }}
            >
              Somos un grupo de amigos del sur que disfrutamos de la naturaleza
              desde nuestra infancia. Caminando distintos senderos y paisajes,
              la montaña nos reunió y unió. Ganamos experiencia, autonomía y nos
              formamos profesionalmente para dar un paso más. Así fue que,
              unidos por nuestra pasión, creamos Kosten.
              <br />
              <br />
            </Typography>
            <Typography
              variant="titleH1"
              color="#F3F3F3"
              sx={{ textAlign: "center", marginTop: "2rem" }}
            >
              QUÉ SIGNIFICA KOSTEN <br />
              <br />
            </Typography>
            <Typography
              variant="paragraphLight"
              color="#F3F3F3"
              sx={{ marginTop: "1rem", fontSize: "20px" }}
            >
              Es una palabra que pueblo Aonikenk utilizaba para llamar al
              &quot;VIENTO&quot;. <br /><br /> Así como el fuerte Zonda caracteriza a Cuyo y
              el Pampero a la zona central de nuestro país. Las montañas
              patagónicas son recorridas por un viento indomable: el Kosten, que
              las abraza y se funde con sus paisajes, esculpiendo sus siluetas.
              <br />
            </Typography>
          </Box>

          <Box
            component="img"
            src={imgquienessomos}
            alt="Imagen Fondo"
            sx={{
              width: { xs: "100%", md: "100%", lg: "100%", xl: "50vw", sm: "100%" },
              objectFit: "cover",
              padding: "0",
              margin: "0",
            }}
          ></Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: "center", backgroundColor: "grey.800", paddingTop: '3rem' }}>
          <Box
            sx={{
              flex: 1,
              paddingTop: "50px",
              paddingBottom: "50px",
              paddingLeft: "5rem",
              paddingRight: "5rem",
              marginLeft: {xl:"350px", lg:"350px", md:"350px", sm:"0px", xs:"0px"},
              marginRight: {xl:"350px", lg:"350px", md:"350px", sm:"0px", xs:"0px"},
              textAlign: "center",
              alignContent: "center",
              gap: "0",
             
              
            }}
          >
            <Typography
              variant="titleH1"
              color="#F3F3F3"
              sx={{ textAlign: "center", marginTop: "2rem" }}
            >
              NUESTRA PROPUESTA <br />
              <br />
            </Typography>
            <Typography
              variant="paragraphLight"
              color="#F3F3F3"
              sx={{ marginTop: "1rem", fontSize: "20px" }}
            >
              Queremos invitarte a recorrer esas montañas tal como lo hace el
              viento y a que, durante el proceso, moldees tu espíritu aventurero
              en los magníficos paisajes y recorridos que nuestra tierra ofrece.
              Te proponemos experiencias donde podrás vivir la naturaleza de
              manera única y enriquecerte por las tradiciones y encanto de los
              pobladores de los lugares que visitaremos. <br /><br />
              También te brindamos la posibilidad de desarrollar mayor autonomía, aprendiendo a moverte
              con confianza en la montaña, sin olvidar el respeto y cuidado por
              nuestra tierra. Buscamos el mínimo impacto ambiental y priorizamos
              la seguridad en cada paso. <br /><br />
              Queremos que vivas momentos
              inolvidables, donde la cercanía y trato directo con nosotros te
              animen a sumarte a las experiencias KOSTEN, donde soplan VIENTOS
              DE AVENTURAS.
              <br />
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: "center", paddingTop: '3rem', paddingBottom: '10rem', marginLeft: '60px', marginRight: '60px' }}>
        <Typography variant="titleH1" color="#F3F3F3" sx={{ textAlign: 'center', marginBottom: '2rem' }}>STAFF</Typography>
        <Grid2 container spacing={2} justifyContent="center" gap="24px">
          {staffMembers.map((member, index) => (
            <Grid2 item="true" xs={12} sm={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  alt={member.alt}
                  height={550}
                  width={400}
                  image={member.image}
                />
                <CardContent align="center" sx={{ backgroundColor: 'grey.50' }}>
                  <Typography variant="titleH2" sx={{ fontWeight: '900' }}>{member.name}</Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
        </Box>
      </Box>
    </>
  );
};

export default About;
