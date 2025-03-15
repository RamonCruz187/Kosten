// Front/src/modules/admin/components/CreateEditDepartures.jsx
import { Box, CircularProgress, Typography, useTheme } from "@mui/material"
import { useParams } from "react-router-dom";
import { DepartureForm } from "../components/DepartureForm";
import { RiAddLargeLine } from "react-icons/ri";
import { ModalInscripts } from "../components/ModalInscripts";
import { useCallback, useEffect, useState } from "react";
import { getPackageById } from "@/api/packageApi";
import { NotificationService } from "@/shared/services/notistack.service";
import { WhiteButton } from "@/shared/components/buttons/WhiteButton";


export const CreateEditDepartures = () => {
  const params = useParams();
  const packageFromCategory = +params.id || null;
  const theme = useTheme();
  const { palette } = theme

  const [isFetching, setIsFetching] = useState(true);
  const [packageData, setPackageData] = useState(true);
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
        setPackageData(response?.data?.data);
        NotificationService.success('Las salidas fueron cargadas con éxito');
        console.log('Las salidas fueron cargadas con éxito');
    } catch (error) {
        console.error(error);
        NotificationService.error('Error al cargar las salidas');
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
    <Box sx={{
      maxWidth: '1100px', 
      margin: '1rem auto', 
      paddingBottom: '2rem',
      display: 'flex',
      flexDirection: 'column',
    }} >
      {/* imagen con titulo */}
      <Box
        sx={{
          height: '180px',
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
              color: palette.tertiary.light, 
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
            setOpenModal={()=>handleOpenModal(departure, index)}
            index={index}
            refetch={fetchPackageById}
          />
        ))}
      {/* Botón para crear nueva */}
      {packageData?.departures?.length > 0 &&
        <WhiteButton
          onClick={() => setShowCreateForm(true)}
          text="AGREGAR SALIDA"
          icon={<RiAddLargeLine />}
          sx={{
            marginBottom: "1rem",
            maxWidth: {xs:"100%", sm:"200px"},
          }}
        />
      }
      {/* Formulario para crear nueva salida */}
      {(showCreateForm || packageData?.departures?.length === 0) && (
        <DepartureForm
          departureData={{startDate: "", endDate: "" }}
          package_Id={packageData.id}
          isCreate={true}
          refetch={fetchPackageById}
        />
      )}
      <ModalInscripts openModal={openModal} setOpenModal={handleOpenModal} indexDepartures={indexDepartures} />
        
    </Box>
  )
}