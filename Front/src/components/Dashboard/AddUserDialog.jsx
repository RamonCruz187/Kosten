//*******************  version 2 *************** */
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, InputAdornment, IconButton, Typography, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NotificationService } from "../../shared/services/notistack.service.jsx";
import axios from 'axios';

const AddUserDialog = ({ open, onClose, fetchUsers }) => {
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
    isActive: true,
    role: 'USER'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const API_URL = 'https://kosten.up.railway.app';
  // const API_URL ='https://kostentours-api-10061c08f8f8.herokuapp.com';


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAdd = async () => {
    if (!validatePassword(userForm.password)) {
      NotificationService.info(
        "La contraseña debe tener entre 6-12 caracteres, al menos 1 mayúscula, 1 número y 1 carácter especial.",
        5000
      );
      return;
    }
    if (!validateContact(userForm.contact)) {
      NotificationService.info(
        "El teléfono debe tener entre 8-14 caracteres y '+' al inicio es opcional.",
        5000
      );
      return;
    }
    try {
        const payload = {
          username: userForm.username,
          email: userForm.email,
          contact: userForm.contact,
          password: userForm.password
        };
        console.log(payload);
      await axios.post(`${API_URL}/auth/register`, payload);
      NotificationService.success("Usuario registrado exitosamente", 2000);
      fetchUsers();
      onClose();
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };


  const handleRoleChange = async (newRole) => {
    try {
      await axios.put(`${API_URL}/user/${userForm.id}/role`, { role: newRole });

      setUserForm((prev) => ({ ...prev, role: newRole }));
      NotificationService.success("Rol: " + newRole, 2000);
    } catch (error) {
      console.error("Error al editar role:", error);
    }
  };


  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Validate contact (min 8, max 14 numbers, '+' optional)
  const validateContact = (contact) => /^\+?[1-9]\d{8,14}$/.test(contact);

  // Validate password (min 6, max 12 characters, letters & numbers, at least 1 uppercase)
  const validatePassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/.test(password);

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle align='center'><Typography variant="titleH2" align="center">NUEVO USUARIO</Typography></DialogTitle>
      <DialogContent>

        <TextField
          label="Nombre"
          name="username"
          value={userForm.username}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="Nombres y apellidos"
        />
        <TextField
          label="Mail"
          name="email"
          type="email"
          value={userForm.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="ejemplo@mail.com"
        />
        <TextField
          label="Número de Teléfono"
          name="contact"
          value={userForm.contact}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="541112345678"
        />
        <TextField
          label="Contraseña"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={userForm.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          helperText="Debe contener al menos 1 número y tener un mínimo de 6 caracteres."
        />
        <TextField
          label="Confirme contraseña"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={userForm.confirmPassword}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowConfirmPassword}>
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          helperText={userForm.password === userForm.confirmPassword ? 'Contraseñas coinciden.' : 'Las contraseñas no coinciden.'}
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Estado</InputLabel>
              <Select
                name="isActive"
                value={userForm.isActive ? "Activo" : "Inactivo"}
                onChange={(e) => setUserForm((prev) => ({ ...prev, isActive: e.target.value === "Activo" }))}
                label="Estado"
              >
                <MenuItem value="Activo">Activo</MenuItem>
                <MenuItem value="Inactivo">Inactivo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Rol</InputLabel>
              <Select
                name="role"
                value={userForm.role}
                onChange={(e) => handleRoleChange(e.target.value)}
                label="Rol"
              >
                <MenuItem value="USER">Usuario</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='transparent' sx={{ boxShadow: 'none' }}>Cerrar</Button>
        <Button onClick={handleSubmitAdd} color='transparent' sx={{ boxShadow: 'none' }}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;

