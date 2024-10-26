import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from '@mui/material';

const EditUserDialog = ({ open, onClose, userForm, handleInputChange, handleSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle sx={{ padding: "10", gap: "1.25rem", alignItems: "center", justifyItems: "center" }}> 
      <Typography variant="titleH2">REGISTRO</Typography>
      </DialogTitle>
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
          label="Número de teléfono"
          name="contact"
          value={userForm.contact}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="541112345678"
        />

        
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="transparent">Cerrar</Button>
        <Button onClick={handleSubmit} color="transparent">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
