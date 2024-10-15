import { Button, Stack, Typography } from "@mui/material";

export default function Muestras() {
  return (
    <>
      <Stack spacing={2}
       
      >
        <Button color="yellowButton"> boton primario </Button>
        <Button color="brownButton">
          <Typography variant="brownButtonText"> secondary button text</Typography>
        </Button>
        <Button color="grayButton"> boton terciario </Button>
        <Button>
          <Typography variant="buttonMini"> botton mini</Typography>
        </Button>

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
