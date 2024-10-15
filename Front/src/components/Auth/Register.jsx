import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import Box from "@mui/material/Box";
import {register} from "../../api/authApi.js";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('/api/register', { name, email, password });
        const response = register({ name, email, password });
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit">Register</Button>
        </Box>
    </form>
  );
};

export default Register;
