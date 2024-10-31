/* eslint-disable react/prop-types */
import { Button, Grid2, Stack, Typography } from "@mui/material";
import InputNormal from "../Auth/InputNormal";
import { useState } from "react";

export default function ContactForm({ size }) {
  const [formState, setFormState] = useState({
    username: "",
    contact: "",
    email: "",
    message: "",
    send: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendChange = (bool, time) => {
    setTimeout(() => {
      setFormState((prevState) => ({
        ...prevState,
        send: bool,
      }));
    }, time);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      sendChange(true, 0);
      console.log(formState);
      sendChange(false, 3000);
    } catch (error) {
      console.error("error:", error);
      sendChange(false, 0);
    }
  };

  return (
    <Grid2 item size={size} sx={{}}>
      <form onSubmit={handleSubmit} style={{ width: "100%", background: "white" }}>
        <Stack sx={{ padding: "20%", gap: "1.25rem", alignItems: "center" }}>
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
          />
          {formState.send ? (
            <Button
              color="grayButton"
              type="submit"
              sx={{ padding: ".75rem 3rem", marginTop: "1rem" }}
            >
              LOADING...
            </Button>
          ) : (
            <Button
              color="greenButton"
              type="submit"
              sx={{ padding: ".75rem 3rem", marginTop: "1rem" }}
            >
              ENVIAR CONSULTA
            </Button>
          )}
        </Stack>
      </form>
    </Grid2>
  );
}
