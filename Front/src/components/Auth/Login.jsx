import { useState } from "react";
import { Button, Typography, Stack } from "@mui/material";
import { login } from "../../api/authApi.js";
import { NotificationService } from "../../shared/services/notistack.service.jsx";
import { useAuth } from "../../shared/hooks/useAuth.jsx";
import { Link } from "react-router-dom";
import InputNormal from "./InputNormal.jsx";
import InputPassword from "./InputPassword.jsx";
import {getData} from "../../api/userApi.js";
import {useUserData} from "../../shared/hooks/useUserData.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { handleLogin } = useAuth();
  const{ setUserData } = useUserData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: dataAuth } = await login({ email, password });
      NotificationService.success(`Bienvenido nuevamente`, 3000);

      if( dataAuth.isError ) {
        NotificationService.error(dataAuth.message, 3000);
        return
      }

      handleLogin(dataAuth.data);

      const { data: dataUser } = await getData(dataAuth.data.id);

      if( dataAuth.isError ) {
        return
      }

      setUserData(dataUser.data);

    } catch (error) {
      NotificationService.error('Hubo un error en el servidor.', 3000);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: 400,
          padding: "1rem 2rem",
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

        <Typography variant="buttonMini">
          olvidé mi contraseña
        </Typography>
        
        <Button color="greenButton" type="submit" sx={{ width: "50%" }}>
          Login
        </Button>
        <Link to="/register" style={{width:'50%'}}>
        <Button color="transparentButton" disableElevation sx={{width:"100%"}}>
          Registrarse
        </Button>
        </Link>
      </Stack>
    </form>
  );
};

export default Login;
