import { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { register } from "../../api/authApi.js";
import { NotificationService } from "../../shared/services/notistack.service.jsx";
import imageReg from "../../assets/registro.webp";
import InputNormal from "./InputNormal.jsx";
import InputPassword from "./InputPassword.jsx";
import useAutoLogin from "../../shared/hooks/useAutoLogin.jsx";

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
        1500
      );
      console.log(response);
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
      <Stack direction={{ xs: "column", md: "row" }}>
        <Stack
          sx={{
            objectFit: "cover",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <img src={imageReg} alt="register" width="150%" />
        </Stack>

        <form onSubmit={handleSubmit} style={{ width: "100%", background: "white" }}>
          <Stack sx={{ padding: "20%", gap: "1.25rem", alignItems: "center" }}>
            <Typography variant="titleH2">REGISTRO</Typography>
            <InputNormal
              type="text"
              value={username}
              label="Nombre y apellido"
              fx={setUsername}
            />
            <InputNormal type="number" value={contact} label="Teléfono" fx={setContact} />
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
              {confirmPassword.length > 4
                ? adviceConfirmPassword
                  ? "Las contraseñas coinciden"
                  : "No coinciden"
                : null}
            </Typography>
            {isFetching ? (
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
                REGISTRARME
              </Button>
            )}{" "}
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default Register;
