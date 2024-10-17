import { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { register } from "../../api/authApi.js";
import { NotificationService } from "../../shared/services/notistack.service.jsx";
import imageReg from "../../assets/reg_left.jpg";
import InputNormal from "./InputNormal.jsx";
import InputPassword from "./InputPassword.jsx";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [advicePassword, setAdvicePassword] = useState(false);
  const [adviceConfirmPassword, setAdviceConfirmPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validatePassword = (password) => {
    const regex = /^(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  useEffect(() => {
    password.length !== 0 && !validatePassword(password)
      ? setAdvicePassword(true)
      : setAdvicePassword(false);
  }, [password]);

  useEffect(() => {
    confirmPassword.length !== 0 && password === confirmPassword
      ? setAdviceConfirmPassword(true)
      : setAdviceConfirmPassword(false);
  }, [confirmPassword, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ name, username, email, password });
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
    <Stack direction="row" spacing={0} sx={{ background: "", minWidth: "100%" }}>
      <Box sx={{ objectFit: "cover", background: "aqua",  }}>
        <img src={imageReg} alt="register" height={"100%"} />
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "20%",
          }}
        >
          <InputNormal type="text" value={name} label="Name" fx={setName} />
          <InputNormal type="text" value={username} label="Username" fx={setUsername} />
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
              Debe contener al menos 1 número y tener un mínimo de 6 caracteres.
            </Typography>
          )}

          <InputPassword
            label="Confirme contraseña"
            value={confirmPassword}
            fx={setConfirmPassword}
            toggleVar={showPassword}
            fxIcon={handleClickShowPassword}
          />
          {adviceConfirmPassword && (
            <Typography variant="inputAdvice">Las contraseñas coinciden</Typography>
          )}

          <Button type="submit">Register</Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Register;
