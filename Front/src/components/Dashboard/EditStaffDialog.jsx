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
      NotificationService.info('Please select a valid image file (.jpg, .bmp, .png).', 5000);
    }
  };

  const handleSubmitEdit = async () => {
    if (!staffForm.name || !staffForm.lastName || !staffForm.contact) {
      NotificationService.error('Please fill out all required fields.', 2000);
      return;
    }

    if (!file) {
      NotificationService.error('Please select an image file.', 2000);
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

      await axios.put('https://kostentours-api-10061c08f8f8.herokuapp.com/staff/update', formData, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyM0BnbWFpbC5jb20iLCJpYXQiOjE3MzAxODYxNjksImV4cCI6MTczMDI3MjU2OX0.WkMpN2gJrokFb3aHDAIZY18Q9JI0dZvWVyYIqkg5HD8`,  // Replace YOUR_TOKEN_HERE with actual token logic
          'Content-Type': 'multipart/form-data',
        },
      });
      NotificationService.success('Staff member updated successfully', 2000);
      fetchStaff();
      onClose();
    } catch (error) {
      console.error('Error editing staff:', error);
      NotificationService.error('Failed to update staff member', 2000);
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
          required
        />
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
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography>Subir Foto:</Typography>
          </Grid>
          <Grid item>
            <Input
              type="file"
              onChange={handleFileChange}
              inputProps={{ accept: '.jpg,.bmp,.png' }}
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="tranparent">
          Cerrar
        </Button>
        <Button onClick={handleSubmitEdit} color="transparent">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStaffDialog;

//***************version 1 ***** */
// // src/components/Dashboard/EditStaffDialog.jsx
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
//   IconButton,
// } from '@mui/material';
// import { NotificationService } from '../../shared/services/notistack.service.jsx';
// import axios from 'axios';

// const EditStaffDialog = ({ open, onClose, staffForm, setStaffForm, fetchStaff }) => {
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
//       NotificationService.info('Please select a valid image file (.jpg, .bmp, .png).', 5000);
//     }
//   };

//   const handleSubmitEdit = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('id', staffForm.id);
//       formData.append('name', staffForm.name);
//       formData.append('lastName', staffForm.lastName);
//       formData.append('rol', 'STAFF');  // Assuming 'STAFF' role is constant for this dialog
//       formData.append('contact', staffForm.contact);
//       if (file) formData.append('photo', file);

//       await axios.put('https://kostentours-api-10061c08f8f8.herokuapp.com/staff/update', formData, {
//         headers: {
//           'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyM0BnbWFpbC5jb20iLCJpYXQiOjE3MzAxODYxNjksImV4cCI6MTczMDI3MjU2OX0.WkMpN2gJrokFb3aHDAIZY18Q9JI0dZvWVyYIqkg5HD8`,  // Replace YOUR_TOKEN_HERE with actual token logic
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       NotificationService.success('Staff member updated successfully', 2000);
//       fetchStaff();
//       onClose();
//     } catch (error) {
//       console.error('Error editing staff:', error);
//       NotificationService.error('Failed to update staff member', 2000);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle align="center">
//         <Typography variant="h6">EDITAR STAFF</Typography>
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
//         />
//         <TextField
//           label="Apellido"
//           name="lastName"
//           value={staffForm.lastName}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
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
//         <Button onClick={onClose} color="secondary">
//           Cerrar
//         </Button>
//         <Button onClick={handleSubmitEdit} color="primary">
//           Guardar
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditStaffDialog;