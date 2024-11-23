import { login } from "../../api/authApi.js";
import { NotificationService } from "../services/notistack.service.jsx";
import { useAuth } from "./useAuth.jsx";
import { getUserById } from "../../api/userApi.js";
import { useUserData } from "./useUserData.jsx";
export default function useAutoLogin() {
  const { handleLogin } = useAuth();
  const { setUserData } = useUserData();

  const autologin = async (email, password) => {
    try {
      const { data: dataAuth } = await login({ email, password });
      const { data: dataUser } = await getUserById(dataAuth.data.id);

      setUserData(dataUser.data);
      handleLogin(dataAuth.data);

      NotificationService.success(`Bienvenido`, 3000);
    } catch (error) {
      NotificationService.error("Error al intentar iniciar sesión.", 3000);
      console.error(error);
    }
  };

  return autologin;
}
