//*************/ version 5 endpoint users CRUD 2 Modals ****************
import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@mui/material';

import { RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';

import NavBar from '../Home/NavBar.jsx';
import AddUserDialog from './AddUserDialog.jsx';
import EditUserDialog from './EditUserDialog.jsx';


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({ id: null, username: '', email: '', contact: '', role: 'USER', password: '', confirmPassword: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://kostentours-api-10061c08f8f8.herokuapp.com/user/all');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleOpenAddUser = () => {
    setUserForm({ id: null, username: '', email: '', contact: '', password: '', confirmPassword: '', role: 'USER' });
    setIsEditing(false);
    setOpenAdd(true);
  };

  const handleOpenEditUser = (id) => {
    handleEdit(id);
    setOpenEdit(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmitAdd = async () => {
    // Add user logic here
    setOpenAdd(false);
  };

  const handleSubmitEdit = async () => {
    // Edit user logic here
    setOpenEdit(false);
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`https://kostentours-api-10061c08f8f8.herokuapp.com/user/${id}`);
      const { username, email, contact, role } = response.data.data;
      setUserForm({ id, username, email, contact, role });
      setIsEditing(true);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://kostentours-api-10061c08f8f8.herokuapp.com/user/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  return (
    <div>
      <NavBar />
      <h1>Dashboard</h1>
      <div>
      <Button 
      onClick={handleOpenAddUser} 
      style={{ marginBottom: '16px' }}
            color="grayButton"
            type="submit"
            // sx={{ padding: ".75rem 3rem", marginTop: "1rem" }}
      >

        Crear Usuario
      </Button>
      <Button
        color="grayButton">
          Nuevo Staff
      </Button>
      </div>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contacto</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.contact}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenEditUser(user.id)}>
                    <RiEditLine />
                  </Button>
                  <Button onClick={() => handleDelete(user.id)}>
                    <RiDeleteBin6Line />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <AddUserDialog
        open={openAdd}
        onClose={handleCloseAdd}
        userForm={userForm}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmitAdd}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        toggleShowPassword={toggleShowPassword}
        toggleShowConfirmPassword={toggleShowConfirmPassword}
      />

      <EditUserDialog
        open={openEdit}
        onClose={handleCloseEdit}
        userForm={userForm}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmitEdit}
      />
    </div>
  );
};

export default AdminDashboard;



//*************/ version 4 endpoint users CRUD ****************
// import React, { useEffect, useState } from 'react';
// import { TextField, Button, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Paper, TablePagination, Switch, IconButton, InputAdornment } from '@mui/material';
// import { RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';

// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import axios from 'axios';


// import NavBar from "../Home/NavBar.jsx";



// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [userForm, setUserForm] = useState({ id: null, username: '', email: '', contact: '', role: 'USER', password: '', confirmPassword: '' });
//   const [isEditing, setIsEditing] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [selectedRole, setSelectedRole] = useState('');

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('https://kostentours-api-10061c08f8f8.herokuapp.com/user/all');
//       setUsers(response.data.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const handleOpenAddUser = () => {
//     setUserForm({ id: null, username: '', email: '', contact: '', password: '', confirmPassword: '', role: 'USER' });
//     setIsEditing(false);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserForm({ ...userForm, [name]: value });
//   };

// //password
// const toggleShowPassword = () => {
//   setShowPassword(!showPassword);
// };
// const toggleShowConfirmPassword = () => {
//   setShowConfirmPassword(!showConfirmPassword);
// };

//   const handleSubmit = async () => {
//     try {
//       if (isEditing) {
//         // Update existing user
//         await axios.put('https://kostentours-api-10061c08f8f8.herokuapp.com/user/update', {
//           id: userForm.id,
//           username: userForm.username,
//           contact: userForm.contact,
//           email: userForm.email
//         });
//       } else {
//         // Register new user
//         await axios.post('https://kostentours-api-10061c08f8f8.herokuapp.com/auth/register', {
//           username: userForm.username,
//           email: userForm.email,
//           contact: userForm.contact,
//           password: userForm.password
//         });
//       }
//       fetchUsers();
//       handleClose();
//     } catch (error) {
//       console.error('Error submitting user:', error);
//     }
//   };

