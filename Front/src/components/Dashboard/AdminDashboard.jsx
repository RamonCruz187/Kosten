import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Switch, Table, TableBody, TableCell, TableHead, TableRow, Paper, TablePagination, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import NavBar from "../Home/NavBar.jsx";

const users0 = [
  // Mock users data
     {
       "id": 1,
       "name": "Alice Smith",
       "email": "alicesmith@example.com",
       "password": "AlicePass1",
       "role": "USER",
       "state": true
     },
     {
       "id": 2,
       "name": "Bob Johnson",
       "email": "bobjohnson@example.com",
       "password": "BobPass2",
       "role": "USER",
       "state": false
     },
     {
       "id": 3,
       "name": "Carol White",
       "email": "carolwhite@example.com",
       "password": "CarolPass3",
       "role": "ADMIN",
       "state": true
     },
     {
       "id": 4,
       "name": "David Brown",
       "email": "davidbrown@example.com",
       "password": "DavidPass4",
       "role": "USER",
       "state": true
     },
     {
       "id": 5,
       "name": "Emma Taylor",
       "email": "emmataylor@example.com",
       "password": "EmmaPass5",
       "role": "USER",
       "state": false
     },
     {
       "id": 6,
       "name": "Frank Harris",
       "email": "frankharris@example.com",
       "password": "FrankPass6",
       "role": "ADMIN",
       "state": true
     },
     {
       "id": 7,
       "name": "Grace Lewis",
       "email": "gracelewis@example.com",
       "password": "GracePass7",
       "role": "USER",
       "state": true
     },
     {
       "id": 8,
       "name": "Henry Walker",
       "email": "henrywalker@example.com",
       "password": "HenryPass8",
       "role": "USER",
       "state": false
     },
     {
       "id": 9,
       "name": "Ivy Hall",
       "email": "ivyhall@example.com",
       "password": "IvyPass9",
       "role": "ADMIN",
       "state": true
     },
     {
       "id": 10,
       "name": "Jack King",
       "email": "jackking@example.com",
       "password": "JackPass10",
       "role": "USER",
       "state": true
     },
     {
      "id": 11,
      "name": "Alice Smith",
      "email": "alicesmith@example.com",
      "password": "AlicePass1",
      "role": "USER",
      "state": true
    },
    {
      "id": 12,
      "name": "Bob Johnson",
      "email": "bobjohnson@example.com",
      "password": "BobPass2",
      "role": "USER",
      "state": false
    },
    {
      "id": 13,
      "name": "Carol White",
      "email": "carolwhite@example.com",
      "password": "CarolPass3",
      "role": "ADMIN",
      "state": true
    },
    {
    "id": 14,
    "name": "Carol White",
    "email": "carolwhite@example.com",
    "password": "CarolPass3",
    "role": "ADMIN",
    "state": true
    }
  //...other users
];

