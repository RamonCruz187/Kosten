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
  const API_URL = 'https://kosten.up.railway.app/staff/new'; // Replace with your actual endpoint

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
      NotificationService.error('Debe llenar todos los campos requeridos.', 2000);
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
      await axios.post(API_URL, formData, {
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


//****************version 3 sever error 500 */
// import React, { useState } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, Grid, Input } from '@mui/material';
// import axios from 'axios';
// import { NotificationService } from '../../shared/services/notistack.service.jsx';

// const AddStaffDialog = ({ open, onClose }) => {
//   const [staffForm, setStaffForm] = useState({
//     name: '',
//     lastName: '',
//     contact: '',
//     rol: '',
//   });
//   const [file, setFile] = useState(null);
//   const API_URL = 'https://kosten.up.railway.app/staff/new'; // Replace with your actual endpoint


  
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStaffForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.type === 'image/jpeg') {
//       setFile(selectedFile);
//     } else {
//       NotificationService.info('Por favor seleccione una imagen válida en formato .jpg', 5000);
//     }
//   };

//   const handleSubmitAdd = async () => {
//             // Retrieve the JSON string from localStorage and parse it
//             const userAuth = JSON.parse(localStorage.getItem("userAuth"));
//             // Access the token property safely
//             const token = userAuth ? userAuth.token : null;
//             if (token) {
//               console.log('User token:', token);
//             } else {
//               console.error('Token not found or user not authenticated');
//             }

//     const formData = new FormData();
//     formData.append('name', staffForm.name);
//     formData.append('lastName', staffForm.lastName);
//     formData.append('contact', staffForm.contact);
//     formData.append('rol', staffForm.rol);
//     if (file) {
//       formData.append('file', file);
//     } else {
//       NotificationService.info('Debe seleccionar una imagen .jpg', 5000);
//       return;
//     }
//     console.log(staffForm);
//     console.log(file);
//     const payload = {
//       staffData: {
//         name: staffForm.name,
//         lastName: staffForm.lastName,
//         contact: staffForm.contact,
//         rol: staffForm.rol
//       },
//       fileImage: file
//     };
//     try {
//       console.log(payload.staffData);

//       // const response = await axios.post(API_URL, payload, {
//       //   headers: {
//       //     'Content-Type': 'multipart/form-data',
//       //     Authorization: token
//       //     // Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyM0BnbWFpbC5jb20iLCJpYXQiOjE3MzE1MDc3NDIsImV4cCI6MTczMTU5NDE0Mn0.5bqv5iq8jnRRHIbWD6zs4jZXAnmUaY4my9jlENUCxes`, // Replace with your token handling logic
//       //   },
//       // });
//       await axios.post('https://kosten.up.railway.app/staff/new', payload, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`
//         },
//       });
      


//       NotificationService.success('Staff agregado exitosamente');
//       onClose();
//     } catch (error) {
//       console.log(payload);
//       console.error('Error al enviar el formulario:', error);
//       NotificationService.error('Error al agregar el staff');
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle align="center">
//       <Typography variant="titleH1" align="center">NUEVO STAFF</Typography>
//       </DialogTitle>
//       <DialogContent>
//         <TextField
//           label="Nombre"
//           name="name"
//           value={staffForm.name}
//           onChange={handleInputChange}
//           required
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Apellido"
//           name="lastName"
//           value={staffForm.lastName}
//           onChange={handleInputChange}
//           required
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Contacto"
//           name="contact"
//           value={staffForm.contact}
//           onChange={handleInputChange}
//           required
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Rol"
//           name="rol"
//           value={staffForm.rol}
//           onChange={handleInputChange}
//           required
//           fullWidth
//           margin="normal"
//         />
//         <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ paddingTop: 1 }}>
//           <Grid item>
//             <Input type="file" inputProps={{ accept: '.jpg' }} onChange={handleFileChange} />
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary">Cancelar</Button>
//         <Button onClick={handleSubmitAdd} variant="contained" color="primary">Guardar</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddStaffDialog;


//********* version 2 ************************ */
// import React, { useState } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, Grid, Input } from '@mui/material';
// import { NotificationService } from '../../shared/services/notistack.service.jsx';
// import axios from 'axios';

// const AddStaffDialog = ({ open, onClose, staffForm, setStaffForm, fetchStaff }) => {
//   const [file, setFile] = useState(null);
//   const API_URL = 'https://kosten.up.railway.app';
//   // const API_URL ='https://kostentours-api-10061c08f8f8.herokuapp.com';

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStaffForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     const validExtensions = ['image/jpeg', 'image/png', 'image/bmp'];
//     if (selectedFile && validExtensions.includes(selectedFile.type)) {
//       setFile(selectedFile);
//     } else {
//       NotificationService.info('Seleccione una imagen valida tipo: (.jpg, .bmp, .png).', 5000);
//     }
//   };

//   const handleSubmitAdd = async () => {
//     const formData = new FormData();
//     // formData.append('id', staffForm.id);
//     formData.append('file', file); // Attach the image as 'file' to match Postman
//     formData.append('name', staffForm.name);
//     formData.append('lastName', staffForm.lastName);
//     formData.append('contact', staffForm.contact);
//     formData.append('rol', staffForm.rol);
    
//     // if (staffForm.photo) {
//     //     formData.append("file", staffForm.photo); // Add file to FormData
//     // }

//   console.log(staffForm);

//     // try {
//     //     const response = await axios.post(`${API_URL}/staff/new`, formData ,
//     //       {
//     //               headers: {
//     //                 Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyM0BnbWFpbC5jb20iLCJpYXQiOjE3MzEzNzM5OTYsImV4cCI6MTczMTQ2MDM5Nn0.xOYCuN7uZjrNgzKfTs8tgvtTl_5dAvqRUvyVqzP50bQ`,
//     //                 'Content-Type': 'multipart/form-data',
//     //               },
//     //             }

//     //     );
//     //     console.log(response.data);
//     // } catch (error) {
//     //     console.error("Error cargando datos de staff:", error);
//     // }

//     try {
//       const response = await axios.post(`${API_URL}/staff/new`, formData, {
//         headers: {
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyM0BnbWFpbC5jb20iLCJpYXQiOjE3MzEzNzM5OTYsImV4cCI6MTczMTQ2MDM5Nn0.xOYCuN7uZjrNgzKfTs8tgvtTl_5dAvqRUvyVqzP50bQ`, // Replace with actual token logic if needed
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log(response.data);
//       NotificationService.success('Staff actualizado exitosamente');
//       fetchStaff(); // Optionally refresh staff list after successful update
//       onClose();
//     } catch (error) {
//       console.error('Error cargando datos de staff:', error);
//       NotificationService.error('Error al actualizar el staff');
//     }



// };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle align="center">
//         <Typography variant="titleH1" align="center">NUEVO STAFF</Typography>
//       </DialogTitle>
//       <DialogContent>
//         <TextField label="Nombre" name="name" value={staffForm.name} onChange={handleInputChange} required fullWidth margin="normal" />
//         <TextField label="Apellido" name="lastName" value={staffForm.lastName} onChange={handleInputChange} required fullWidth margin="normal" />
//         <TextField label="Contacto" name="contact" value={staffForm.contact} onChange={handleInputChange} required fullWidth margin="normal" />
//         <TextField
//           label="Rol"
//           name="rol"
//           value={staffForm.rol}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           required
//         />
//         <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ paddingTop: 1 }}>
//           <Grid item>
//             <Input type="file" inputProps={{ accept: '.jpg, .bmp, .png' }} onChange={handleFileChange} />
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color='transparent' sx={{ boxShadow: 'none' }}>Cancelar</Button>
//         <Button onClick={handleSubmitAdd} variant="contained" color='transparent' sx={{ boxShadow: 'none' }}>Guardar</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddStaffDialog;

