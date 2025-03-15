/* eslint-disable react/prop-types */
import { Grid2, Stack, Typography, FormHelperText, Box } from "@mui/material";
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
  const [errors, setErrors] = useState({
    username: "",
    contact: "",
    email: "",
    message: "",
  });
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
    // Limpia el error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  
  const validateField = (name, value) => {
    switch (name) {
      case "username":
        return value.trim() ? "" : "El nombre y apellido son obligatorios";
      case "contact":
        return value.trim() ? "" : "El teléfono es obligatorio";
      case "email":
        if (!value.trim()) return "El email es obligatorio";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? "" : "Ingresa un email válido";
      case "message":
        return value.trim() ? "" : "El mensaje es obligatorio";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validar cada campo
    Object.keys(formState).forEach(fieldName => {
      if (fieldName !== "send") {
        const error = validateField(fieldName, formState[fieldName]);
        newErrors[fieldName] = error;
        if (error) isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
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
      setErrors({
        username: "",
        contact: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("error:", error);
      NotificationService.error('Error al enviar el mensaje');
    } finally {
      setIsFetching(false);
    }
  };

  // Función auxiliar para renderizar el mensaje de error
  const renderError = (fieldName) => {
    return errors[fieldName] ? (
      <FormHelperText error sx={{ marginLeft: '14px', marginTop: '4px' }}>
        {errors[fieldName]}
      </FormHelperText>
    ) : null;
  };

  return (
    <Grid2 item size={size} sx={{ height: "100%" }}>
      <form onSubmit={handleSubmit} style={{ width: "100%", height: "100%", background: "white" }}>
        <Stack sx={{ padding: {xs:"2rem", md:"10%"}, gap: "1.25rem", alignItems: "center" }}>
          <Typography variant="titleH1">CONTÁCTANOS</Typography>

          <Box sx={{ marginX: 'auto', width: {xs: "300px", md:"350px", lg: "400px"} }}>
            <InputNormal
              isObject={true}
              inputName="username"
              type="text"
              value={formState.username}
              label="Nombre y apellido"
              fx={(e) => handleChange(e)}
              error={!!errors.username}
            />
            {renderError("username")}
          </Box>
          
          <Box sx={{ marginX: 'auto', width: {xs: "300px", md:"350px", lg: "400px"} }}>
            <InputNormal
              isObject={true}
              inputName="contact"
              type="number"
              value={formState.contact}
              label="Teléfono"
              fx={handleChange}
              error={!!errors.contact}
            />
            {renderError("contact")}
          </Box>
          
          <Box sx={{ marginX: 'auto', width: {xs: "300px", md:"350px", lg: "400px"} }}>
            <InputNormal
              isObject={true}
              inputName="email"
              type="email"
              value={formState.email}
              label="Email"
              fx={handleChange}
              error={!!errors.email}
            />
            {renderError("email")}
          </Box>
          
          <Box sx={{ marginX: 'auto', width: {xs: "300px", md:"350px", lg: "400px"} }}>
            <InputNormal
              isObject={true}
              inputName="message"
              type="textarea"
              value={formState.message}
              label="Mensaje"
              fx={handleChange}
              placeholder="Escribe lo que quieras consultarnos aquí."
              rows={4}
              error={!!errors.message}
            />
            {renderError("message")}
          </Box>
          
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