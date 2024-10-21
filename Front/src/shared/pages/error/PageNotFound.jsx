import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {Link} from "react-router-dom";

// ----------------------------------------------------------------------

export default function PageNotFound() {
  return (
      <Container component="main" sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
              404 Página no encontrada ! | Error - Kosten
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
              Lo sentimos, no hemos podido encontrar la página que busca. ¿Quizá ha escrito mal la URL? En
              asegúrese de revisar su ortografía.
          </Typography>

          <Box
              component="img"
              src="/images/illustration-404.svg"
              sx={{
                  width: 320,
                  height: 'auto',
                  my: { xs: 5, sm: 10 },
              }}
          />

          <Link to="/" >
              <Typography
                  variant={'button'}
                  sx={{ textDecoration: 'none' }}
              >
                  Ir al inicio
              </Typography>
          </Link>
      </Container>
  );
}
