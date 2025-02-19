// src/components/Dashboard/EditUserDialog.jsx
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { NotificationService } from "../../shared/services/notistack.service.jsx";

import axios from "axios";

import { getActiveUsers, updateUserStatus } from "../../api/userApi.js";
import { useCallback, useEffect, useState } from "react";

const EditUserDialog = ({
  open,
  onClose,
  userForm,
  setUserForm,
  fetchUsers,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const API_URL = "https://kosten.up.railway.app";
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmitEdit = async () => {
    if (!validateContact(userForm.contact)) {
      NotificationService.info(
        "El teléfono debe tener entre 8-14 caracteres y '+' al inicio es opcional.",
        5000
      );
      return;
    }
    try {
      await axios.put(`${API_URL}/user/update`, userForm);
      NotificationService.success("Usuario guardado exitosamente", 2000);
      handleSubmitStatusChange();

      fetchUsers();
      onClose();
    } catch (error) {
      console.error("Error editando usuario:", error);
    }
  };

  // Handle local state change for form control
  const handleStatusChange = (newStatus) => {
    const isActive = newStatus === "Activo";
    setUserForm((prev) => ({ ...prev, isActive }));
  };

  // Handle submit action to save changes
  // const handleSubmitStatusChange = async () => {
  //   try {
  //     const payload = {
  //       userId: userForm.id,
  //       isActive: userForm.isActive,
  //     };

  //     await axios.put(`${API_URL}/user/isActive`, payload);
  //     //   await updateUserStatus(payload);

  //     NotificationService.success(
  //       `Estado actualizado: ${userForm.isActive ? "Activo" : "Inactivo"}`,
  //       2000
  //     );
  //   } catch (error) {
  //     console.error("Error updating user status:", error);
  //   }
  // };
  const handleSubmitStatusChange = useCallback(async () => {
    setIsFetching(true);
    try {
      const body = {
        userId: userForm.id,
        isActive: userForm.isActive,
      };
      const response = await updateUserStatus(body); // Axios devuelve 'data' directamente
      console.log("response", response);
      NotificationService.success(
        `Estado actualizado: ${userForm.isActive ? "Activo" : "Inactivo"}`,
        2000
      );
    } catch (error) {
      console.error(error);
      NotificationService.error("Error al actualizar el estado del Usuario");
    } finally {
      setIsFetching(false);
    }
  }, []);

  const handleRoleChange = async (newRole) => {
    try {
      await axios.put(`${API_URL}/user/${userForm.id}/role`, { role: newRole });
      setUserForm((prev) => ({ ...prev, role: newRole }));
      NotificationService.success("Rol: " + newRole, 2000);
    } catch (error) {
      console.error("Error cargando roles:", error);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Validate contact (min 8, max 14 numbers, '+' optional)
  const validateContact = (contact) => /^\+?[1-9]\d{8,14}$/.test(contact);

  // Validate password (min 6, max 12 characters, letters & numbers, at least 1 uppercase)
  const validatePassword = (password) =>
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/.test(
      password
    );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align="center">
        <Typography variant="titleH2">EDITAR USUARIO</Typography>
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

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Estado</InputLabel>
              <Select
                name="isActive"
                value={userForm.isActive ? "Activo" : "Inactivo"}
                onChange={(e) => handleStatusChange(e.target.value)}
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
        <Button
          onClick={onClose}
          color="transparent"
          sx={{ boxShadow: "none" }}
        >
          Cerrar
        </Button>
        <Button
          onClick={handleSubmitEdit}
          color="transparent"
          sx={{ boxShadow: "none" }}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
