import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import Box from "@mui/material/Box";
import {login, register} from "../../api/authApi.js";
import {NotificationService} from "../../shared/services/notistack.service.jsx";
import {useAuthLogin} from "../../shared/hooks/useAuthLogin.jsx";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <form onSubmit={handleSubmit} >
      <Box
          sx={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            width: 300,
            padding: 3,
            mt: 2
        }}
      >
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">Login</Button>
      </Box>
    </form>
  );
};

export default Login;
