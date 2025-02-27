import { useState } from "react";
import { Typography, Stack } from "@mui/material";
import { login } from "@api/authApi.js";
import { NotificationService } from "@shared/services/notistack.service.jsx";
import { useAuth } from "@shared/hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import InputNormal from "./InputNormal.jsx";
import InputPassword from "./InputPassword.jsx";
import {getUserById} from "@api/userApi.js";
import {useUserData} from "@shared/hooks/useUserData.jsx";
import { ColorButton } from "@shared/components/buttons/ColorButton.jsx";
import { OnlyTextButton } from "@shared/components/buttons/OnlyTextButton.jsx";

const Login = ({handleClose=() => {}, isModal=false}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleGoToRegister = () => {
    handleClose();
    navigate("/register");
  };
  const { handleLogin } = useAuth();
  const{ setUserData } = useUserData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      setIsFetching(true);

      const { data: dataAuth } = await login({ email, password });
      handleLogin(dataAuth.data);

      const { data: dataUser } = await getUserById(dataAuth.data.id);
      setUserData(dataUser.data);

      NotificationService.success(`Bienvenido nuevamente`, 3000);

    } catch (error) {
      NotificationService.error('Error al intentar iniciar sesión.', 3000);
      console.error(error);
    } finally {
        setIsFetching(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: !isModal ? "100%" : {xs: "100%", sm: 400},
          minHeight: !isModal ?  "55dvh" : "auto" ,
          padding: !isModal ? "1rem 35dvw": "1rem 2rem",
          background: "white",
        }}
      >
        <Typography variant="titleH2">LOGIN</Typography>

        <InputNormal value={email} label="Email" type='email' fx={setEmail} />
        <InputPassword
          label="Contraseña"
          value={password}
          fx={setPassword}
          toggleVar={showPassword}
          fxIcon={handleClickShowPassword} 
        />

        <OnlyTextButton
          text="OLVIDÉ MI CONTRASEÑA" 
          isFetching={isFetching} 
          sx={{
            width:'50%',
            "& p" : {fontSize: "0.80rem", padding: 0, marginBottom: "2rem"}, 
          }}
          onClick={() => console.log("abrir modal recuperar contraseña")}
        />
        <ColorButton
          text="Login" 
          fetchingText="Cargando..."
          type="greenButton" 
          isFetching={isFetching}
          onClick={handleSubmit}
          sx={{ width: "50%" }}
        />

        <OnlyTextButton
          text="Registrarme" 
          isFetching={isFetching} 
          sx={{width:'50%'}}
          onClick={handleGoToRegister}
        />

      </Stack>
    </form>
  );
};

export default Login;
