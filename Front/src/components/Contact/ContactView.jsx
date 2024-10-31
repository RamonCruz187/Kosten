import { Grid2 } from "@mui/material";
import ContactForm from "./ContactForm";
import ContactLeftside from "./ContactLeftside";
import NavBar from "../Home/NavBar";
import Footer from "../Home/Footer";

export default function ContactView() {
  const size = { xs: 12, sm: 6 };
  return (<>
  <NavBar />
    <Grid2 container direction="row" sx={{ minHeight: "728px" }}>
      <ContactLeftside size={size} />
      <ContactForm size={size} />
    </Grid2>

    <Footer />
  </>
  );
}
