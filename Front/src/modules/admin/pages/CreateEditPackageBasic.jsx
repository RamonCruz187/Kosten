// @modules/admin/components/CreateEditPackage.jsx
import { useState, useCallback, useEffect, useContext } from "react";
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
  updatePackage,
} from "@api/packageApi.js";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import { NotificationService } from "@shared/services/notistack.service.jsx";
import { RiEditLine, RiAddBoxLine } from 'react-icons/ri';

import { GlobalContext } from "@/shared/context/GlobalContext";
import { PackagesBreadCrumbs } from "../components/PackagesBreadCrumbs";

export const CreateEditPackageBasic = () => {
  const { state: stateContext } = useContext(GlobalContext);
  const categories = stateContext.categories;

  // const location = useLocation();
  // const {category, destination} = location.state || {};
  
  // console.log('category', category);
  // console.log('destination', destination);

  const [disabledButton, setDisabledButton] = useState(false);
  const [filesImages, setFilesImages] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [packageData, setPackageData] = useState({
    name: "",
    active: "",
    category: "",
    images: [],
    bannerPhoto: { url: "" }
  });

  const params = useParams();
  const navigate = useNavigate();

  // el estado de Incompleto lo va a tomar si el package tiene vacia los campos del destino
  const states = [
    { value: true, label: "Activo" },
    { value: false, label: "Inactivo" },
  ];

  const paqueteSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(100, 'El nombre no debe exceder los 100 caracteres')
      .required('El nombre es requerido'),
    active: Yup.boolean()
      .oneOf(states.map(s => s.value), 'Estado inválido')
      .required('El estado es requerido'),
    category: Yup.string()
      .oneOf(categories.map(c => c.value), 'Región inválida')
      .required('La región es requerida'),
    bannerPhoto: Yup.mixed()
      .required('La imagen de portada es requerida')
      .test('fileType', 'Solo se permiten archivos JPG, PNG y WebP', (value) => {
        if (!value) return false;
        return ['image/jpeg', 'image/png', 'image/webp'].includes(value.type);
      })
      .test('fileSize', 'La imagen no debe superar los 5MB', (value) => {
        if (!value) return false;
        return value.size <= 5 * 1024 * 1024;
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      active: "",
      category: "",
      bannerPhoto: null,
      images: [],
    },
    validationSchema: paqueteSchema,
    onSubmit: (values) => {
      requestPackages(values);
    },
  });

  // Separate function to handle fetching and updating data
  const fetchAndUpdatePackageData = useCallback(async (id) => {
    try {
      const { data: response } = await getPackageById(id);
      const packageInfo = response.data;
      
      // Update all states in one place
      setPackageData(packageInfo);
      setImagePreview(packageInfo.bannerPhoto?.url || "");
      
      // Update formik values
      formik.setValues({
        name: packageInfo.name || "",
        active: packageInfo.active || "",
        category: packageInfo.category.name || "",
        bannerPhoto: null,
        images: [],
      });
      
    } catch (error) {
      console.error("Error al obtener el paquete:", error);
      NotificationService.error("Error al cargar los datos del paquete", 2200);
    }
  }, [formik]);

  // Effect to fetch data when params.id exists
  useEffect(() => {
    if (params.id) {
      fetchAndUpdatePackageData(params.id);
    }
  }, [params.id, fetchAndUpdatePackageData]);

  const requestPackages = useCallback(async (values) => {
    setDisabledButton(true);
    try {
      const formData = new FormData();
      
      formData.append(
        "packageData",
        new Blob([JSON.stringify(values)], { type: "application/json" })
      );
      
      if (values.bannerPhoto) {
        formData.append("bannerPhoto", values.bannerPhoto);
      }
      
      filesImages.forEach((imagen) => {
        formData.append("filesImages", imagen);
      });
      
      const { data: dataPackage } = params.id
        ? await updatePackage(params.id, formData)
        : await createPackage(formData);
      
      NotificationService.success(
        `Paquete ${params.id ? "actualizado" : "creado"} exitosamente`,
        1000
      );
      navigate("/admin/paquetes");
    } catch (error) {
      console.error(
        `Error al ${params.id ? "actualizar" : "crear"} el paquete:`,
        error
      );
      NotificationService.error(
        `Error al ${params.id ? "actualizar" : "crear"} el paquete`,
        2200
      );
    } finally {
      setDisabledButton(false);
    }
  }, [filesImages, params.id, navigate]);

  // Rest of your handlers
  const handleImageChange = (event) => {
    setFilesImages((prev) => [...prev, ...event.target.files]);
  };

  const handleImageTitle = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      formik.setFieldValue("bannerPhoto", file);
    }
  };

  const handleDeleteImg = (index) => {
      const newImagenes = [...filesImages];
      newImagenes.splice(index, 1);
      setFilesImages(newImagenes);
  }
  const handleClearForm = () => {
    formik.resetForm();
    setFilesImages([]);
    setImagePreview("");
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // In your render, replace packageValues with packageData

  return (
    <Container
      component="main"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
			<PackagesBreadCrumbs step={1} />
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 2 }}
      >
        {/* Disponibilidad, ubicación y botón guardar */}
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
          <Paper elevation={3} sx={{ borderRadius: 2, width: "100%", m: 0, padding: {xs:'1rem', md:'1rem 2rem', xl:'1rem 2rem' } }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
              }}
            >
              <Box>
                <FormControl
                  fullWidth
                  error={formik.touched.category && Boolean(formik.errors.category)}
                >
                  <StyledLabel id="category-label">Región</StyledLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    displayEmpty // Esto asegura que el marcador de posición sea visible
                  >
                    <MenuItem value="" disabled></MenuItem>
                    {categories.map((region) => (
                      <MenuItem key={`region-${region.id}-${region.value}`} value={region.value}>
                        {region.value}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.category && formik.errors.category && (
                    <Typography variant="caption" color="error">
                      {formik.errors.category}
                    </Typography>
                  )}
                </FormControl>
              </Box>
              <Box>
                <FormControl
                  fullWidth
                  error={formik.touched.active && Boolean(formik.errors.active)}
                >
                  <StyledLabel id="active-label">Estado</StyledLabel>
                  <Select
                    labelId="active-label"
                    id="active"
                    name="active"
                    value={formik.values.active}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    displayEmpty // Esto asegura que el marcador de posición sea visible
                  >
                    <MenuItem value="" disabled></MenuItem>
                    {states.map((state) => (
                      <MenuItem key={`state-${state.label}`} value={state.value}>
                        {state.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.active && formik.errors.active && (
                    <Typography variant="caption" color="error">
                      {formik.errors.active}
                    </Typography>
                  )}
                </FormControl>
              </Box>
            </Box>
          </Paper>

          {/* Imagen y título */}
          <Paper elevation={3} sx={{ borderRadius: 2, width: '100%', m: 0 }}>
            <Box>
              <Box
                sx={{
                  height: '180px',
                  backgroundColor: '#747474',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  backgroundImage: `url(${imagePreview || ''})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
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
                  {formik.values.name || packageData.name || 'Título del paquete'}
                </Typography>

                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
                  onChange={handleImageTitle}
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
              {formik.touched.bannerPhoto && formik.errors.bannerPhoto && (
              <Typography variant="caption" color="error" sx={{ paddingLeft: "1rem" }}>
                {formik.errors.bannerPhoto}
              </Typography>
              )}
              <Box sx={{ padding: {xs:'1rem', md:'1rem 2rem', xl:'1rem 2rem' } }}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Título del paquete"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Box>
            </Box>
          </Paper>

        {/* Subir imágenes */}
        <Box>
          <Paper elevation={3} sx={{ borderRadius: 2, width: "100%", m: 0, padding: {xs:'1rem', md:'2rem 2rem', xl:'2rem 2rem' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: {xs: '1rem', md: '1.5rem'}, }}>
              <Typography
                variant="titleH3"
                sx={{ 
                fontSize: {xs: '1rem', md: '1.1rem', xl: '1.2rem'}, 
                fontWeight: '500', 
                letterSpacing: '0.003em',
                }}
              >
                GALERÍA DE FOTOS
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="multiple-images-input"
                  multiple
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="multiple-images-input">
                  <Button 
                    variant="contained"
                    component="span"
                    sx={{
                      width: {xs: '100px', md: '150px', xl: '180px'},
                      height: {xs: '100px', md: '150px', xl: '180px'},
                      backgroundColor: '#C9C9C9',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <RiAddBoxLine size={50} color= "#323232"/>
                    <Typography sx={{ color: "#323232", fontSize: '14px', width: '50%', textAlign: 'center'}}>
                      Agregar imágenes
                    </Typography>
                  </Button>
                </label>



                {/* <Box
                  mt={2}
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    minHeight: '40px',
                    overflow: 'hidden',
                    overflowY: 'auto',
                  }}
                >
                  {filesImages.map((imagen, index) => (
                    <Chip
                      key={`fileImage-${index}`}
                      label={imagen.name}
                      onDelete={() => {
                        const newImagenes = [...filesImages];
                        newImagenes.splice(index, 1);
                        setFilesImages(newImagenes);
                      }}
                    />
                  ))}
                </Box> */}


              {packageData &&
                packageData.images.length > 0 &&
                packageData.images.map((img) => (
                <Box
                  key={`img-card-${img.id}`}
                  sx={{
                    width: {xs: '100px', md: '150px', xl: '180px'},
                    height: {xs: '100px', md: '150px', xl: '180px'},
                    background: `url(${img.url})`,
                    backgroundSize: 'cover',
                    borderRadius: '8px',
                  }}
                />
              ))}
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Botones */}
        <Box sx={{mb:5, display:"flex", justifyContent:"end", gap:'1rem'}}>
          <Button
            type="button"
            variant="contained"
            onClick={handleClearForm}
            sx={{
              backgroundColor: "#fff",
              width: {xs:'100%', md:'130px', xl:'150px'},
              transition: "transform 0.3s ease-in-out",
            }}
          >
            Guardar
          </Button>
          <Button
            variant="contained"
            disabled={disabledButton}
            type="submit"
            // onClick={() => navigate("/admin/paquetes/detalles")}
            sx={{
              backgroundColor: "#72CCA0",
              width: {xs:'100%', md:'130px', xl:'150px'},
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {params.id ? "Actualizar Paquete" : "Siguiente"}
          </Button>
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