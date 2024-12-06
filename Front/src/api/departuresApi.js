import apiClient from './apiClient';
import { DEPARTURES_ENDPOINT } from '../constants';


// Obtiene todas las salidas.
export const getAllDepartures = () => {
    return apiClient.get(`${DEPARTURES_ENDPOINT}`, { skipAuth: true });
};

// Actualizar Salida.
export const updateDeparture = ( body ) => {
    return apiClient.put(`${DEPARTURES_ENDPOINT}`, body);
};

// Crea una nueva salida.
export const createDeparture = ( body ) => {
  return apiClient.post( `${DEPARTURES_ENDPOINT}`, body);
};

// Obtiene una Salida por su id.
export const getDepartureById = ( id ) => {
    if (!id) throw new Error("El ID es obligatorio para obtener una salida");
    return apiClient.get( `${DEPARTURES_ENDPOINT}/${ id }` );
};

// Elimina una Salida.
export const deleteDeparture = ( id ) => {
    if (!id) throw new Error("El ID es obligatorio para eliminar una salida");
    return apiClient.delete( `${DEPARTURES_ENDPOINT}/${ id }` );
};

// ejemplos de uso:
// const fetchDepartures = useCallback( async () => {
//     setIsFetching(true);
//     try {
//         const { data } = await getAllDepartures();
//         console.log(data);
//         NotificationService.success('Las salidas fueron cargadas con éxito');
//     } catch (error) {
//         console.error(error);
//         NotificationService.error('Error al cargar las salidas');
//     } finally {
//         setIsFetching(false);
//     }
// }, [])