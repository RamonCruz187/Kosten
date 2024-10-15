import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Box from "@mui/material/Box";
import {register} from "../../api/authApi.js";
import {NotificationService} from "../../shared/services/notistack.service.jsx";

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await register({ name, username, email, password });
        NotificationService.success(" Usuario registrado exitosamente. Inicie sesión. ", 2000);
      console.log(response);
    } catch ( error ) {
        Object.entries(error.response.data.messages).forEach(([key, value]) => {
            NotificationService.error(value, 4000);
        });
      console.error(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          <TextField type="text" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField type="text" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit">Register</Button>
        </Box>
    </form>
  );
};

export default Register;
