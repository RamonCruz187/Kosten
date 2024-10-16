import { Button, Stack, Typography } from "@mui/material";

export default function Muestras() {
  return (
    <>
      <Stack spacing={2}>
        <Button color="greenButton"> boton primario </Button>
        <Button color="yellowButton"> boton primario </Button>
        <Button color="brownButton">secondary button text</Button>
        <Button color="grayButton"> boton terciario </Button>
        <p>La tipografia de los botonoes normales ya esta predefinida</p>
        <br />
        <Button>
          <Typography variant="buttonMini"> botton mini</Typography>
        </Button>
        <Button>
          <Typography variant="callToAction">call to action (CTA)</Typography>
        </Button>
        <p>
          La tipografia de los botonoes más pequeños y de los CTA requiere del typography
          adicional
        </p>
        <br />
        <Typography variant="titleH1">title h1</Typography>
        <Typography variant="titleH2">title h2</Typography>
        <Typography variant="titleH3">title h3</Typography>

        <Typography variant="subtitleBold">subtitleBold</Typography>
        <Typography variant="subtitle">subtitle</Typography>
        <Typography variant="p">párrafo normal</Typography>

        <Typography variant="paragraphLight">paragraphLight</Typography>
        <Typography variant="paragraphDetails">paragraphDetails</Typography>
        <Typography variant="textBox">textBox</Typography>
      </Stack>
    </>
  );
}
