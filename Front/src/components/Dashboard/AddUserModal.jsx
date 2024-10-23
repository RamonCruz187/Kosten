import React, { useState } from 'react';
import { Modal, TextField, Button, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const AddUserModal = ({ open, handleClose, fetchUsers }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{6,12}$/;
    if (!regex.test(password)) {
      setPasswordError('La contraseña debe contener entre 6-12 caracteres, al menos 1 mayúscula, 1 número y 1 carácter especial (@#$%^&+=).');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post('https://kostentours-api-10061c08f8f8.herokuapp.com/auth/register', {
        username,
        email,
        contact: "5411444444444", // Replace with actual value
        password
      });
      if (response.status === 200) {
        fetchUsers();  // Fetch the updated list of users
        handleClose();
      }
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal-container">
        <h2>Registro</h2>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Mail"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError('');
          }}
          error={!!passwordError}
          helperText={passwordError || 'Debe contener al menos 1 número, 1 mayúscula, y 1 carácter especial (@#$%^&+=).'}
          margin="normal"
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleTogglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <TextField
          label="Confirme contraseña"
          variant="outlined"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setConfirmPasswordError('');
          }}
          error={!!confirmPasswordError}
          helperText={confirmPasswordError || 'Contraseñas coinciden.'}
          margin="normal"
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleTogglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
          REGISTRARME
        </Button>
      </div>
    </Modal>
  );
};

export default AddUserModal;
