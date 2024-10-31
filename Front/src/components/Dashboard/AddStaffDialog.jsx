import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, Grid, Input } from '@mui/material';
import { NotificationService } from '../../shared/services/notistack.service.jsx';
import axios from 'axios';

const AddStaffDialog = ({ open, onClose, staffForm, setStaffForm, fetchStaff }) => {
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

  const handleSubmitAdd = async () => {
    const formData = new FormData();
    formData.append("name", staffForm.name);
    formData.append("lastName", staffForm.lastName);
    formData.append("contact", staffForm.contact);
    formData.append("rol", staffForm.rol);
    if (staffForm.photo) {
        formData.append("file", staffForm.photo); // Add file to FormData
    }

    try {
        const response = await axios.post(
            "https://kostentours-api-10061c08f8f8.herokuapp.com/staff/new",
            formData,
            {
              headers: {
                'Authorization': `Bearer ${token}`,  // Replace YOUR_TOKEN_HERE with actual token logic
                'Content-Type': 'multipart/form-data',
              },
            }
        );
        console.log(response.data);
    } catch (error) {
        console.error("Error cargando datos de staff:", error);
    }
};

// error with token
  // const handleSubmitAdd = async () => {
  //   if (!staffForm.name || !staffForm.lastName || !staffForm.contact) {
  //     NotificationService.error('Please fill out all required fields.', 2000);
  //     return;
  //   }
  //   if (!file) {
  //     NotificationService.error('Please select an image file.', 2000);
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append('name', staffForm.name);
  //     formData.append('lastName', staffForm.lastName);
  //     formData.append('rol', staffForm.rol);
  //     formData.append('contact', staffForm.contact);
  //     formData.append('photo', file);

  //     await axios.post('https://kostentours-api-10061c08f8f8.herokuapp.com/staff/new', formData, {
  //       headers: {
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyM0BnbWFpbC5jb20iLCJpYXQiOjE3MzAxODYxNjksImV4cCI6MTczMDI3MjU2OX0.WkMpN2gJrokFb3aHDAIZY18Q9JI0dZvWVyYIqkg5HD8`,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     NotificationService.success('Staff member created successfully', 2000);
  //     fetchStaff();
  //     onClose();
  //   } catch (error) {
  //     console.error('Error adding staff:', error);
  //     NotificationService.error('Failed to create staff member', 2000);
  //   }
  // };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align="center">
        <Typography variant="titleH1" align="center">NUEVO STAFF</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField label="Nombre" name="name" value={staffForm.name} onChange={handleInputChange} required fullWidth margin="normal" />
        <TextField label="Apellido" name="lastName" value={staffForm.lastName} onChange={handleInputChange} required fullWidth margin="normal" />
        <TextField label="Contacto" name="contact" value={staffForm.contact} onChange={handleInputChange} required fullWidth margin="normal" />
        <TextField
          label="Rol"
          name="rol"
          value={staffForm.rol}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ paddingTop: 1 }}>
          <Grid item>
            {/* <Input type="file" inputProps={{ accept: '.jpg, .bmp, .png' }} onChange={handleFileChange} /> */}
            <Input
              type="file"
              onChange={(e) => setStaffForm({ ...staffForm, photo: e.target.files[1] })}
              accept=".jpg, .bmp, .png"
            />
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

