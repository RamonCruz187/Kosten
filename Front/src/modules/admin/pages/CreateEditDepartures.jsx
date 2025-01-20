// Front/src/modules/admin/components/CreateEditDepartures.jsx
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useLocation } from "react-router-dom";
import { DepartureForm } from "../components/DepartureForm";
import { useCallback, useEffect, useState } from "react";
import { getAllStaff } from "@/api/staffApi";
import { NotificationService } from "@/shared/services/notistack.service";
import { RiAddLargeLine } from "react-icons/ri";
import { ModalInscripts } from "../components/ModalInscripts";


export const CreateEditDepartures = () => {
  const location = useLocation();
  const packageData = location.state.departure;

  const [isFetching, setIsFetching] = useState(true);
  const [allStaff, setAllStaff] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const handleOpenModal = (data) => {
    setOpenModal(data);
  }
  const fetchAllStaff = useCallback( async () => {
    setIsFetching(true);
    try {
        const response = await getAllStaff(); // Axios devuelve 'data' directamente
        console.log('data', response?.data?.data);
        setAllStaff(response?.data?.data);
        NotificationService.success('El staff fue cargado con éxito');
        console.log('El staff fue cargado con éxito');
    } catch (error) {
        console.error(error);
        NotificationService.error('Error al cargar al staff');
    } finally {
        setIsFetching(false);
    }
  }, [])

  useEffect(() => {
    fetchAllStaff();
  }, [])

  return (
    <Box sx={{maxWidth: '1100px', margin: '1rem auto', paddingBottom: '2rem', backgroundColor: "#F3F3F3"}} >
      {/* imagen con titulo */}
      <Box
        sx={{
          height: '180px',
          backgroundColor: '#747474',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          backgroundImage: `url(${packageData.bannerPhoto.url || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box sx={{width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography
            variant="titleH3"
            sx={{ 
              color: '#fff', 
              fontSize: '36px',
              fontWeight: '600',
              lineHeight: '20.8px',
              letterSpacing: '0.003em',
            }}
          >
            {packageData.name}
          </Typography>
        </Box>
      </Box>

      {/* formularios */}
      {/* hacer los maps */}
      {isFetching 
        ? <CircularProgress /> 
        : (
          <>
            {/* Mapea las salidas existentes */}
            {packageData?.departures?.length > 0 &&
              packageData.departures.map((departure, index) => (
                <DepartureForm
                  key={`departure-${departure.id}`}
                  departureData={departure}
                  package_Id={packageData.id}
                  allStaff={allStaff}
                  setOpenModal={handleOpenModal}
                  index={index}
                />
              ))}
            {/* Botón para crear nueva */}
            {packageData?.departures?.length > 0 &&
              <Button
                variant="contained"
                color="#D9D9D9"
                onClick={() => setShowCreateForm(true)}
                sx={{ margin: 2, 
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: '7px',
                  display: 'flex',
                  gap: '.5rem',
                  alignItems: 'center',
                  backgroundColor: '#D9D9D9'
                }}
              >
                <RiAddLargeLine />
                <Typography sx={{fontSize: '0.9rem'}}>
                AGREGAR SALIDA
                </Typography>
              </Button>
            }
          </>
        )}
  
        {/* Formulario para crear nueva salida */}
        {(showCreateForm || packageData?.departures?.length === 0) && (
          <DepartureForm
            package_Id={packageData.id}
            allStaff={allStaff}
            setOpenModal={setOpenModal}
            isCreate={true}
            onClose={() => setShowCreateForm(false)} // Prop para cerrar el formulario (opcional)
          />
        )}
        <ModalInscripts openModal={openModal} setOpenModal={handleOpenModal} />
    </Box>
  )
}