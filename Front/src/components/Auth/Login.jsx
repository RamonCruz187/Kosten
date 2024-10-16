import { useState } from "react";
import { TextField, Button, Typography, Stack, InputAdornment, IconButton } from "@mui/material";
import { login } from "../../api/authApi.js";
import { NotificationService } from "../../shared/services/notistack.service.jsx";
import { useAuthLogin } from "../../shared/hooks/useAuthLogin.jsx";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { handleLogin } = useAuthLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      NotificationService.success(`Bienvenido nuevamente`, 3000);
      handleLogin(data.data);
      console.log(data.data);
    } catch (error) {
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
        <TextField
          sx={{ width: "100%" }}
          variant="outlined"
          color="palette.grayButton.main"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          variant="outlined"
          color="palette.grayButton.main"
          sx={{ width: "100%" }}
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Button color="greenButton" type="submit" sx={{ width: "50%" }}>
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default Login;
