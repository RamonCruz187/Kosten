import { Stack } from "@mui/material";
import ContactForm from "./ContactForm";
import ContactLeftside from "./ContactLeftside";

export default function ContactView(  ) {
    return (
        <Stack direction='row' sx={{minHeight: '728px'}}>
<ContactLeftside/>
<ContactForm/>

        </Stack>
  )
}