//   const handleEdit = async (id) => {
//     try {
//       const response = await axios.get(`https://kostentours-api-10061c08f8f8.herokuapp.com/user/${id}`);
//       const { username, email, contact, role } = response.data.data;
//       setUserForm({ id, username, email, contact, role });
//       setIsEditing(true);
//       setOpen(true);
//     } catch (error) {
//       console.error('Error fetching user:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`https://kostentours-api-10061c08f8f8.herokuapp.com/user/${id}`);
//       fetchUsers();
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   const handleRoleChange = async (id) => {
//     const user = users.find((user) => user.id === id);
//     const newRole = user.role === 'USER' ? 'ADMIN' : 'USER';
//     try {
//       await axios.put(`https://kostentours-api-10061c08f8f8.herokuapp.com/user/${id}/role`, { role: newRole });
//       fetchUsers();
//     } catch (error) {
//       console.error('Error changing role:', error);
//     }
//   };

//   // Pagination handlers
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to first page
//   };

//   return (
//     <div>
//       <NavBar />
//       <h1>Dashboard</h1>
//       <Button variant="contained" color="primary" onClick={handleOpenAddUser} style={{ marginBottom: '16px' }}>
//         Crear Usuario
//       </Button>

//       <Paper>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Nombre</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Contacto</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell>Acciones</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.id}</TableCell>
//                 <TableCell>{user.username}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.contact}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleDelete(user.id)} color="default">
//                     <RiDeleteBin6Line />ELIMINAR
//                   </Button>
//                   <Button onClick={() => handleEdit(user.id)} color="default">
//                     <RiEditLine/>EDITAR
//                   </Button>
//                   <Button onClick={() => handleRoleChange(user.id)} color="default">
//                     {user.role === 'USER' ? 'ADMIN' : 'USER'}
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         <TablePagination
//           component="div"
//           count={users.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>

//       {/* Modal for Add/Edit User */}
//       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle>{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Nombre"
//             name="username"
//             value={userForm.username}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             placeholder="Nombres y apellidos"
//           />
//           <TextField
//             label="email"
//             name="email"
//             type="email"
//             value={userForm.email}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             placeholder="ejemplo@mail.com"
//           />
//           <TextField
//             label="Contacto"
//             name="contact"
//             value={userForm.contact}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             placeholder="541112345678"
//           />
//           {!isEditing && (
//             <>
//             <TextField
//               label="Contraseña"
//               name="password"
//               type={showPassword ? 'text' : 'password'}
//               value={userForm.password}
//               onChange={handleInputChange}
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={toggleShowPassword}>
//                       {showPassword ? <Visibility /> : <VisibilityOff />}
//                     </IconButton>
//                   </InputAdornment>
//                 )
//               }}
//               helperText="Debe contener al menos 1 número y tener un mínimo de 6 caracteres."
//             />
//           <TextField
//             label="Confirme contraseña"
//             name="confirmPassword"
//             type={showConfirmPassword ? 'text' : 'password'}
//             value={userForm.confirmPassword}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={toggleShowConfirmPassword}>
//                     {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
//                   </IconButton>
//                 </InputAdornment>
//               )
//             }}
//             helperText={userForm.password === userForm.confirmPassword ? 'Contraseñas coinciden.' : 'Las contraseñas no coinciden.'}
//           />            
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button  onClick={handleSubmit} color="primary">
//             {isEditing ? 'Update User' : 'Add User'}
//           </Button>
//         </DialogActions>
//       </Dialog>
      
//     </div>
//   );
// };

// export default AdminDashboard;

