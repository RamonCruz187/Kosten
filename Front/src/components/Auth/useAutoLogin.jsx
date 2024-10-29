import { login } from "../../api/authApi.js";
import { NotificationService } from "../../shared/services/notistack.service.jsx";
import { useAuth } from "../../shared/hooks/useAuth.jsx";
import { getData } from "../../api/userApi.js";
import { useUserData } from "../../shared/hooks/useUserData.jsx";
export default function useAutoLogin() {
  const { handleLogin } = useAuth();
  const { setUserData } = useUserData();

  const autologin = async (email, password) => {
    try {
      const { data: dataAuth } = await login({ email, password });
      const { data: dataUser } = await getData(dataAuth.data.id);

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
