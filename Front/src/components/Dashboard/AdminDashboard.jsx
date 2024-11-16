//*************/ version 6 new restructure and tabs CRUD 2 Modals ****************
import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Button, Paper, Table, TableBody, TableCell, TableRow, TablePagination } from '@mui/material';
import { RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';

import NavBar from '../Home/NavBar.jsx';
import AddUserDialog from './AddUserDialog.jsx';
import EditUserDialog from './EditUserDialog.jsx';
import AdminStaff from './AdminStaff.jsx';
import EditStaffDialog from './EditStaffDialog.jsx';
import AddStaffDialog from './AddStaffDialog.jsx';
import {getAllStaff, getStaffById} from "../../api/staffApi.js";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({ id: null, username: '', email: '', contact: '', role: 'USER', password: '', confirmPassword: '', isActive: '' });
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('Todos');
  const [staff, setStaff] = useState([]); // New state for staff data
  const [staffForm, setStaffForm] = useState({ id: null, name: '', lastName: '', contact: '', rol: 'STAFF' });
  const [openAddStaff, setOpenAddStaff] = useState(false); // New state for AddStaffDialog
  const API_URL = 'https://kosten.up.railway.app';
  // const API_URL ='https://kostentours-api-10061c08f8f8.herokuapp.com';


  useEffect(() => {
    fetchUsers();
    fetchStaff(); // Fetch staff data
  }, []);

//`${API_URL_PROD}/staff/${ id }`,

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/all`);
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${API_URL}/staff/all`);
      setStaff(response.data);
    } catch (error) {
      console.error('Error en la carga de staff:', error);
    }
  };

  const filteredUsers = users.filter(user => {
    if (filter === 'Activos') return user.isActive;
    if (filter === 'Inactivos') return !user.isActive;
    return true; // For 'Todos' tab
  });

  const handleOpenAddUser = () => {
    setUserForm({ id: null, username: '', email: '', contact: '', password: '', confirmPassword: '', role: 'USER' });
    setOpenAdd(true);
  };

  const handleOpenEditUser = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/user/${id}`);
      const { username, email, contact, role, isActive } = response.data.data;
      setUserForm({ id, username, email, contact, role, isActive });
      setOpenEdit(true);
      console.log(userForm)
    } catch (error) {
      console.error('Error en la carga de usuario:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/user/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTabChange = (event, newFilter) => {
    setFilter(newFilter);
    setPage(0); // Reset page when switching tabs
  };

// //******** STAFF ****** */
  const handleOpenAddStaff = () => {
    setStaffForm({ id: null, name: '', lastName: '', contact: '', rol: 'STAFF', photo: null });
    setOpenAddStaff(true);
};


  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'grey.750', padding: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Tabs
          value={filter}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="filter tabs"
        >
          {['Todos', 'Activos', 'Inactivos', 'Staff'].map((tab) => (
            <Tab key={tab} label={tab} value={tab} sx={{ color: 'grey.300', textTransform: 'none', fontWeight: 'bold' }} />
          ))}
        </Tabs>
        <Box>
          <Button variant="contained" sx={{ backgroundColor: 'grey.200', color: 'black', mr: 1 }} onClick={handleOpenAddStaff}>Nuevo Staff</Button>
          <Button variant="contained" sx={{ backgroundColor: 'grey.200', color: 'black' }} onClick={handleOpenAddUser}>Nuevo Usuario</Button>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ backgroundColor: 'transparent' }}>

      {filter === 'Staff' ? (
  <AdminStaff />
) : (

        <Table sx={{ borderBottom: 'none' }}>
          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id} sx={{ backgroundColor: 'grey.200', marginBottom: 1, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 1, boxShadow: 2 }}>
                <TableCell sx={{ border: 0, textAlign: 'left', flexBasis: '3%' }} align="left">{user.id}</TableCell>
                <TableCell sx={{ border: 0, textAlign: 'left', flexBasis: '20%' }} align="left">{user.username}</TableCell>
                <TableCell sx={{ border: 0, textAlign: 'left', flexBasis: '20%' }} align="left">{user.email}</TableCell>
                <TableCell sx={{ border: 0, textAlign: 'left', flexBasis: '10%'}} align="left">{user.contact}</TableCell>
                <TableCell sx={{ border: 0, textAlign: 'left', flexBasis: '5%' }} align="left">{user.isActive ? "Activo" : "Inactivo"}</TableCell>
                <TableCell sx={{ border: 0, textAlign: 'left', flexBasis: '12%' }} align="left">{user.role==="ADMIN" ? "ADMINISTRADOR" : "USUARIO"}</TableCell>
                <TableCell sx={{ border: 0, textAlign: 'left', flexBasis: '20%'}}>
                  <Button onClick={() => handleOpenEditUser(user.id)} sx={{ backgroundColor: 'grey.300', mr: 1, '&:hover': { backgroundColor: 'grey.400' } }}><RiEditLine /> EDITAR</Button>
                  <Button onClick={() => handleDelete(user.id)} sx={{ minWidth: 'auto', backgroundColor: 'red.500', color: 'white', '&:hover': { backgroundColor: 'red.400' } }}><RiDeleteBin6Line /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

)}

{filter !== 'Staff' && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      </Paper>

      <AddUserDialog open={openAdd} onClose={() => setOpenAdd(false)} fetchUsers={fetchUsers} />
      <EditUserDialog open={openEdit} onClose={() => setOpenEdit(false)} userForm={userForm} setUserForm={setUserForm} fetchUsers={fetchUsers} />
      <AddStaffDialog open={openAddStaff} onClose={() => setOpenAddStaff(false)} staffForm={staffForm} setStaffForm={setStaffForm} fetchStaff={fetchStaff}/>

    </Box>
  );
};

export default AdminDashboard;

