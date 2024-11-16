import React, {useCallback,  useEffect, useState } from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableRow, TablePagination } from '@mui/material';
import { RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import EditStaffDialog from './EditStaffDialog.jsx';
import AddStaffDialog from './AddStaffDialog.jsx';
import { NotificationService } from '../../shared/services/notistack.service.jsx';

import { useContext } from "react";
import { GlobalContext } from "../../shared/context/GlobalContext.jsx";
import {getAllStaff, getStaffById} from "../../api/staffApi.js";

const AdminStaff = () => {
  const [staff, setStaff] = useState([]);
  const { userAuth } = useContext(GlobalContext);
  const API_URL = 'https://kosten.up.railway.app';

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [staffForm, setStaffForm] = useState({
    id: '',
    name: '',
    lastName: '',
    contact: '',
    rol: '',
    photo: ''
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${API_URL}/staff/all`);
      setStaff(response.data.data); // Assuming `data` is under `response.data`
    } catch (error) {
      console.error('Error en la carga de staff:', error);
    }
  };

  const handleEditStaff = (staffId) => {
    const token = JSON.parse(localStorage.getItem("userAuth"))?.token;
    if (!token) {
      console.error('Token not found or user not authenticated');
      return;
    }
    const selectedStaff = staff.find((member) => member.id === staffId);
    setStaffForm(selectedStaff);
    console.log(staffForm);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleDeleteStaff = async (id) => {
    const token = JSON.parse(localStorage.getItem("userAuth"))?.token;
    if (!token) {
      console.error('Token not found or user not authenticated');
      return;
    }

    try {
      await axios.delete(`${API_URL}/staff/${id}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }

      );

      fetchStaff(); // Refresh the staff list
      NotificationService.success("Staff eliminado correctamente", 2000);
    } catch (error) {
      NotificationService.error("Error al eliminar Staff", 2000);

    }
  };


  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'grey.750', padding: 4 }}>
      <Paper elevation={0} sx={{ backgroundColor: 'transparent' }}>
        <Table sx={{ borderBottom: 'none' }}>
          <TableBody>
            {staff.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((staffMember) => (
              <TableRow key={staffMember.id} sx={{ backgroundColor: 'grey.200', marginBottom: 1, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 1, boxShadow: 2 }}>
                <TableCell sx={{ border: 0 }}>{staffMember.id}</TableCell>
                <TableCell sx={{ border: 0 }}>{staffMember.name}</TableCell>
                <TableCell sx={{ border: 0 }}>{staffMember.lastName}</TableCell>
                <TableCell sx={{ border: 0 }}>{staffMember.contact}</TableCell>
                <TableCell sx={{ border: 0 }}><img src={staffMember.photo} alt="staff" style={{ width: 50, height: 50, borderRadius: '50%' }} /></TableCell>
                <TableCell sx={{ border: 0 }}>{staffMember.rol}</TableCell>
                <TableCell sx={{ border: 0 }}>
                  <Button onClick={() => handleEditStaff(staffMember.id)} sx={{ backgroundColor: 'grey.300', mr: 1, '&:hover': { backgroundColor: 'grey.400' } }}>
                    <RiEditLine /> EDITAR
                  </Button>
                  <Button onClick={() => handleDeleteStaff(staffMember.id)} sx={{ minWidth: 'auto', backgroundColor: 'red.500', color: 'white', '&:hover': { backgroundColor: 'red.400' } }}>
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
          count={staff.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <EditStaffDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        staffForm={staffForm}
        setStaffForm={setStaffForm}
        fetchStaff={fetchStaff}
      />
    </Box>
  );
};

export default AdminStaff;