const AdminDashboard = () => {
  //  const [users, setUsers] = useState([]); // endpoint data
  const [users, setUsers] = useState(users0); // Mock data
  const [userForm, setUserForm] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    role: 'USER',
    state: true
  });
  const [isEditing, setIsEditing] = useState(false);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(users.length);

  // Modal (Dialog) state
  const [open, setOpen] = useState(false);

  // Open modal for adding a new user
  const handleOpenAddUser = () => {
    setUserForm({ id: null, name: '', email: '', password: '', role: 'USER', state: true });
    setIsEditing(false);
    setOpen(true);
  };

  // Open modal for editing an existing user
  const handleOpenEditUser = (user) => {
    setUserForm(user);
    setIsEditing(true);
    setOpen(true);
  };

  // Close modal

  const handleClose = () => {
    setOpen(false);
  };

  // Fetch users based on pagination
  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get(`/api/users?page=${page}&size=${rowsPerPage}`);
  //     setUsers(response.data.users); // Assuming the API returns a "users" array
  //     setTotalUsers(response.data.totalCount); // Assuming the API returns a "totalCount"
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleStateChange = (e) => {
    setUserForm({ ...userForm, state: e.target.checked });
  };

  // Validate password (min 6, max 12 characters, letters & numbers, at least 1 uppercase)
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
    return regex.test(password);
  };

  // Create or Update user
  const handleSubmit = async () => {
    if (!validatePassword(userForm.password)) {
      alert('Password must be 6-12 characters long, include at least one uppercase letter and one number.');
      return;
    }

    try {
      if (isEditing) {
        // Update existing user
        await axios.put(`/api/users/${userForm.id}`, userForm);
      } else {
        // Create new user
        await axios.post('/api/users', userForm);
      }
      setUserForm({ id: null, name: '', email: '', password: '', role: 'USER', state: true });
      setIsEditing(false);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }

    handleClose(); // Close modal after submission
  };

  // Edit user
  const handleEdit = (user) => {
    handleOpenEditUser(user);
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
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
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0); // Reset to the first page whenever rows per page is changed
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Manage your application here.</p>

      {/* Add User Button */}
      <Button variant="contained" color="primary" onClick={handleOpenAddUser} style={{ marginBottom: '16px' }}>
        Add User
      </Button>

      {/* Table to display users */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.state ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenEditUser(user)} color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(user.id)} color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination controls */}
        <TablePagination
          component="div"
          count={totalUsers}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal for Create/Update User */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={userForm.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={userForm.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={userForm.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={userForm.role}
              onChange={handleInputChange}
            >
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="USER">User</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="normal">
            <InputLabel>State</InputLabel>
            <Switch
              checked={userForm.state}
              onChange={handleStateChange}
              name="state"
              color="primary"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isEditing ? 'Update User' : 'Add User'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;


//*************/ version 2 ****************
//src/components/Dashboard/AdminDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Switch, Table, TableBody, TableCell, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
// import axios from 'axios';


//    const users0 = [
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
//    ]


// const AdminDashboard = () => {
   
// //   const [users, setUsers] = useState([]);  //use when endpoint is available.
//   const [users, setUsers] = useState(users0);  //users0 mockup
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

//   //Fetch users based on pagination
//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(`/api/users?page=${page}&size=${rowsPerPage}`);
//       setUsers(response.data.users); // Assuming the API returns a "users" array
//       setTotalUsers(response.data.totalCount); // Assuming the API returns a "totalCount"
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   useEffect(() => {
//     // fetchUsers();
//     users0;

//   }, [page, rowsPerPage]); // Refetch users when page or rowsPerPage changes

  
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
//   };

//   // Edit user
//   const handleEdit = (user) => {
//     setUserForm(user);
//     setIsEditing(true);
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

//     // Pagination handlers
//     const handleChangePage = (event, newPage) => {
//       setPage(newPage);
//     };
  
//     const handleChangeRowsPerPage = (event) => {
//       setRowsPerPage(parseInt(event.target.value, 5));
//       setPage(0); // Reset to the first page whenever rows per page is changed
//     };


//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>Manage your application here.</p>

//        {/* Form to create or update user */}
//        <Paper style={{ padding: '16px', marginBottom: '16px' }}>
//          <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
//          <form>
//            <TextField
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
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             style={{ marginTop: '16px' }}
//           >
//             {isEditing ? 'Update User' : 'Add User'}
//           </Button>
//         </form>
//       </Paper>

//              {/* Table to display users */}
//        <Paper>
//          <Table>
//            <TableHead>
//              <TableRow>
//                <TableCell>Id</TableCell>
//                <TableCell>Name</TableCell>
//                <TableCell>Email</TableCell>
//                <TableCell>Role</TableCell>
//                <TableCell>State</TableCell>
//                <TableCell>Actions</TableCell>
//              </TableRow>
//            </TableHead>
//            <TableBody>
//              {users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.id}</TableCell>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell>{user.state ? 'Active' : 'Inactive'}</TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleEdit(user)} color="primary">
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


//     </div>
//   );
// };

// export default AdminDashboard;



