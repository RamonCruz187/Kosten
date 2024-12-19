import { useEffect, useState, useContext } from "react";
import { Button, Stack, Typography, Switch, FormControlLabel } from "@mui/material";
import { getUserById, updateUser, updateUserStatus } from "../../api/userApi.js";
import { NotificationService } from "../../shared/services/notistack.service.jsx";
import imageReg from "../../assets/registro.webp";
import InputNormal from "./InputNormal.jsx";
import InputPassword from "./InputPassword.jsx";
import useAutoLogin from "../../shared/hooks/useAutoLogin.jsx";
import { useUserData } from "../../shared/hooks/useUserData.jsx";
import { reducer } from "../../shared/context/GlobalStoreReducer.jsx";
import { GlobalContext } from "../../shared/context/GlobalContext.jsx";


const Perfil = () => {
    const autologin = useAutoLogin();
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));

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



    return (
        <>
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
                        <Typography variant="titleH2">PERFIL</Typography>
                        <InputNormal type="text" value={username} label="Nombre y apellido" fx={setUsername} />
                        <InputNormal type="number" value={contact} label="Teléfono" fx={setContact} />
                        <InputNormal type="email" value={email} label="Email" fx={setEmail} />
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
                        <dev className="flex">
                            <Button
                                color="error"
                                variant="contained"
                                onClick={handleDeactivate}
                                disabled={isFetching || !isActive}
                            >
                                Desactivar
                            </Button>
                            <Button
                                color="greenButton"
                                type="submit"
                                disabled={isFetching}
                                variant="contained"
                            >
                                {isFetching ? "Guardando..." : "Guardar Cambios"}
                            </Button>

                        </dev>


                    </Stack>
                </form>
            </Stack>
        </>
    );
};

export default Perfil;
