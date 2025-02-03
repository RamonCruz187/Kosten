// Front/src/modules/admin/components/CreateEditDepartures.jsx
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import { DepartureForm } from "../components/DepartureForm";
import { RiAddLargeLine } from "react-icons/ri";
import { ModalInscripts } from "../components/ModalInscripts";
import { useCallback, useEffect, useState } from "react";
import { getPackageById } from "@/api/packageApi";
import { NotificationService } from "@/shared/services/notistack.service";


export const CreateEditDepartures = () => {
  const params = useParams();
  const packageFromCategory = +params.id || null;

  const [isFetching, setIsFetching] = useState(true);
  const [packageData, setPackageData] = useState(true);
  // const [allStaff, setAllStaff] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [indexDepartures, setIndexDepartures] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const handleOpenModal = (data, index) => {
    setOpenModal(data);
    setIndexDepartures(index);
  }

  const fetchPackageById = useCallback( async () => {
    setIsFetching(true);
    try {
        const response = await getPackageById(packageFromCategory); // Axios devuelve 'data' directamente
        console.log('data', response?.data?.data);
        setPackageData(response?.data?.data);
        NotificationService.success('El paquete fue cargado con éxito');
        console.log('El paquete fue cargado con éxito');
    } catch (error) {
        console.error(error);
        NotificationService.error('Error al cargar el paquete');
    } finally {
        setIsFetching(false);
    }
  }, [])

  useEffect(() => {
    fetchPackageById();
  }, [])

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
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
        {/* Mapea las salidas existentes */}
        {packageData?.departures?.length > 0 &&
          packageData.departures.map((departure, index) => (
            <DepartureForm
              key={`departure-${departure.id}`}
              departureData={departure}
              package_Id={packageData.id}
              // allStaff={allStaff}
              setOpenModal={()=>handleOpenModal(departure, index)}
              index={index}
              onActionComplete={fetchPackageById}
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
        {/* Formulario para crear nueva salida */}
        {(showCreateForm || packageData?.departures?.length === 0) && (
          <DepartureForm
            package_Id={packageData.id}
            setOpenModal={()=>handleOpenModal(departure, index)}
            isCreate={true}
            onActionComplete={fetchPackageById} // Refetch tras completar la acción
          />
        )}
        <ModalInscripts openModal={openModal} setOpenModal={handleOpenModal} indexDepartures={indexDepartures} />
    </Box>
  )
}