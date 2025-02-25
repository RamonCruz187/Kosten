import { Box, Button, Tab, Table, TableBody, TableCell, TableRow, Tabs, useTheme } from "@mui/material";
import { useState } from "react";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";

const AdminComments = () => {
  const theme = useTheme();
  const { palette } = theme;

  const [isFetching, setIsFetching] = useState(false);
  const [tabValue, setTabValue] = useState("Todos");

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
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
          value={tabValue}
          onChange={handleChange}
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
          {["Todos", "Nuevos", "Visibles", "Ocultos"].map((tab) => (
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
      </Box>

      <Box elevation={0} sx={{ backgroundColor: "transparent" }}>
          <Table sx={{ borderBottom: "none" }}>
            <TableBody>
              {["Todos", "Activos", "Inactivos", "Staff"]
              // filteredUsers
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow
                    key={user}
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
                      {'user.id'}
                    </TableCell>
                    <TableCell
                      sx={{ border: 0, textAlign: "left", flexBasis: "20%" }}
                      align="left"
                    >
                      {'user.username'}
                    </TableCell>
                    <TableCell
                      sx={{ border: 0, textAlign: "left", flexBasis: "20%" }}
                      align="left"
                    >
                      {'user.email'}
                    </TableCell>
                    <TableCell
                      sx={{ border: 0, textAlign: "left", flexBasis: "10%" }}
                      align="left"
                    >
                      {'user.contact'}
                    </TableCell>
                    <TableCell
                      sx={{ border: 0, textAlign: "left", flexBasis: "5%" }}
                      align="left"
                    >
                      {'user.isActive' ? "Activo" : "Inactivo"}
                    </TableCell>
                    <TableCell
                      sx={{ border: 0, textAlign: "left", flexBasis: "12%" }}
                      align="left"
                    >
                      {'user.role' === "ADMIN" ? "ADMINISTRADOR" : "USUARIO"}
                    </TableCell>
                    <TableCell
                      sx={{ border: 0, textAlign: "left", flexBasis: "20%" }}
                    >
                      <Button
                        onClick={() => console.log("click")}
                        disabled={isFetching}
                        sx={{
                          backgroundColor: "grey.300",
                          mr: 1,
                          "&:hover": { backgroundColor: "grey.400" },
                        }}
                      >
                        <RiEditLine /> EDITAR
                      </Button>
                      <Button
                        onClick={() => console.log('user.id')}
                        disabled={isFetching}
                        sx={{
                          minWidth: "auto",
                          backgroundColor: "red.500",
                          color: "white",
                          "&:hover": { backgroundColor: "red.400" },
                        }}
                      >
                        <RiDeleteBin6Line />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
      </Box>
    </Box>
  )
}

export default AdminComments