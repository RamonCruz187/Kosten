// src/modules/Departures/components/ReservationModal.jsx
import { Modal, Box, Typography, IconButton, Select, MenuItem, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from './ConfirmationModal';
import { useCallback, useState } from 'react';
import { formatDepartureDate } from '@/shared/utils/formatDeparture';
import { fCurrency } from '@/shared/utils/formatNumber';
import { StyledLabel } from '@/modules/admin/components/styles';
import { addUserToDeparture } from '@/api/departureUserApi';
import { NotificationService } from '@/shared/services/notistack.service';
import { OnlyTextButton } from '@/shared/components/buttons/OnlyTextButton';

const ReservationModal = ({ 
    setOpenModal, 
    departures, 
    departureSelected, 
    setDepartureSelected, 
}) => {
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { id: userId } = JSON.parse(localStorage.getItem('userAuth'));
  // const [formError, setFormError] = useState(false);

  const handleReservation = async () => {
    try {
      const response = await fetchReservation(departureSelected);
      // Si la respuesta es exitosa, abre el modal
      
      setOpenConfirmationModal(true);
    } catch (error) {
      console.error("Error al procesar la reserva:", error);
    }
  };

  const fetchReservation = useCallback (async (departureId) => {
    setIsFetching(true);
    try {
      const response = await addUserToDeparture(departureId, userId); // Axios devuelve 'data' directamente
      console.log('data', response?.data);
      NotificationService.success('Las salidas fueron cargadas con éxito');
    } catch (error) {
      console.error('Error al cargar las salidas', error);
      NotificationService.error('Error al cargar las salidas');
    } finally {
      setIsFetching(false);
    }
  }, [])

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          boxShadow: 14,
          p: 4,
          width: '90%',
          maxWidth: '500px',
          borderRadius: '4px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Oswald' }}>
          Reservar salida
        </Typography>
        <IconButton
          aria-label="close"
          onClick={() => setOpenModal(false)}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon fontSize="small" sx={{ color: '#080808' }} />
        </IconButton>
        <Typography variant="body1" sx={{ mb: 2, fontFamily: 'Catamaran', fontSize: '14px' }}>
          La reserva <b>quedará confirmada una vez realizado el pago.</b> Desde Kosten nos estaremos comunicando contigo a la brevedad por Whatsapp para pasarte la información necesaria para realizar el pago.
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, fontFamily: 'Catamaran', fontSize: '14px' }}>
          Seleccione la fecha de la salida que quiere reservar.
        </Typography>
        <Box component="form" sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <StyledLabel id="departure-label">Fecha Salida</StyledLabel>
            <Select
              labelId="departure-label"
              id="departure"
              name="departure"
              value={departureSelected}
              onChange={(e) => setDepartureSelected(e.target.value)}
              variant="outlined"
              displayEmpty // Esto asegura que el marcador de posición sea visible
            >
              <MenuItem value="" disabled></MenuItem>
              {departures?.map((departure) => (
                <MenuItem key={departure.id} value={departure.id}>
                  {formatDepartureDate(departure)}{' - '}{fCurrency(departure?.price)}
                </MenuItem>
              ))}
            </Select>
            {/* {formError && (
              <Typography variant="caption" color="error">
                Es necesario seleccionar una fecha
              </Typography>
            )} */}
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography variant="body2" sx={{ fontFamily: 'Catamaran' }}>¿Buscas otra fecha?</Typography>
          <Typography
            component="span"
            onClick={() => navigate('/contacto')}
            sx={{ color: '#005538', textTransform: 'uppercase', cursor: 'pointer', '&:hover': { color: '#00291b' } }}
          >
            Consultar otras fechas
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <OnlyTextButton
            isFetching={isFetching}
            onClick={() => setOpenModal(false)} 
            text="Cancelar"
            type="red"
          />
          <OnlyTextButton
            type="green"
            text="Reservar"
            onClick={handleReservation}
            disabled={!departureSelected}
            isFetching={isFetching}
          />
        </Box>
      </Box>
 
      {openConfirmationModal && (
        <Modal open={openConfirmationModal} onClose={() => setOpenConfirmationModal(false)}>
          <ConfirmationModal setOpenConfirmationModal={setOpenConfirmationModal}/>
        </Modal>
      )}
    </>
  );
};

export default ReservationModal;
