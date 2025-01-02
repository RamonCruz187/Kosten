import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, Grid, Input, Box, IconButton } from '@mui/material';
import { RiEditLine, RiDeleteBin6Line, RiCloseLargeLine, RiImage2Line } from 'react-icons/ri';
import axios from 'axios';
import { NotificationService } from '../../shared/services/notistack.service.jsx';


const EditStaffDialog = ({ open, onClose, staffForm, setStaffForm, fetchStaff }) => {

    const API_URL = 'https://kosten.up.railway.app';
    const [file, setFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStaffForm((prev) => ({ ...prev, [name]: value }));
        setFile()
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const validExtensions = ['image/jpeg', 'image/png', 'image/bmp'];

        if (selectedFile && validExtensions.includes(selectedFile.type)) {
            setFile(selectedFile);
            NotificationService.success('Imagen seleccionada correctamente.', 5000);
        } else {
            NotificationService.info('Seleccione una imagen válida tipo: (.jpg, .bmp, .png).', 5000);
        }
    };

    const handleSubmitEdit = async () => {
        const token = JSON.parse(localStorage.getItem("userAuth"))?.token;
        if (!token) {
            console.error('Token not found or user not authenticated');
            return;
        }
        // if (!staffForm.name || !staffForm.lastName || !staffForm.contact) {
        //     NotificationService.error('Debe llenar todos los campos requeridos.', 5000);
        //     return;
        // }

        const formData = new FormData();
        formData.append('staffData', new Blob([JSON.stringify(staffForm)], { type: 'application/json' }));

        if (file) {
            formData.append('fileImage', file);}
        // } else {
        //     NotificationService.info('Debe seleccionar una imagen .jpg', 5000);
        //     return;
        // }
        console.log(formData);
        try {
            await axios.put(`${API_URL}/staff/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            NotificationService.success('Staff editado correctamente.', 2000);
            fetchStaff();
            onClose();
        } catch (error) {
            console.error('Error editing staff:', error);
            NotificationService.error('Error en la edición de Staff.', 2000);
        }
    };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

    return (
        <Dialog open={open} onClose={onClose}>
            <Box display="flex" justifyContent="flex-end" p={1} >
                <IconButton onClick={onClose}>
                    <RiCloseLargeLine size={24} />
                </IconButton>
            </Box>
            <DialogTitle align="center">
                <Typography variant="titleH1" align="center">EDITAR STAFF</Typography>
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
                            accept=".jpg,.bmp,.png"
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
                                <RiImage2Line size={20} style={{ marginRight: 8 }} /> CAMBIAR FOTO
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='transparent' sx={{ boxShadow: 'none' }}>CERRAR</Button>
                <Button onClick={handleSubmitEdit} variant="contained" color='transparent' sx={{ boxShadow: 'none' }}>GUARDAR</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditStaffDialog;
