// @modules/admin/components/CreateEditPackage.jsx
import { useState, useCallback, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  styled,
} from "@mui/material";
import {
  createPackage,
  getPackageById,
  postSimpleImagePackages,
  updatePackage,
} from "@api/packageApi.js";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import { NotificationService } from "@shared/services/notistack.service.jsx";
import { RiEditLine } from 'react-icons/ri';
import { PackagesBreadCrumbs } from "../components/PackagesBreadCrumbs";

const niveles = [
  "Principiante",
  "Intermedio",
  "Intermedio-Avanzado",
  "Avanzado",
];

const paqueteSchema = Yup.object().shape({
  description: Yup.string().required("La descripción es requerida"),
  itinerary: Yup.string(),
  duration: Yup.string(),
  physical_level: Yup.string(),
  technical_level: Yup.string(),
  included_services: Yup.string(),
  // itineraryPhoto: Yup.string(),
  // all_months: Yup.array().of(Yup.number()).min(1, "Selecciona al menos un mes"),
});

export const CreateEditPackageDetails = () => {
  const [disabledButton, setDisabledButton] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [package_, setPackage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [initialValues, setInitialValues] = useState({
  // const [packageValues, setPackageValues] = useState({
    description: "",
    itinerary: "",
    duration: "",
    physical_level: "",
    technical_level: "",
    included_services: "",
    // itineraryPhoto: "",
    // all_months: [],
  });

  const params = useParams();
  const navigate = useNavigate();

  const getPackById = useCallback(
    async (id) => {
      try {
        const { data: dataPackages } = await getPackageById(id);
        setPackage(dataPackages.data);
        formik.setValues({
          description: dataPackages.data.description,
          itinerary: dataPackages.data.itinerary,
          duration: dataPackages.data.duration,
          physical_level: dataPackages.data.physical_level,
          technical_level: dataPackages.data.technical_level,
          included_services: dataPackages.data.included_services,
          // itineraryPhoto: dataPackages.data.itineraryPhoto,
          // all_months: dataPackages.data.months.map((month) => month.name),
        });
        setInitialValues({
          description: dataPackages.data.description,
          itinerary: dataPackages.data.itinerary,
          duration: dataPackages.data.duration,
          physical_level: dataPackages.data.physical_level,
          technical_level: dataPackages.data.technical_level,
          included_services: dataPackages.data.included_services,
          // itineraryPhoto: dataPackages.data.itineraryPhoto,
          // all_months: dataPackages.data.months.map((month) => month.name),
        });
      } catch (error) {
        console.error("Error al obtener los departures: ", error);
      }
    },
    [setPackage, setInitialValues]
  );

  const requestPackages = useCallback(
    async (values) => {
      setDisabledButton(true);

      const formData = new FormData();
      formData.append(
        "packageData",
        new Blob([JSON.stringify(values)], { type: "application/json" })
      );

      try {
        const { data: dataPackage } = params.id
          ? await updatePackage(formData)
          : await createPackage(formData);

        console.log("Respuesta del backend: ", dataPackage);
        NotificationService.success(
          params.id
            ? "Paquete actualizado exitosamente"
            : "Paquete creado exitosamente",
          1000
        );
        navigate("/admin/paquetes");
      } catch (error) {
        console.error(
          params.id
            ? "Error al actualizar el paquete"
            : "Error al crear el paquete",
          error.response
        );
        NotificationService.error(
          params.id
            ? "Error al actualizar el paquete"
            : "Error al crear el paquete",
          2200
        );
      } finally {
        setDisabledButton(false);
      }
    },
    [imagenes]
  );

  const formik = useFormik({
    initialValues: {
      description: "",
      itinerary: "",
      duration: "",
      physical_level: "",
      technical_level: "",
      included_services: "",
      itineraryPhoto: "",
    },
    enableReinitialize: true,
    validationSchema: paqueteSchema,
    onSubmit: (values) => {
      requestPackages(values);
    },
  });

  const handleGuardar = async (e) => {
    e.preventDefault();
    try { 
      await formik.handleSubmit();
      navigate("/admin/paquetes");
    } catch (error) {
      console.error(error);
      NotificationService.error('Error al guardar el paquete', 2500);
    }
  };

  const handleSiguiente = async(e) => {
    e.preventDefault();
    try { 
      await formik.handleSubmit();
      navigate(params.id ? `/admin/paquetes/destinos/${params.id}` : "/admin/paquetes/destinos");
    } catch (error) {
      console.error(error);
      NotificationService.error('Error al guardar el paquete', 2500);
    }
  };

  const postItineraryImage = useCallback( async (imgFile) => {
    setDisabledButton(true);
    const formData = new FormData();
    formData.append("imageType", "itinerary");
    formData.append("file", imgFile); // Archivo
  
    try {
      // Pasar el packageId y formData
      const response = await postSimpleImagePackages(params.id, formData); // Axios devuelve 'data' directamente
        console.log('response', response);
        NotificationService.success('La imagen fue cargada con éxito');
    } catch (error) {
        console.error(error);
        NotificationService.error('Error al cargar la imagen');
    } finally {
      setDisabledButton(false);
    }
    }, [])
  const handleImageChange = (event) => {
    console.log('event', event);
    //muestra el preview de la imagen
    setImagenes(event.target.files);
    //envia la imagen al backend
    postItineraryImage(event.target.files[0]);
  };

  useEffect(() => {
    if (params.id) {
      getPackById(params.id);
    }
  }, [params.id, getPackById]);

  useEffect(() => {
    if (imagenes.length > 0) {
      const previewUrl = URL.createObjectURL(imagenes[0]);
      setImagePreview(previewUrl);
    }
  }, [imagenes]);

  return (
    <Container
      component="main"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
			<PackagesBreadCrumbs step={2} />
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 2 }}
      >
        {/*Box container principal*/}
        <Box 
          sx={{display: 'flex', gap: '1rem'}}
        >

          <Box sx={{flex:2}}>

              {/*IZQ: De que se trata e itinerario*/}
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                item
                xs={8}
              >
                <Paper
                  elevation={3}
                  sx={{ borderRadius: 2, width: "100%", m: 0, padding: {xs:'1rem', md:'2rem' } }}
                >
                  <Typography
                    variant="overline"
                    sx={{ mb: 2, fontSize: "1rem", fontWeight: "bold" }}
                  >
                    De qué se trata
                  </Typography>
                  <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="De qué se trata la salida?"
                    multiline
                    rows={10}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </Paper>
                <Paper
                  elevation={3}
                  sx={{ borderRadius: 2, width: "100%", m: 0,  padding: {xs:'1rem', md:'1.5rem 2rem' }  }}
                >
                  <Typography
                    variant="overline"
                    sx={{ mb: 2, fontSize: "1rem", fontWeight: "bold" }}
                  >
                    Itinerario
                  </Typography>
                  <TextField
                    fullWidth
                    id="itinerary"
                    name="itinerary"
                    label="Qué actividades se hacen este día?"
                    multiline
                    rows={17}
                    value={formik.values.itinerary}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.itinerary &&
                      Boolean(formik.errors.itinerary)
                    }
                    helperText={
                      formik.touched.itinerary && formik.errors.itinerary
                    }
                  />
                </Paper>
              </Box>
              
          </Box>
          <Box sx={{flex:1, display: 'flex', flexDirection:'column', gap:'1rem'}}>
            {/* DER: informacion importante*/}
            <Box>
              <Paper
                elevation={3}
                sx={{ borderRadius: 2, width: "100%", m: 0,  padding: {xs:'1rem', md:'2rem' } }}
              >
                <Typography
                  variant="overline"
                  sx={{ mb: 2, fontSize: "1rem", fontWeight: "bold" }}
                >
                  Información importante
                </Typography>
                <TextField
                  fullWidth
                  id="duration"
                  name="duration"
                  label="Duración de salida"
                  value={formik.values.duration}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.duration && Boolean(formik.errors.duration)
                  }
                  helperText={
                    formik.touched.duration && formik.errors.duration
                  }
                />
                <FormControl
                  sx={{ mt: 2 }}
                  fullWidth
                  error={
                    formik.touched.physical_level &&
                    Boolean(formik.errors.physical_level)
                  }
                >
                  <StyledLabel id="physical-level-label">
                    Nivel físico
                  </StyledLabel>
                  <Select
                    labelId="physical-level-label"
                    id="physical_level"
                    name="physical_level"
                    value={formik.values.physical_level}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                  >
                    {niveles.map((nivel) => (
                      <MenuItem key={nivel} value={nivel}>
                        {nivel}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.physical_level &&
                    formik.errors.physical_level && (
                      <Typography variant="caption" color="error">
                        {formik.errors.physical_level}
                      </Typography>
                    )}
                </FormControl>
                <FormControl
                  sx={{ mt: 2 }}
                  fullWidth
                  error={
                    formik.touched.technical_level &&
                    Boolean(formik.errors.technical_level)
                  }
                >
                  <StyledLabel id="technical-level-label">
                    Nivel técnico
                  </StyledLabel>
                  <Select
                    labelId="technical-level-label"
                    id="technical_level"
                    name="technical_level"
                    value={formik.values.technical_level}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                  >
                    {niveles.map((nivel) => (
                      <MenuItem key={nivel} value={nivel}>
                        {nivel}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.technical_level &&
                    formik.errors.technical_level && (
                      <Typography variant="caption" color="error">
                        {formik.errors.technical_level}
                      </Typography>
                    )}
                </FormControl>
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  id="included_services"
                  name="included_services"
                  label="Servicios incluidos"
                  multiline
                  rows={2}
                  value={formik.values.included_services}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.included_services &&
                    Boolean(formik.errors.included_services)
                  }
                  helperText={
                    formik.touched.included_services &&
                    formik.errors.included_services
                  }
                />
              </Paper>
            </Box>
            {/* Imagen */}
            <Paper elevation={3} sx={{ borderRadius: '10px', width: '100%', aspectRatio: '16 / 20', m: 0, overflow: 'hidden' }}>
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  backgroundColor: '#747474',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  backgroundImage: `url(${imagePreview || (package_ && package_.itineraryPhoto ? package_.itineraryPhoto.url : '')})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="raised-button-file"
                  style={{ position: 'absolute', left: 20, top: 20 }}
                >
                  <Button
                    startIcon={<RiEditLine />}
                    className="hover__transform"
                    variant="contained"
                    component="span"
                    sx={{
                      transition: 'transform 0.3s ease-in-out',
                      bgcolor: 'var(--color-links)',
                    }}
                  >
                    Modificar imagen
                  </Button>
                </label>
              </Box>
            </Paper>
            {/* Botones */}
            <Box sx={{display:"flex", justifyContent:"space-between", gap:'1rem'}} >
              <Button
                type="button"
                variant="contained"
                onClick={handleGuardar}
                sx={{
                  backgroundColor: "#fff",
                  width: "100%",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                Guardar
              </Button>
              <Button
                variant="contained"
                disabled={disabledButton}
                type="button"
                onClick={handleSiguiente}
                sx={{
                  backgroundColor: "#72CCA0",
                  width: "100%",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                {params.id ? "Actualizar Paquete" : "Siguiente"}
              </Button>
            </Box>

          </Box>
        </Box>
      </Box>
    </Container>
  );
};

const StyledLabel = styled(InputLabel)(({ theme, sx = {} }) => ({
  '&.MuiInputLabel-shrink': {
    backgroundColor: theme.palette.background.paper || 'white',
    padding: '0 8px',
  },
  ...sx,
}));