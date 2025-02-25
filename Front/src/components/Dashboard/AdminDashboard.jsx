// src/components/Dashboard/AdminDashboard.jsx
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
  useTheme,
} from "@mui/material";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";

import AddUserDialog from "./AddUserDialog.jsx";
import EditUserDialog from "./EditUserDialog.jsx";
import AdminStaff from "./AdminStaff.jsx";
// import EditStaffDialog from "./EditStaffDialog.jsx";
import AddStaffDialog from "./AddStaffDialog.jsx";
import { getAllStaff } from "@/api/staffApi.js";
// import { getAllStaff, getStaffById } from "@/api/staffApi.js";
import { NotificationService } from "@/shared/services/notistack.service.jsx";
import { deleteUserById, getAllUsers, getUserById } from "@/api/userApi.js";
import { WhiteButton } from "@/shared/components/buttons/WhiteButton.jsx";

const AdminDashboard = () => {
  const theme = useTheme();
  const { palette } = theme;

  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({
    id: null,
    username: "",
    email: "",
    contact: "",
    role: "USER",
    password: "",
    confirmPassword: "",
    isActive: "",
  });
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("Todos");
  const [staff, setStaff] = useState([]); // New state for staff data
  const [staffForm, setStaffForm] = useState({
    id: null,
    name: "",
    lastName: "",
    contact: "",
    rol: "STAFF",
  });
  const [openAddStaff, setOpenAddStaff] = useState(false); // New state for AddStaffDialog
  const [isFetching, setIsFetching] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await getAllUsers(); // Axios devuelve 'data' directamente
      setUsers(response.data.data);
      NotificationService.success("Los usuarios fueron cargados con éxito");
    } catch (error) {
      console.error(error);
      NotificationService.error("Error al cargar los usuarios");
    } finally {
      setIsFetching(false);
    }
  }, []);

  const fetchStaff = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await getAllStaff(); // Axios devuelve 'data' directamente
      setStaff(response.data);
      NotificationService.success("El staff fue cargado con éxito");
    } catch (error) {
      console.error(error);
      NotificationService.error("Error al cargar al staff");
    } finally {
      setIsFetching(false);
    }
  }, []);

  const filteredUsers = users.filter((user) => {
    if (filter === "Activos") return user.isActive;
    if (filter === "Inactivos") return !user.isActive;
    return true; // For 'Todos' tab
  });

  const handleOpenAddUser = () => {
    setUserForm({
      id: null,
      username: "",
      email: "",
      contact: "",
      password: "",
      confirmPassword: "",
      role: "USER",
    });
    setOpenAdd(true);
  };

  const handleOpenEditUser = useCallback( async (id) => {
    setIsFetching(true);
    try {
        const response = await getUserById(id); // Axios devuelve 'data' directamente
        setUserForm({ 
          id: id, 
          username: response.data.data.username, 
          email: response.data.data.email, 
          contact: response.data.data.contact, 
          role: response.data.data.role, 
          isActive: response.data.data.isActive, 
        });
        setOpenEdit(true);
        // NotificationService.success('Las salidas fueron cargadas con éxito');
        console.log('El usuario fue cargado con éxito');
    } catch (error) {
        console.error(error);
        NotificationService.error('Error en la carga de usuario');
    } finally {
        setIsFetching(false);
    }
  }, [])

  const handleDelete = useCallback( async (id) => {
    setIsFetching(true);
    try {
        const response = await deleteUserById(id); // Axios devuelve 'data' directamente
        fetchUsers();
        NotificationService.success('El ususario fuer borrado con éxito');
    } catch (error) {
        console.error('Error al eliminar el usuario: ', error);
        NotificationService.error('Error en el borrado de usuario');
    } finally {
        setIsFetching(false);
    }
  }, [])
  

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
    setStaffForm({
      id: null,
      name: "",
      lastName: "",
      contact: "",
      rol: "STAFF",
      photo: null,
    });
    setOpenAddStaff(true);
  };

  useEffect(() => {
    fetchUsers();
    fetchStaff();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "grey.750",
        padding: 4,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Tabs
          value={filter}
          onChange={handleTabChange}
          textColor= {palette.primary.light}
          indicatorColor= {palette.primary.light}
          aria-label="filter tabs"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: palette.primary.light,
            },
            "& .Mui-selected": {
              color: palette.primary.light,
            },
          }}
        >
          {["Todos", "Activos", "Inactivos", "Staff"].map((tab) => (
            <Tab
              key={tab}
              label={tab}
              value={tab}
              sx={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "1.1rem",
                color: palette.tertiary.light,
                textTransform: "none",
              }}
            />
          ))}
        </Tabs>
        <Box display="flex" gap={2}>
          <WhiteButton
            onClick={handleOpenAddStaff}
            text="Nuevo Staff"
            isFetching={isFetching}
            sx={{ borderRadius: "4px" }}
            />
          <WhiteButton
            onClick={handleOpenAddUser}
            text="Nuevo Usuario"
            isFetching={isFetching}
            sx={{ borderRadius: "4px" }}
          />
        </Box>
      </Box>

      <Paper elevation={0} sx={{ backgroundColor: "transparent" }}>
        {filter === "Staff" ? (
          <AdminStaff />
        ) : (
          <Table sx={{ borderBottom: "none" }}>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      backgroundColor: "grey.200",
                      marginBottom: 1,
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 1,
                      boxShadow: 2,
                    }}
                  >
                    <TableCell
                      sx={{ border: 0, textAlign: "left", flexBasis: "3%" }}
                      align="left"
                    >
                      {user.id}
                    </TableCell>
                    <TableCell
                      sx={{ border: 0, textAlign: "left", flexBasis: "20%" }}
                      align="left"
                    >
                      {user.username}
                    </TableCell>
                    <TableCell
                      sx={{ border: 0, textAlign: "left", flexBasis: "20%" }}
                      align="left"
                    >
                      {user.email}
                    </TableCell>
                    <TableCell
                      sx={{ border: 0, textAlign: "left", flexBasis: "10%" }}
                      align="left"
                    >
                      {user.contact}
                    </TableCell>
                    <TableCell
                      sx={{ border: 0, textAlign: "left", flexBasis: "5%" }}
                      align="left"
                    >
                      {user.isActive ? "Activo" : "Inactivo"}
                    </TableCell>
                    <TableCell
                      sx={{ border: 0, textAlign: "left", flexBasis: "12%" }}
                      align="left"
                    >
                      {user.role === "ADMIN" ? "ADMINISTRADOR" : "USUARIO"}
                    </TableCell>
                    <TableCell
                      sx={{ border: 0, textAlign: "left", flexBasis: "20%", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}
                    >
                      <WhiteButton
                        onClick={() => handleDelete(user.id)}
                        isFetching={isFetching}
                        icon={<RiDeleteBin6Line size={20} />}
                      />
                      <WhiteButton
                        onClick={() => handleOpenEditUser(user.id)}
                        isFetching={isFetching}
                        icon={<RiEditLine size={20} />}
                        text="EDITAR"
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}

        {filter !== "Staff" && (
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

      <AddUserDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        fetchUsers={fetchUsers}
      />
      <EditUserDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        userForm={userForm}
        setUserForm={setUserForm}
        fetchUsers={fetchUsers}
      />
      <AddStaffDialog
        open={openAddStaff}
        onClose={() => setOpenAddStaff(false)}
        staffForm={staffForm}
        setStaffForm={setStaffForm}
        fetchStaff={fetchStaff}
      />
    </Box>
  );
};

export default AdminDashboard;