import { Grid2 } from "@mui/material";
import ContactForm from "./ContactForm";
import ContactLeftside from "./ContactLeftside";


export default function ContactView() {
  const size = { xs: 12, sm: 6 };
  return (
    <Grid2 container direction="row" sx={{ minHeight: "728px" }}>
      <ContactLeftside size={size} />
      <ContactForm size={size} />
    </Grid2>
  );
}
