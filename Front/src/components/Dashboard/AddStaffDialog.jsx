import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, Grid, Input, Box, IconButton } from '@mui/material';
import { RiEditLine, RiDeleteBin6Line, RiCloseLargeLine, RiImage2Line } from 'react-icons/ri';
import axios from 'axios';
import { NotificationService } from '../../shared/services/notistack.service.jsx';

const AddStaffDialog = ({ open, onClose, fetchStaff }) => {
  const [staffForm, setStaffForm] = useState({
    name: '',
    lastName: '',
    contact: '',
    rol: '',
  });
  const [file, setFile] = useState(null);
  const API_URL = 'https://kosten.up.railway.app'; // Replace with your actual endpoint

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaffForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'image/jpeg') {
      setFile(selectedFile);
    } else {
      NotificationService.info('Por favor seleccione una imagen válida en formato .jpg', 5000);
    }
  };

  const handleSubmitAdd = async () => {
    const token = JSON.parse(localStorage.getItem("userAuth"))?.token;
    if (!token) {
      console.error('Token not found or user not authenticated');
      return;
    }
    if (!staffForm.name || !staffForm.lastName || !staffForm.contact) {
      NotificationService.error('Debe llenar todos los campos requeridos.', 5000);
      return;
    }

    const formData = new FormData();
    formData.append('staffData', new Blob([JSON.stringify(staffForm)], { type: 'application/json' }));

    if (file) {
      formData.append('fileImage', file);
    } else {
      NotificationService.info('Debe seleccionar una imagen .jpg', 5000);
      return;
    }

    try {
      await axios.post(`${API_URL}/staff/new`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      NotificationService.success('Staff agregado exitosamente');
      fetchStaff(); // Optionally refresh staff list after successful update
      onClose();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      NotificationService.error('Error al agregar el staff');
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };


  return (
    <Dialog open={open} onClose={onClose}>
        <Box  display="flex" justifyContent="flex-end" p={1} >   
          <IconButton onClick={onClose}>
            <RiCloseLargeLine size={24} />
          </IconButton>
        </Box>
      <DialogTitle align="center">
        <Typography variant="titleH1" align="center">NUEVO STAFF</Typography>
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Nombre"
          name="name"
          value={staffForm.name}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Apellido"
          name="lastName"
          value={staffForm.lastName}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contacto"
          name="contact"
          value={staffForm.contact}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rol"
          name="rol"
          value={staffForm.rol}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ paddingTop: 1 }}>
        <Grid item xs={12}>
            <Typography variant="body2" align="center">{file ? file.name : 'foto de perfil.png'}</Typography>
          </Grid>
          <Grid item>
            <Input 
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            inputProps={{ accept: '.jpg' }} 
            onChange={handleFileChange} 
            />
            <Box>
              <Button 
                onClick={handleButtonClick} 
                // color="grayButton" 
                variant="contained"
                // sx={{ boxShadow: 'none'}}
                sx={{ backgroundColor: 'black', color: 'white', boxShadow: 'none', '&:hover': { backgroundColor: '#333' } }}
                >
                 <RiImage2Line size={20} style={{ marginRight: 8 }} /> SUBIR FOTO
              </Button>
            </Box>
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='transparent' sx={{ boxShadow: 'none' }}>Cancelar</Button>
        <Button onClick={handleSubmitAdd} variant="contained" color='transparent' sx={{ boxShadow: 'none' }}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStaffDialog;

