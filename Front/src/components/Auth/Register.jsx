// Front/src/components/Auth/.jsx
import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { register } from "../../api/authApi.js";
import { NotificationService } from "../../shared/services/notistack.service.jsx";
import imageReg from "../../assets/registro.webp";
import InputNormal from "./InputNormal.jsx";
import InputPassword from "./InputPassword.jsx";
import useAutoLogin from "../../shared/hooks/useAutoLogin.jsx";
import { ColorButton } from "@/shared/components/buttons/ColorButton.jsx";

const Register = () => {
  const autologin = useAutoLogin();

  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [advicePassword, setAdvicePassword] = useState(false);
  const [adviceConfirmPassword, setAdviceConfirmPassword] = useState(false);

  const [isFetching, setIsFetching] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    return regex.test(password);
  };

  useEffect(() => {
    password.length !== 0 && !validatePassword(password)
      ? setAdvicePassword(true)
      : setAdvicePassword(false);
  }, [password]);

  useEffect(() => {
    confirmPassword.length > 4 && password === confirmPassword
      ? setAdviceConfirmPassword(true)
      : setAdviceConfirmPassword(false);
  }, [confirmPassword, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsFetching(true);
      const response = await register({
        username,
        email,
        password,
        contact,
      });

      NotificationService.success(
        " Usuario registrado exitosamente. Iniciando sesión... ",
      2000);
      response.status == 200 && autologin(email, password);
    } catch (error) {
      setIsFetching(false);
      Object.entries(error.response.data.messages).forEach(([key, value]) => {
        NotificationService.error(value, 4000);
      });
      console.error(error.response.data);
    }
  };

  return (
    <>
      <Stack direction={{ xs: "column-reverse", md: "row" }} >
        <Box sx={{ 
          flex: {xs: "", md: 1},
          width: { xs: "100%", md: "50%" },
          height: { xs: "70dvh", md: "calc(100vh - 64px)" },
        }}>
          <Box sx={{
              width: "100%", 
              height: "100%", 
              backgroundImage: `url(${imageReg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
          }}/>
        </Box>

        <form onSubmit={handleSubmit} 
          style={{ 
            background: "white", 
            flex: 1,
          }}
        >
          <Stack sx={{ gap: "1.25rem", alignItems: "center" }}>
            <Typography variant="titleH2" sx={{ marginTop: {xs: "2rem", md:"4rem" }}}>REGISTRO</Typography>
            <InputNormal
              type="text"
              value={username}
              label="Nombre y apellido"
              fx={setUsername}
            />
            <InputNormal type="number" value={contact} label="Teléfono" fx={setContact} />
            <InputNormal type="email" value={email} label="Email" fx={setEmail} />
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <InputPassword
                label="Contraseña"
                value={password}
                fx={setPassword}
                toggleVar={showPassword}
                fxIcon={handleClickShowPassword}
              />
              {advicePassword && (
                <Typography variant="inputError"
                  sx={{marginLeft: "1rem"}}
                >
                  Debe tener 8 caracteres, sin espacios, uno o más números, minúsculas,
                  mayúsculas, y carácteres especiales (@#$%^&+=)
                </Typography>
              )}
            </Box>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <InputPassword
                label="Confirme contraseña"
                value={confirmPassword}
                fx={setConfirmPassword}
                toggleVar={showPassword}
                fxIcon={handleClickShowPassword}
              />
              {confirmPassword.length > 4
                ? adviceConfirmPassword
                  ?
                  <Typography variant="inputAdvice"
                    sx={{marginLeft: "1rem"}}
                    >
                    Las contraseñas coinciden
                  </Typography>
                  : 
                  <Typography variant="inputError"
                    sx={{marginLeft: "1rem"}}
                  >
                    No coinciden
                  </Typography>
                : null}
            </Box>
            <ColorButton
              type="greenButton"
              onClick={handleSubmit}
              text="REGISTRARME"
              isFetching={isFetching}
              sx={{ width: "200px", marginY: "1rem" }}
            />
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default Register;
