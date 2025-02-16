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
  getPackageById,
  postSimpleImagePackages,
  updatePackage,
} from "@api/packageApi.js";
import Container from "@mui/material/Container";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NotificationService } from "@shared/services/notistack.service.jsx";
import { RiEditLine } from 'react-icons/ri';
import { PackagesBreadCrumbs } from "../components/PackagesBreadCrumbs";
import { hasChanges } from "@/shared/utils/compareObj";

const niveles = [
  "Principiante",
  "Intermedio",
  "Intermedio-Avanzado",
  "Avanzado",
];

export const CreateEditPackageDetails = () => {
	const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isNewPackage = location.state ? location.state?.isNewPackage : false;
	
  const paqueteSchema = () =>
    Yup.object().shape({
      description: Yup.string()
        .required("La descripción es requerida")
        .max(1030, "La descripción no puede superar los 1030 caracteres"),
  
      itinerary: Yup.string()
        .required("El itinerario es requerido")
        .max(10000, "El itinerario no puede superar los 10000 caracteres"),
  
      duration: Yup.string().required("La duración es requerida"),
  
      physical_level: Yup.string().required("El nivel físico es requerido"),
  
      technical_level: Yup.string().required("El nivel técnico es requerido"),
  
      included_services: Yup.string()
        .required("Los servicios incluidos son requeridos")
        .max(320, "Los servicios incluidos no pueden superar los 320 caracteres"),
      itineraryPhoto: Yup.mixed().when([], {
        is: () => isNewPackage, // Si params.id NO existe (es creación)
        then: (schema) =>
          schema
            .required('La imagen de itinerario es requerida')
            .test('fileType', 'Solo se permiten archivos JPG, PNG y WebP', (value) => {
              if (!value) return false;
              return ['image/jpeg', 'image/png', 'image/webp'].includes(value.type);
            })
            .test('fileSize', 'La imagen no debe superar los 5MB', (value) => {
              if (!value) return false;
              return value.size <= 5 * 1024 * 1024;
            }),
        otherwise: (schema) => schema.nullable(), 
      }),
    });
	

  const [disabledButton, setDisabledButton] = useState(false);
  const [itineraryPhoto, setItineraryPhoto] = useState(null);
  const [package_, setPackage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [initialValues, setInitialValues] = useState({});
  const [formModified, setFormModified] = useState(false);

  const getPackById = useCallback(
		async (id) => {
			if(isNewPackage) return;
      try {
        const { data: dataPackages } = await getPackageById(id);
        setPackage(dataPackages.data);
				console.log('dataPackages.data', dataPackages.data);
        formik.setValues({
					id: +params.id,
					idCategory: dataPackages.data.category.id,
          description: dataPackages.data.description,
          itinerary: dataPackages.data.itinerary,
          duration: dataPackages.data.duration,
          physical_level: dataPackages.data.physical_level,
          technical_level: dataPackages.data.technical_level,
          included_services: dataPackages.data.included_services,
					itineraryPhoto: {},
        });
        setInitialValues({
					id: +params.id,
					idCategory: dataPackages.data.category.id,
          description: dataPackages.data.description,
          itinerary: dataPackages.data.itinerary,
          duration: dataPackages.data.duration,
          physical_level: dataPackages.data.physical_level,
          technical_level: dataPackages.data.technical_level,
          included_services: dataPackages.data.included_services,
					itineraryPhoto: {},
        });
      } catch (error) {
        console.error("Error al obtener los departures: ", error);
      }
    },
    [setPackage, setInitialValues]
  );

  const formik = useFormik({
    initialValues: {
			id: "",
			idCategory: "",
      description: "",
      itinerary: "",
      duration: "",
      physical_level: "",
      technical_level: "",
      included_services: "",
      itineraryPhoto: {},
    },
    enableReinitialize: true,
    validationSchema: paqueteSchema,
    onSubmit: (values) => {
      sendPackages(values);
    },
  });

	const sendPackages = (values) => {
      // funcion para enviar formulario de texto
			setDisabledButton(true);
      console.log("formModified", formModified)
      if(formModified){
        if(!formik.validateForm()) return
        sendEditPackages(values)
      }
      // funcion para enviar img itineraryPhoto
      if(itineraryPhoto){postItineraryImage(itineraryPhoto, params.id)}

			setDisabledButton(false);
  };

	const sendEditPackages = useCallback(async (values) => {
		console.log('formik.values', formik.values);
		const dataToSend = {
			id: +params.id,
			idCategory: values.idCategory,
			description: values.description,
			itinerary: values.itinerary,
			duration: values.duration,
			physical_level: values.physical_level,
			technical_level: values.technical_level,
			included_services: values.included_services,
		}
    try {
      const { data: dataPackage } = await updatePackage(dataToSend)
      NotificationService.success(`Paquete actualizado exitosamente`, 1000);
      setInitialValues({
        id: +params.id,
        idCategory: values.idCategory,
        description: values.description,
        itinerary: values.itinerary,
        duration: values.duration,
        physical_level: values.physical_level,
        technical_level: values.technical_level,
        included_services: values.included_services,
        itineraryPhoto: values.itineraryPhoto,
      });
    } catch (error) {
      console.error(`Error al actualizar el paquete:`, error);
      NotificationService.error(`Error al actualizar el paquete`, 2200);
    }
  }, [params.id]);

	const handleSiguiente = async (e, moveForward = false) => {
    e.preventDefault();
    try {
      await sendPackages(formik.values);
      if (moveForward) {
        if (!isNewPackage) {
					navigate(params.id && `/admin/paquetes/destinos/${params.id}`, {state: {isNewPackage: false}});
				} else {
					navigate(`/admin/paquetes/destinos/${params.id}`, {state: {isNewPackage: true}}); 
				}
      }
    } catch (error) {
      console.error(error);
    }
  };

  const postItineraryImage = useCallback( async (imgFile, packID) => {
    const formData = new FormData();
    formData.append("imageType", "itinerary");
    formData.append("file", imgFile); // Archivo
  
    try {
      // Pasar el packageId y formData
      const response = await postSimpleImagePackages(packID, formData); // Axios devuelve 'data' directamente
        console.log('response', response);
        NotificationService.success('La imagen fue cargada con éxito');
    } catch (error) {
        console.error(error);
        NotificationService.error('Error al cargar la imagen');
		}
  }, [])

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setItineraryPhoto(file);
    formik.setFieldValue("itineraryPhoto", file);
  };

  useEffect(() => {
    if (params.id) {
      getPackById(params.id);
    }
  }, [params.id, getPackById]);

  useEffect(() => {
    if (itineraryPhoto) {
        const previewUrl = URL.createObjectURL(itineraryPhoto);
        setImagePreview(previewUrl);
    }
  }, [itineraryPhoto]);

  useEffect(() => {
    // Verifica si algún campo ha cambiado comparando con los valores iniciales
    const isModified = hasChanges(initialValues, formik.values);
    setFormModified(isModified);
		if (itineraryPhoto) setFormModified(true);
  }, [formik.values]);

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
        <Box sx={{display: 'flex', gap: '1rem'}}>
          <Box sx={{flex:2}}>
              {/*IZQ: De que se trata e itinerario*/}
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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
											(formik.errors.description ? formik.touched.description && formik.errors.description :
											`${formik.values.description.length} / 1030 caracteres`)
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
											(formik.errors.itinerary ? formik.touched.itinerary && formik.errors.itinerary :
											`${formik.values.itinerary.length} / 10000 caracteres`)
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
										(formik.errors.included_services ? formik.touched.included_services && formik.errors.included_services :
										`${formik.values.included_services.length} / 320 caracteres`)
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
								disabled={
                  disabledButton ||  // Si el fetch está en progreso 
                  !formik.isValid ||  // Si el formulario no es válido
                  (isNewPackage && !formik.dirty)  // Si el formulario es nuevo paquete debe estar completo
                }
								onClick={(e) => handleSiguiente(e, false)}
                sx={{
                  backgroundColor: "#fff",
                  width: "100%",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                Actualizar Paquete
              </Button>
              <Button
                variant="contained"
                disabled={
                  disabledButton ||  // Si el fetch está en progreso 
                  !formik.isValid ||  // Si el formulario no es válido
                  (isNewPackage && !formik.dirty)  // Si el formulario es nuevo paquete debe estar completo
                }
                type="button"
								onClick={(e) => handleSiguiente(e, true)}
                sx={{
                  backgroundColor: "#72CCA0",
                  width: "100%",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                Guardar y Siguiente
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