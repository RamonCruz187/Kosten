/* eslint-disable react/prop-types */
import { Grid2, Stack, Typography } from "@mui/material";
import InputNormal from "../Auth/InputNormal";
import { useState } from "react";
import { ColorButton } from "@/shared/components/buttons/ColorButton";
import emailjs from '@emailjs/browser';
import { NotificationService } from "@/shared/services/notistack.service";

export default function ContactForm({ size }) {
  const [formState, setFormState] = useState({
    username: "",
    contact: "",
    email: "",
    message: "",
    send: false,
  });
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const validateForm = () => {
    const { username, contact, email, message } = formState;
    if (!username || !contact || !email || !message) {
      NotificationService.error('Por favor, completa todos los campos');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      setIsFetching(true);
      const templateParams = {
        username: formState.username,
        contact: formState.contact,
        email: formState.email,
        message: formState.message,
      };
      await emailjs.send('service_anpv0lt', 'template_wq1040s', templateParams, 'R8YlVEUFVcmwSsU8t');
      NotificationService.success('Mensaje enviado con éxito');
      setFormState({
        username: "",
        contact: "",
        email: "",
        message: "",
        send: false,
      });
    } catch (error) {
      console.error("error:", error);
      NotificationService.error('Error al enviar el mensaje');
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Grid2 item size={size} sx={{}}>
      <form onSubmit={handleSubmit} style={{ width: "100%", height: "100%", background: "white" }}>
        <Stack sx={{ padding: {xs:"2rem", md:"20%"}, gap: "1.25rem", alignItems: "center" }}>
          <Typography variant="titleH1">CONTÁCTANOS</Typography>

          <InputNormal
            isObject={true}
            inputName="username"
            type="text"
            value={formState.username}
            label="Nombre y apellido"
            fx={(e) => handleChange(e)}
          />
          <InputNormal
            isObject={true}
            inputName="contact"
            type="number"
            value={formState.contact}
            label="Teléfono"
            fx={handleChange}
          />
          <InputNormal
            isObject={true}
            inputName="email"
            type="email"
            value={formState.email}
            label="Email"
            fx={handleChange}
          />
          <InputNormal
            isObject={true}
            inputName="message"
            type="textarea"
            value={formState.message}
            label="Mensaje"
            fx={handleChange}
            placeholder="Escribe lo que quieras consultarnos aquí."
            rows={4}
          />
          <ColorButton
            type="greenButton"
            text="ENVIAR CONSULTA"
            fetchingText="ENVIANDO..."
            onClick={handleSubmit}
            isFetching={isFetching}
          />
        </Stack>
      </form>
    </Grid2>
  );
}
