//*************/ version 4 endpoint users CRUD ****************
import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Paper, TablePagination, Switch, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';


import NavBar from "../Home/NavBar.jsx";



const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({ id: null, username: '', email: '', contact: '', role: 'USER', password: '', confirmPassword: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRole, setSelectedRole] = useState('');

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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

//password
const toggleShowPassword = () => {
  setShowPassword(!showPassword);
};
const toggleShowConfirmPassword = () => {
  setShowConfirmPassword(!showConfirmPassword);
};

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        // Update existing user
        await axios.put('https://kostentours-api-10061c08f8f8.herokuapp.com/user/update', {
          id: userForm.id,
          username: userForm.username,
          contact: userForm.contact,
          email: userForm.email
        });
      } else {
        // Register new user
        await axios.post('https://kostentours-api-10061c08f8f8.herokuapp.com/auth/register', {
          username: userForm.username,
          email: userForm.email,
          contact: userForm.contact,
          password: userForm.password
        });
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error('Error submitting user:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`https://kostentours-api-10061c08f8f8.herokuapp.com/user/${id}`);
      const { username, email, contact, role } = response.data.data;
      setUserForm({ id, username, email, contact, role });
      setIsEditing(true);
      setOpen(true);
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

  const handleRoleChange = async (id) => {
    const user = users.find((user) => user.id === id);
    const newRole = user.role === 'USER' ? 'ADMIN' : 'USER';
    try {
      await axios.put(`https://kostentours-api-10061c08f8f8.herokuapp.com/user/${id}/role`, { role: newRole });
      fetchUsers();
    } catch (error) {
      console.error('Error changing role:', error);
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
      <h1>Dashboard</h1>
      <Button variant="contained" color="primary" onClick={handleOpenAddUser} style={{ marginBottom: '16px' }}>
        Crear Usuario
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
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
                  <Button onClick={() => handleEdit(user.id)} color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(user.id)} color="secondary">
                    Delete
                  </Button>
                  <Button onClick={() => handleRoleChange(user.id)} color="default">
                    {user.role === 'USER' ? 'ADMIN' : 'USER'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal for Add/Edit User */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
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
            label="email"
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
            label="Contacto"
            name="contact"
            value={userForm.contact}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="541112345678"
          />
          {!isEditing && (
            <>
            <TextField
              // label="Password"
              // name="password"
              // type="password"
              // value={userForm.password}
              // onChange={handleInputChange}
              // fullWidth
              // margin="normal"
              label="Contraseña"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={userForm.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              helperText="Debe contener al menos 1 número y tener un mínimo de 6 caracteres."
            />
          <TextField
            label="Confirme contraseña"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={userForm.confirmPassword}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowConfirmPassword}>
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            helperText={userForm.password === userForm.confirmPassword ? 'Contraseñas coinciden.' : 'Las contraseñas no coinciden.'}
          />            
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button  onClick={handleSubmit} color="primary">
            {isEditing ? 'Update User' : 'Add User'}
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
};

export default AdminDashboard;



//*************/ version 3 endpoint ****************
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Typography, Button } from '@mui/material';

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [totalUsers, setTotalUsers] = useState(0);

//   // Fetch users data from the API
//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('https://kostentours-api-10061c08f8f8.herokuapp.com/user/all');
//       if (response.data.isError === false) {
//         setUsers(response.data.data); // Store user data
//         setTotalUsers(response.data.data.length); // Store total user count for pagination
//       } else {
//         console.error('Error fetching users:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   // Pagination handler
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to the first page
//   };

//   useEffect(() => {
//     fetchUsers(); // Fetch users on component mount
//   }, []);

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Admin Dashboard
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Username</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Contact</TableCell>
//               <TableCell>Role</TableCell>
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
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {/* Pagination */}
//         <TablePagination
//           component="div"
//           count={totalUsers}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </TableContainer>
//     </div>
//   );
// };

// export default AdminDashboard;




//*************/ version 2 mock ok ****************
// import React, { useEffect, useState } from 'react';
// import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Switch, Table, TableBody, TableCell, TableHead, TableRow, Paper, TablePagination, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// import axios from 'axios';
// import NavBar from "../Home/NavBar.jsx";

// const users0 = [
//   // Mock users data
//      {
//        "id": 1,
//        "name": "Alice Smith",
//        "email": "alicesmith@example.com",
//        "password": "AlicePass1",
//        "role": "USER",
//        "state": true
//      },
//      {
//        "id": 2,
//        "name": "Bob Johnson",
//        "email": "bobjohnson@example.com",
//        "password": "BobPass2",
//        "role": "USER",
//        "state": false
//      },
//      {
//        "id": 3,
//        "name": "Carol White",
//        "email": "carolwhite@example.com",
//        "password": "CarolPass3",
//        "role": "ADMIN",
//        "state": true
//      },
//      {
//        "id": 4,
//        "name": "David Brown",
//        "email": "davidbrown@example.com",
//        "password": "DavidPass4",
//        "role": "USER",
//        "state": true
//      },
//      {
//        "id": 5,
//        "name": "Emma Taylor",
//        "email": "emmataylor@example.com",
//        "password": "EmmaPass5",
//        "role": "USER",
//        "state": false
//      },
//      {
//        "id": 6,
//        "name": "Frank Harris",
//        "email": "frankharris@example.com",
//        "password": "FrankPass6",
//        "role": "ADMIN",
//        "state": true
//      },
//      {
//        "id": 7,
//        "name": "Grace Lewis",
//        "email": "gracelewis@example.com",
//        "password": "GracePass7",
//        "role": "USER",
//        "state": true
//      },
//      {
//        "id": 8,
//        "name": "Henry Walker",
//        "email": "henrywalker@example.com",
//        "password": "HenryPass8",
//        "role": "USER",
//        "state": false
//      },
//      {
//        "id": 9,
//        "name": "Ivy Hall",
//        "email": "ivyhall@example.com",
//        "password": "IvyPass9",
//        "role": "ADMIN",
//        "state": true
//      },
//      {
//        "id": 10,
//        "name": "Jack King",
//        "email": "jackking@example.com",
//        "password": "JackPass10",
//        "role": "USER",
//        "state": true
//      },
//      {
//       "id": 11,
//       "name": "Alice Smith",
//       "email": "alicesmith@example.com",
//       "password": "AlicePass1",
//       "role": "USER",
//       "state": true
//     },
//     {
//       "id": 12,
//       "name": "Bob Johnson",
//       "email": "bobjohnson@example.com",
//       "password": "BobPass2",
//       "role": "USER",
//       "state": false
//     },
//     {
//       "id": 13,
//       "name": "Carol White",
//       "email": "carolwhite@example.com",
//       "password": "CarolPass3",
//       "role": "ADMIN",
//       "state": true
//     },
//     {
//     "id": 14,
//     "name": "Carol White",
//     "email": "carolwhite@example.com",
//     "password": "CarolPass3",
//     "role": "ADMIN",
//     "state": true
//     }
//   //...other users
// ];

// const AdminDashboard = () => {
//   //  const [users, setUsers] = useState([]); // endpoint data
//   const [users, setUsers] = useState(users0); // Mock data
//   const [userForm, setUserForm] = useState({
//     id: null,
//     name: '',
//     email: '',
//     password: '',
//     role: 'USER',
//     state: true
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   // Pagination state
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [totalUsers, setTotalUsers] = useState(users.length);

//   // Modal (Dialog) state
//   const [open, setOpen] = useState(false);

//   // Open modal for adding a new user
//   const handleOpenAddUser = () => {
//     setUserForm({ id: null, name: '', email: '', password: '', role: 'USER', state: true });
//     setIsEditing(false);
//     setOpen(true);
//   };

//   // Open modal for editing an existing user
//   const handleOpenEditUser = (user) => {
//     setUserForm(user);
//     setIsEditing(true);
//     setOpen(true);
//   };

//   // Close modal

//   const handleClose = () => {
//     setOpen(false);
//   };

//   // Fetch users based on pagination
//   // const fetchUsers = async () => {
//   //   try {
//   //     const response = await axios.get(`/api/users?page=${page}&size=${rowsPerPage}`);
//   //     setUsers(response.data.users); // Assuming the API returns a "users" array
//   //     setTotalUsers(response.data.totalCount); // Assuming the API returns a "totalCount"
//   //   } catch (error) {
//   //     console.error('Error fetching users:', error);
//   //   }
//   // };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserForm({ ...userForm, [name]: value });
//   };

//   const handleStateChange = (e) => {
//     setUserForm({ ...userForm, state: e.target.checked });
//   };

//   // Validate password (min 6, max 12 characters, letters & numbers, at least 1 uppercase)
//   const validatePassword = (password) => {
//     const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
//     return regex.test(password);
//   };

//   // Create or Update user
//   const handleSubmit = async () => {
//     if (!validatePassword(userForm.password)) {
//       alert('Password must be 6-12 characters long, include at least one uppercase letter and one number.');
//       return;
//     }

//     try {
//       if (isEditing) {
//         // Update existing user
//         await axios.put(`/api/users/${userForm.id}`, userForm);
//       } else {
//         // Create new user
//         await axios.post('/api/users', userForm);
//       }
//       setUserForm({ id: null, name: '', email: '', password: '', role: 'USER', state: true });
//       setIsEditing(false);
//       fetchUsers();
//     } catch (error) {
//       console.error('Error saving user:', error);
//     }

//     handleClose(); // Close modal after submission
//   };

//   // Edit user
//   const handleEdit = (user) => {
//     handleOpenEditUser(user);
//   };

//   // Delete user
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/users/${id}`);
//       fetchUsers();
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   // Pagination handlers
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 5));
//     setPage(0); // Reset to the first page whenever rows per page is changed
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>Manage your application here.</p>

//       {/* Add User Button */}
//       <Button variant="contained" color="primary" onClick={handleOpenAddUser} style={{ marginBottom: '16px' }}>
//         Add User
//       </Button>

//       {/* Table to display users */}
//       <Paper>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Id</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell>State</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.id}</TableCell>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell>{user.state ? 'Active' : 'Inactive'}</TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleOpenEditUser(user)} color="primary">
//                     Edit
//                   </Button>
//                   <Button onClick={() => handleDelete(user.id)} color="secondary">
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {/* Pagination controls */}
//         <TablePagination
//           component="div"
//           count={totalUsers}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>

//       {/* Modal for Create/Update User */}
//       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Name"
//             name="name"
//             value={userForm.name}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Email"
//             name="email"
//             type="email"
//             value={userForm.email}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Password"
//             name="password"
//             type="password"
//             value={userForm.password}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//           />
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Role</InputLabel>
//             <Select
//               name="role"
//               value={userForm.role}
//               onChange={handleInputChange}
//             >
//               <MenuItem value="ADMIN">Admin</MenuItem>
//               <MenuItem value="USER">User</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl margin="normal">
//             <InputLabel>State</InputLabel>
//             <Switch
//               checked={userForm.state}
//               onChange={handleStateChange}
//               name="state"
//               color="primary"
//             />
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} color="primary">
//             {isEditing ? 'Update User' : 'Add User'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminDashboard;