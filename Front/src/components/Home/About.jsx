import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import imgpaisaje from "../../assets/quienes-somos-paisaje.webp";
import imgquienessomos from "../../assets/quienes-somos.webp";
import staffalejandro from "../../assets/staff-alejandro.jpg";
import staffpablo from "../../assets/staff-pablo.jpg";
import staffmariano from "../../assets/staf-mariano.jpg";

const staffMembers = [
  {
    name: "Pablo Haedo",
    image: staffpablo,
    alt: "Pablo Haedo",
  },
  {
    name: "Mariano Vaucheret",
    image: staffmariano,
    alt: "Mariano Vaucheret",
  },
  {
    name: "Alejandro Tomassino",
    image: staffalejandro,
    alt: "Alejandro Tomassino",
  },
];

const About = () => {
  const theme = useTheme();
  const { palette } = theme;

  return (
    <>
      {/* contenedor de las 2 columnas */}
      <Box
        sx={{
          background: palette.tertiary[900],
          padding: "0",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        }}
      >
        {/* imagen paisaje */}
        <Box
          alt="Imagen Fondo"
          sx={{
            backgroundImage: `url(${imgpaisaje})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: {xs: "25vh", sm: "40vh"},
          }}
        />

        <Box
          sx={{
            flex: 1,
            minWidth: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            gap: { xs: "1rem", md: "2rem" },
            padding: { xs: "2rem", sm: "2rem 5rem", md: "0 6rem 0 4rem" },
          }}
        >
          <Typography
            variant="titleH1"
            color="#F3F3F3"
            sx={{ textAlign: "center" }}
          >
            QUÉ SIGNIFICA KOSTEN
          </Typography>
          <Typography
            variant="paragraphLight"
            sx={{ textAlign: "center", fontSize: { xs: "14px", md: "16px" } }}
          >
            Es una palabra que pueblo Aonikenk utilizaba para llamar al "VIENTO".
          </Typography>
          <Typography
            variant="paragraphLight"
            sx={{ textAlign: "center", fontSize: { xs: "14px", md: "16px" } }}
          >
            Así como el fuerte Zonda caracteriza a Cuyo y el Pampero a
            la zona central de nuestro país. Las montañas patagónicas son
            recorridas por un viento indomable: el Kosten, que las abraza y se
            funde con sus paisajes, esculpiendo sus siluetas.
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            minWidth: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            gap: { xs: "1rem", md: "2rem" },
            padding: { xs: "2rem", sm: "2rem 5rem", md: "0 4rem 0 6rem" },
          }}
        >
          <Typography
            variant="titleH1"
            color={palette.text.light}
            sx={{ textAlign: "center" }}
          >
            QUIÉNES SOMOS
          </Typography>
          <Typography
            variant="paragraphLight"
            sx={{ textAlign: "center", fontSize: { xs: "14px", md: "16px" } }}
          >
            Somos un grupo de amigos del sur que disfrutamos de la naturaleza
            desde nuestra infancia. Caminando distintos senderos y paisajes, la
            montaña nos reunió y unió. Ganamos experiencia, autonomía y nos
            formamos profesionalmente para dar un paso más.
          </Typography>
          <Typography
            variant="paragraphLight"
            sx={{ textAlign: "center", fontSize: { xs: "14px", md: "16px" } }}
          >
            Así fue que, unidos por nuestra pasión, creamos Kosten.
          </Typography>
        </Box>

        <Box
          alt="Imagen Fondo"
          sx={{
            minHeight: {xs: "25vh", sm: "40vh"},
            backgroundImage: `url(${imgquienessomos})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            flex: 1,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            paddingTop: "50px",
            paddingBottom: "50px",
            width: { xs: "100%", md: "60%" },
            paddingX: { xs: "2rem", sm: "5rem", md: "unset" },
            marginX: "auto",
          }}
        >
          <Typography
            variant="titleH1"
            color="#F3F3F3"
            sx={{ textAlign: "center", marginTop: "2rem" }}
          >
            NUESTRA PROPUESTA
          </Typography>
          <Typography
            variant="paragraphLight"
            sx={{ textAlign: "center", marginTop: "1rem", fontSize: "14px" }}
          >
            Queremos invitarte a recorrer esas montañas tal como lo hace el
            viento y a que, durante el proceso, moldees tu espíritu aventurero
            en los magníficos paisajes y recorridos que nuestra tierra ofrece.
            Te proponemos experiencias donde podrás vivir la naturaleza de
            manera única y enriquecerte por las tradiciones y encanto de los
            pobladores de los lugares que visitaremos.
          </Typography>
          <Typography
            variant="paragraphLight"
            sx={{ textAlign: "center", marginTop: "1rem", fontSize: "14px" }}
          >
            También te brindamos la posibilidad de desarrollar mayor autonomía,
            aprendiendo a moverte con confianza en la montaña, sin olvidar el
            respeto y cuidado por nuestra tierra. Buscamos el mínimo impacto
            ambiental y priorizamos la seguridad en cada paso.
          </Typography>
          <Typography
            variant="paragraphLight"
            sx={{ textAlign: "center", marginTop: "1rem", fontSize: "14px" }}
          >
            Queremos que vivas momentos inolvidables, donde la cercanía y trato
            directo con nosotros te animen a sumarte a las experiencias KOSTEN,
            donde soplan VIENTOS DE AVENTURAS.
          </Typography>
          <Divider
            color={palette.tertiary[400]}
            sx={{ marginTop: "3rem"}} 
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            paddingTop: "3rem",
            paddingBottom: "10rem",
            marginLeft: "60px",
            marginRight: "60px",
          }}
        >
          <Typography
            variant="titleH1"
            color="#F3F3F3"
            sx={{ textAlign: "center", marginBottom: "2rem" }}
          >
            STAFF
          </Typography>
          <Box 
            sx={{
              display: "grid",
              gridTemplateColumns: {xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr"},
              margin: "0 auto",
              gap: "2rem",
            }}
          >
            {staffMembers.map((member, index) => (
              <Card key={index}>
                <CardMedia
                  component="img"
                  alt={member.alt}
                  height={400}
                  width={300}
                  image={member.image}
                />
                <CardContent
                  align="center"
                  sx={{ backgroundColor: "grey.50" }}
                >
                  <Typography variant="titleH2" sx={{ fontWeight: "900" }}>
                    {member.name}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default About;
