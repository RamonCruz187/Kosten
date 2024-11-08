import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Grid,
  Input,
} from '@mui/material';
import { NotificationService } from '../../shared/services/notistack.service.jsx';
import axios from 'axios';

const EditStaffDialog = ({ open, onClose, staffForm, setStaffForm, fetchStaff }) => {
  const API_URL = 'https://kosten.up.railway.app';
  const [file, setFile] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaffForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validExtensions = ['image/jpeg', 'image/png', 'image/bmp'];

    if (selectedFile && validExtensions.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      NotificationService.info('Seleccione una imagen valida tipo: (.jpg, .bmp, .png).', 5000);
    }
  };

  const handleSubmitEdit = async () => {
    if (!staffForm.name || !staffForm.lastName || !staffForm.contact) {
      NotificationService.error('Debe llenar todos los campos requeridos.', 2000);
      return;
    }

    if (!file) {
      NotificationService.error('Por favor, seleccione una imagen.', 2000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('id', staffForm.id);
      formData.append('name', staffForm.name);
      formData.append('lastName', staffForm.lastName);
      formData.append('rol', staffForm.rol); // Assuming 'STAFF' role is constant
      formData.append('contact', staffForm.contact);
      formData.append('photo', file);

      await axios.put(`${API_URL}/staff/update`, formData, {
      });
      NotificationService.success('Staff agregado correctamente', 2000);
      fetchStaff();
      onClose();
    } catch (error) {
      console.error('Error editing staff:', error);
      NotificationService.error('Error en la edición de Staff', 2000);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align="center">
        <Typography variant="titleH1" align="center">EDITAR STAFF</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          name="name"
          value={staffForm.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          label="Apellido"
          name="lastName"
          value={staffForm.lastName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          label="Número de contacto"
          name="contact"
          value={staffForm.contact}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"

        />
        <TextField
          label="Rol"
          name="rol"
          value={staffForm.rol}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"

        />
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography>Subir Foto:</Typography>
          </Grid>
          <Grid item>
            <Input
              type="file"
              onChange={handleFileChange}
              inputProps={{ accept: '.jpg,.bmp,.png' }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="tranparent" sx={{ boxShadow: 'none' }}>
          Cerrar
        </Button>
        <Button onClick={handleSubmitEdit} color="transparent" sx={{ boxShadow: 'none' }}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStaffDialog;
