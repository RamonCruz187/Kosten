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
  Box,
} from '@mui/material';
import { NotificationService } from '../../shared/services/notistack.service.jsx';
import axios from 'axios';

const EditStaffDialog = ({ open, onClose, staffForm, setStaffForm, fetchStaff }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const API_URL = 'https://kosten.up.railway.app';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaffForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validExtensions = ['image/jpeg', 'image/png', 'image/bmp'];

    if (file && validExtensions.includes(file.type)) {
      setSelectedFile(file);
      NotificationService.success('Imagen seleccionada correctamente.', 2000);
    } else {
      NotificationService.info('Seleccione una imagen válida tipo: (.jpg, .bmp, .png).', 5000);
    }
  };

  const handleSubmitEdit = async () => {
    if (!staffForm.name || !staffForm.lastName || !staffForm.contact) {
      NotificationService.error('Debe llenar todos los campos requeridos.', 2000);
      return;
    }

    if (!selectedFile) {
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
      formData.append('photo', selectedFile);

      const userAuth = JSON.parse(localStorage.getItem('userAuth'));
      const token = userAuth?.token;

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
      <DialogTitle align="center">
        <Typography variant="h6">EDITAR STAFF</Typography>
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
          label="Número de teléfono"
          name="contact"
          value={staffForm.contact}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <Grid container spacing={2} alignItems="center" marginTop={2}>
          <Grid item xs={12}>
            <Typography variant="body2">{selectedFile ? selectedFile.name : 'foto de perfil.png'}</Typography>
          </Grid>
          <Grid item>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              accept=".jpg,.bmp,.png"
              onChange={handleFileChange}
            />
            <Box>
              <Button onClick={handleButtonClick} color="secondary" variant="contained">
                CAMBIAR FOTO
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cerrar
        </Button>
        <Button onClick={handleSubmitEdit} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStaffDialog;


//******************** version 4 *****************/
// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Button,
//   Typography,
//   Grid,
//   Input,
// } from '@mui/material';
// import { NotificationService } from '../../shared/services/notistack.service.jsx';
// import axios from 'axios';




// const EditStaffDialog = ({ open, onClose, staffForm, setStaffForm, fetchStaff }) => {
//   const API_URL = 'https://kosten.up.railway.app';
//   // const token = userAuth ? userAuth.token : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyM0BnbWFpbC5jb20iLCJpYXQiOjE3MzEzMzU5OTMsImV4cCI6MTczMTQyMjM5M30.Fua5yEELbLe8bHuLv3jKKGUejU6906c8Bhbu3Hq4GjU';


  
//   const [file, setFile] = useState(null);
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

//   const handleSubmitEdit = async () => {
//     if (!staffForm.name || !staffForm.lastName || !staffForm.contact) {
//       NotificationService.error('Debe llenar todos los campos requeridos.', 2000);
//       return;
//     }

//     if (!file) {
//       NotificationService.error('Por favor, seleccione una imagen.', 2000);
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('id', staffForm.id);
//       formData.append('name', staffForm.name);
//       formData.append('lastName', staffForm.lastName);
//       formData.append('rol', staffForm.rol); // Assuming 'STAFF' role is constant
//       formData.append('contact', staffForm.contact);
//       formData.append('photo', file);

//       await axios.put(`${API_URL}/staff/update`, formData, 
//         {
//           // headers: {
//           //   'Authorization': `Bearer ${token}`,  // Replace YOUR_TOKEN_HERE with actual token logic
//           //   'Content-Type': 'multipart/form-data',
//           // },
//           headers: {
//             'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyM0BnbWFpbC5jb20iLCJpYXQiOjE3MzEzMzU5OTMsImV4cCI6MTczMTQyMjM5M30.Fua5yEELbLe8bHuLv3jKKGUejU6906c8Bhbu3Hq4GjU`,  // Replace YOUR_TOKEN_HERE with actual token logic
//             'Content-Type': 'multipart/form-data',
//           },

        

//       });
//       NotificationService.success('Staff agregado correctamente', 2000);
//       fetchStaff();
//       onClose();
//     } catch (error) {
//       console.error('Error editing staff:', error);
//       NotificationService.error('Error en la edición de Staff', 2000);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle align="center">
//         <Typography variant="titleH1" align="center">EDITAR STAFF</Typography>
//       </DialogTitle>
//       <DialogContent>
//         <TextField
//           label="Nombre"
//           name="name"
//           value={staffForm.name}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           required
//         />
//         <TextField
//           label="Apellido"
//           name="lastName"
//           value={staffForm.lastName}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           required
//         />
//         <TextField
//           label="Número de contacto"
//           name="contact"
//           value={staffForm.contact}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"

//         />
//         <TextField
//           label="Rol"
//           name="rol"
//           value={staffForm.rol}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"

//         />
//         <Grid container spacing={2} alignItems="center">
//           <Grid item>
//             <Typography>Subir Foto:</Typography>
//           </Grid>
//           <Grid item>
//             <Input
//               type="file"
//               onChange={handleFileChange}
//               inputProps={{ accept: '.jpg,.bmp,.png' }}
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="tranparent" sx={{ boxShadow: 'none' }}>
//           Cerrar
//         </Button>
//         <Button onClick={handleSubmitEdit} color="transparent" sx={{ boxShadow: 'none' }}>
//           Guardar
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditStaffDialog;



//*********************** version github NC s18 *********/
// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Button,
//   Typography,
//   Grid,
//   Input,
//   Box,
// } from '@mui/material';
// import { NotificationService } from '../../shared/services/notistack.service.jsx';
// import axios from 'axios';

// const EditStaffDialog = ({ open, onClose, staffForm, setStaffForm, fetchStaff }) => {
//   // const [file, setFile] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const API_URL = 'https://kosten.up.railway.app';

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStaffForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     // const selectedFile = e.target.files[0];
//     const file = event.target.files[0];
//     const validExtensions = ['image/jpeg', 'image/png', 'image/bmp'];

//     // if (selectedFile && validExtensions.includes(selectedFile.type)) {
//     //   setFile(selectedFile);
//     if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp')) {
//       setSelectedFile(file);  
//       handleFileUpload(file); 
//     } else {
//       NotificationService.info('Seleccione una imagen valida tipo: (.jpg, .bmp, .png).', 5000);
//     }
//   };

//   const handleSubmitEdit = async () => {
//             // Retrieve the JSON string from localStorage and parse it
//             const userAuth = JSON.parse(localStorage.getItem("userAuth"));
//             // Access the token property safely
//             const token = userAuth ? userAuth.token : null;
//             if (token) {
//               console.log('User token:', token);
//             } else {
//               console.error('Token not found or user not authenticated');
//             }


//     if (!staffForm.name || !staffForm.lastName || !staffForm.contact) {
//       NotificationService.error('Debe llenar todos los campos requeridos.', 2000);
//       return;
//     }

//     if (!file) {
//       NotificationService.error('Por favor, seleccione una imagen.', 2000);
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('id', staffForm.id);
//       formData.append('name', staffForm.name);
//       formData.append('lastName', staffForm.lastName);
//       formData.append('rol', staffForm.rol); // Assuming 'STAFF' role is constant
//       formData.append('contact', staffForm.contact);
//       formData.append('photo', file);

//       await axios.put(`${API_URL}/staff/update`, formData, 
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`
//           }
//       });
//       NotificationService.success('Staff agregado correctamente', 2000);
//       fetchStaff();
//       onClose();
//     } catch (error) {
//       console.error('Error editing staff:', error);
//       NotificationService.error('Error en la edición de Staff', 2000);
//     }
//   };

// //********* */

// const handleButtonClick = () => {
//   document.getElementById('fileInput').click();
// };
// const handleFileUpload = (file) => {
//   // Implement your file upload logic here, e.g., using Axios or Fetch API to send the file to the server
//   console.log('Uploading file:', file);
// };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle align="center">
//         <Typography variant="titleH1" align="center">EDITAR STAFF</Typography>
//       </DialogTitle>
//       <DialogContent>
//         <TextField
//           label="Nombre"
//           name="name"
//           value={staffForm.name}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           required
//         />
//         <TextField
//           label="Apellido"
//           name="lastName"
//           value={staffForm.lastName}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           required
//         />
//         <TextField
//           label="Número de contacto"
//           name="contact"
//           value={staffForm.contact}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"

//         />
//         <TextField
//           label="Rol"
//           name="rol"
//           value={staffForm.rol}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"

//         />
//         <Grid container spacing={2} alignItems="center">
//           <Grid item>
//             <Typography>Subir Foto:</Typography>
//           </Grid>
//           <Grid item>
//             <Input
//             id="fileInput"
//             style={{ display: 'none' }}
//               type="file"
//               onChange={handleFileChange}
//               inputProps={{ accept: '.jpg,.bmp,.png' }}
//             /><Box>
//               <Button onClick={handleButtonClick} color="secondary" sx={{ boxShadow: 'none' }}>
//                 CAMBIAR FOTO
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="tranparent" sx={{ boxShadow: 'none' }}>
//           Cerrar
//         </Button>
//         <Button onClick={handleSubmitEdit} color="transparent" sx={{ boxShadow: 'none' }}>
//           Guardar
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditStaffDialog;