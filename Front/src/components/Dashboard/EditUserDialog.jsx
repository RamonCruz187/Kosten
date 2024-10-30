import React from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, InputAdornment, IconButton, Typography, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NotificationService } from "../../shared/services/notistack.service.jsx";

import axios from 'axios';

const EditUserDialog = ({ open, onClose, userForm, setUserForm, fetchUsers }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEdit = async () => {
    // if (!validatePassword(userForm.password)) {
    //   NotificationService.info(
    //     "La contraseña debe tener entre 6-12 caracteres, al menos 1 mayúscula, 1 número y 1 carácter especial.",
    //     5000
    //   );
    //   return;
    // }
    if (!validateContact(userForm.contact)) {
      NotificationService.info(
        "El teléfono debe tener entre 8-14 caracteres y '+' al inicio es opcional.",
        5000
      );
      return;
    }
    try {
      await axios.put('https://kostentours-api-10061c08f8f8.herokuapp.com/user/update', userForm);
      NotificationService.success("Usuario guardado exitosamente", 2000);
      fetchUsers();
      onClose();
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleRoleChange = async (newRole) => {
    try {
      await axios.put(`https://kostentours-api-10061c08f8f8.herokuapp.com/user/${userForm.id}/role`, { role: newRole });
      setUserForm((prev) => ({ ...prev, role: newRole }));
      NotificationService.success("Rol: " + newRole, 2000);
    } catch (error) {
      console.error("Error updating role:", error);
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
      <DialogTitle align='center' ><Typography variant="titleH2" >EDITAR USUARIO</Typography></DialogTitle>
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
                // value={userForm.role ? "USER" : "ADMIN"}
                // onChange={(e) => setUserForm((prev) => ({ ...prev, role: e.target.value === "USER" }))}

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
        <Button onClick={onClose} color='transparent'>Cerrar</Button>
        <Button onClick={handleSubmitEdit} color='transparent'>Guardar</Button>
        
        </DialogActions>

        
    </Dialog>
  );
};

export default EditUserDialog;





//*********************version 1 **************** */
// import React from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from '@mui/material';

// const EditUserDialog = ({ open, onClose, userForm, handleInputChange, handleSubmit }) => {
//   return (
//     <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
//       <DialogTitle sx={{ padding: "10", gap: "1.25rem", alignItems: "center", justifyItems: "center" }}> 
//       <Typography variant="titleH2">REGISTRO</Typography>
//       </DialogTitle>
//       <DialogContent>
//         <TextField
//           label="Nombre"
//           name="username"
//           value={userForm.username}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           placeholder="Nombres y apellidos"
//         />
//         <TextField
//           label="Mail"
//           name="email"
//           type="email"
//           value={userForm.email}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           placeholder="ejemplo@mail.com"
//         />
//         <TextField
//           label="Número de teléfono"
//           name="contact"
//           value={userForm.contact}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           placeholder="541112345678"
//         />

        
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="transparent">Cerrar</Button>
//         <Button onClick={handleSubmit} color="transparent">Guardar</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditUserDialog;
