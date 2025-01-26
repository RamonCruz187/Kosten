import { useEffect, useState, useContext } from "react";
import { Button, Stack, Typography, Switch, FormControlLabel, Box, Modal, Fade, Backdrop } from "@mui/material";
import { getUserById, updateUser, updateUserStatus } from "../../api/userApi.js";
import { NotificationService } from "../../shared/services/notistack.service.jsx";
import imageReg from "../../assets/registro.webp";
import InputNormal from "./InputNormal.jsx";
import InputPassword from "./InputPassword.jsx";
import useAutoLogin from "../../shared/hooks/useAutoLogin.jsx";
import { useUserData } from "../../shared/hooks/useUserData.jsx";
import { reducer } from "../../shared/context/GlobalStoreReducer.jsx";
import { GlobalContext } from "../../shared/context/GlobalContext.jsx";
import { RiEditLine, RiDeleteBin6Line, RiCloseLargeLine, RiImage2Line, RiArrowLeftSLine } from 'react-icons/ri';

const Perfil = () => {
    const autologin = useAutoLogin();
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));

    const [currentView, setCurrentView] = useState("main"); // "main" or "password"
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [advicePassword, setAdvicePassword] = useState(false);
    const [adviceConfirmPassword, setAdviceConfirmPassword] = useState(false);

    const [isFetching, setIsFetching] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    // Set userId when component mounts
    useEffect(() => {
        if (userAuth && userAuth.id) {
            setUserId(userAuth.id);
            console.log("setuserId:", userAuth.id);
            const fetchUserData = async () => {
                try {
                    const response = await getUserById(userId);
                    const { username, email, contact, role, isActive } = response.data.data;
                    // console.log("response: ", response);
                    // setId(userId);
                    setUsername(username);
                    setEmail(email);
                    setContact(contact);
                    setIsActive(isActive);
                } catch (error) {
                    console.error('Error en la carga de usuario:', error);
                }
            };
            fetchUserData();
        }
    }, [userAuth]);


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
        return regex.test(password);
    };

    useEffect(() => {
        password.length !== 0 && !validatePassword(password)
            ? setAdvicePassword(true)
            : setAdvicePassword(false);
    }, [password]);

    useEffect(() => {
        confirmPassword.length > 4 && password === confirmPassword
            ? setAdviceConfirmPassword(true)
            : setAdviceConfirmPassword(false);
    }, [confirmPassword, password]);

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            setIsFetching(true);
            const userData = { id: userId, username, email, contact, isActive };
            if (password) userData.password = password; // Include password only if updated

            const response = await updateUser(userData);

            NotificationService.success("Datos del usuario actualizados correctamente.", 1500);
            console.log(response);
            response.status == 200 && autologin(email, password);
            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
            Object.entries(error.response.data.messages).forEach(([key, value]) => {
                NotificationService.error(value, 3000);
            });
            console.error(error.response.data);
        }
    };

    const handleDeactivate = async () => {
        try {
            setIsFetching(true);
            const requestBody = { userId: userId, isActive: false };
            console.log(requestBody);
            const response = await updateUserStatus(requestBody);

            if (response.status === 200) {
                setIsActive(false);
                NotificationService.success("El usuario ha sico desactivado.", 3000);
            }

        } catch (error) {
            setIsFetching(false);
            NotificationService.error("Error al desactiver el usuario.", 3000);
            console.error(error.response?.data || error.message);
        }
    }

    //desactivar para admins.
    // const updateUserStatus = (name, value) => {
    //     setUserForm((prev) => ({
    //         ...prev,
    //         [name]: value === "Activo",
    //     }));
    //     NotificationService.success(`Estado: ${value}`, 2000);
    //     console.log(userForm);
    // };

    const handleDeleteAccount = () => {
        console.log("Account deleted.");
        setIsModalOpen(false);
      };



    return (
        <>
      {currentView === "main" && (


            <Stack direction={{ xs: "column", md: "row" }}>
                <Stack
                    sx={{
                        objectFit: "cover",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <img src={imageReg} alt="register" width="150%" />
                </Stack>

                <form onSubmit={handleSubmitEdit} style={{ width: "100%", background: "white" }}>
                    <Stack sx={{ padding: "20%", gap: "1.25rem", alignItems: "center" }}>
                        <Typography variant="titleH2">ADMINISTRAR CUENTA</Typography>
                        <InputNormal type="text" value={username} label="Nombre" fx={setUsername} />
                        <InputNormal type="email" value={email} label="Mail" fx={setEmail} />
                        <InputNormal type="number" value={contact} label="Número de teléfono" fx={setContact} />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Activo"
                        />
                        <InputPassword label="Contraseña" value={"******"} />

                        <Box>
                            <Typography variant="titleH2">MODIFICAR CONTRASEÑA</Typography>
                            <InputPassword label="Contraseña Actual" value={"******"} />
                            <InputPassword
                                label="Nueva Contraseña"
                                value={password}
                                fx={setPassword}
                                toggleVar={showPassword}
                                fxIcon={handleClickShowPassword}
                            />
                            {advicePassword && (
                                <Typography variant="inputAdvice">
                                    Debe tener 8 caracteres, sin espacios, uno o más números, minúsculas,
                                    mayúsculas, y carácteres especiales (@#$%^&+=)
                                </Typography>
                            )}
                            <InputPassword
                                label="Confirme contraseña"
                                value={confirmPassword}
                                fx={setConfirmPassword}
                                toggleVar={showPassword}
                                fxIcon={handleClickShowPassword}
                            />
                            <Typography variant="inputAdvice">
                                {confirmPassword.length > 4
                                    ? adviceConfirmPassword
                                        ? "Las contraseñas coinciden"
                                        : "No coinciden"
                                    : null}
                            </Typography>
                            <Button
                                color="greenButton"
                                type="submit"
                                disabled={isFetching}
                                variant="contained"
                            >
                                {isFetching ? "Guardando..." : "Guardar Cambios"}
                            </Button>
                        </Box>

                        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'end' }}>
                            <Button
                                type="button"
                                sx={{ backgroundColor: "#9E9E9E" }}
                                // color="gray"
                                variant="contained"
                                // onClick={handleDeactivate}
                                onClick={() => setCurrentView("password")}
                                disabled={isFetching || !isActive}

                            >
                                MODIFICAR CONTRASEÑA
                            </Button>
                            <Button
                                color="greenButton"
                                type="submit"
                                disabled={isFetching}
                                variant="contained"
                            >
                                {isFetching ? "Guardando..." : "Guardar Cambios"}
                            </Button>
                        </Box>
                        <Box >
                            <Button
                                color='transparent'
                                sx={{ boxShadow: 'none' }}
                                variant="contained"
                                // onClick={handleDeactivate}
                                onClick={() => setIsModalOpen(true)}
                                disabled={isFetching || !isActive}
                            >
                                ELIMINAR CUENTA
                            </Button>

                        </Box>


                    </Stack>
                </form>
            </Stack>


        )}

            {currentView === "password" && (
        <Box sx={{ padding: "20%", background: "white", height: "100vh" }}>
          <Button
            startIcon={<RiArrowLeftSLine size={24} />}
            onClick={() => setCurrentView("main")}
            sx={{ marginBottom: 3 }}
          >
            Volver
          </Button>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            MODIFICAR CONTRASEÑA
          </Typography>
          <InputPassword label="Contraseña actual" value={"******"} />
          <InputPassword label="Nueva contraseña" />
          <InputPassword label="Confirme nueva contraseña" />
          <Button
            variant="contained"
            sx={{ marginTop: 3, backgroundColor: "#4CAF50" }}
          >
            GUARDAR CAMBIOS
          </Button>
        </Box>
      )}

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              ELIMINAR CUENTA
            </Typography>
            <Typography sx={{ marginBottom: 3 }}>
              ¿Está seguro que desea eliminar la cuenta? Una vez eliminada no podrá
              recuperarla y deberá volver a registrarse.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                onClick={() => setIsModalOpen(false)}
              >
                CANCELAR
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#F44336" }}
                onClick={handleDeleteAccount}
              >
                ELIMINAR
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>




        </>
    );
};

export default Perfil;
