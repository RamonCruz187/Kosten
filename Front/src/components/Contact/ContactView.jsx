import { Box } from "@mui/material";
import ContactForm from "./ContactForm";
import ContactLeftside from "./ContactLeftside";


export default function ContactView() {
  const size = { xs: 12, sm: 6 };
  return (
    <Box sx={{ 
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },  
      minHeight: "90vh",
    }}>
      <ContactLeftside size={size} />
      <ContactForm size={size} />
    </Box>
  );
}
