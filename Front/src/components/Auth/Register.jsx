import { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { register } from "../../api/authApi.js";
import { NotificationService } from "../../shared/services/notistack.service.jsx";
import imageReg from "../../assets/reg_left.jpg";
import InputNormal from "./InputNormal.jsx";
import InputPassword from "./InputPassword.jsx";

const Register = () => {
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [advicePassword, setAdvicePassword] = useState(false);
  const [adviceConfirmPassword, setAdviceConfirmPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validatePassword = (password) => {
    const regex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    return regex.test(password);
  };

  useEffect(() => {
    password.length !== 0 && !validatePassword(password)
      ? setAdvicePassword(true)
      : setAdvicePassword(false);
  }, [password]);

  useEffect(() => {
    confirmPassword.length >= 5 && password === confirmPassword
      ? setAdviceConfirmPassword(true)
      : setAdviceConfirmPassword(false);
  }, [confirmPassword, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const response = await register({
        username,
        email,
        password,
        contact,
      });

      NotificationService.success(
        " Usuario registrado exitosamente. Inicie sesión. ",
        2000
      );
      console.log(response);
    } catch (error) {
      Object.entries(error.response.data.messages).forEach(([key, value]) => {
        NotificationService.error(value, 4000);
      });
      console.error(error.response.data);
    }
  };

  return (
    <Stack direction="row">
      <Box sx={{ objectFit: "cover", width: "100%" }}>
        <img src={imageReg} alt="register" width="100%" />
      </Box>

      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Stack sx={{ padding: "20%", gap: "1.25rem", alignItems: "center" }}>
          <Typography variant="titleH2">REGISTRO</Typography>

          <InputNormal
            type="text"
            value={username}
            label="Nombre y apellido"
            fx={setUsername}
          />
          <InputNormal
            type="text"
            value={contact}
            label="Teléfono"
            fx={setContact}
          />
          <InputNormal type="email" value={email} label="Email" fx={setEmail} />
          <InputPassword
            label="Contraseña"
            value={password}
            fx={setPassword}
            toggleVar={showPassword}
            fxIcon={handleClickShowPassword}
          />
          {advicePassword && (
            <Typography variant="inputAdvice">
              Debe tener 8 caracteres, sin espacios, uno o más números, minúsculas,
              mayúsculas, y carácteres especiales (@#$%^&+=)
            </Typography>
          )}
          <InputPassword
            label="Confirme contraseña"
            value={confirmPassword}
            fx={setConfirmPassword}
            toggleVar={showPassword}
            fxIcon={handleClickShowPassword}
          />

          <Typography variant="inputAdvice">
            {adviceConfirmPassword ? "Las contraseñas coinciden" : "No coinciden"}
          </Typography>

          <Button
            color="greenButton"
            type="submit"
            sx={{ padding: ".75rem 3rem", marginTop: "1rem" }}
          >
            REGISTRARME
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Register;
