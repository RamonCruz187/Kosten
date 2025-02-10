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
  postImagesPackages,
  postSimpleImagePackages,
  updatePackage,
} from "@api/packageApi.js";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import { NotificationService } from "@shared/services/notistack.service.jsx";
import { RiEditLine, RiAddBoxLine, RiDeleteBin6Line } from 'react-icons/ri';

import { GlobalContext } from "@/shared/context/GlobalContext";
import { PackagesBreadCrumbs } from "../components/PackagesBreadCrumbs";
import { hasChanges } from "@/shared/utils/compareObj";
import { ModalWarning } from "../components/ModalWarning";

export const CreateEditPackageBasic = () => {
  const { state: stateContext } = useContext(GlobalContext);
  const categories = stateContext.categories;

  const [disabledButton, setDisabledButton] = useState(false);
  const [filesImages, setFilesImages] = useState([]);
  const [bannerPhoto, setBannerPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [packageData, setPackageData] = useState({
    name: "",
    active: "",
    category: "",
    images: [],
    bannerPhoto: { url: "" }
  });
  const [initialValues, setInitialValues] = useState({
    name: "",
    active: "",
    category: "",
    images: [],
    bannerPhoto: {},
  });
  const [formModified, setFormModified] = useState(false);
  const [newIdPackage, setNewIdPackage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

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
    bannerPhoto: Yup.mixed().when([], {
      is: () => !params.id, // Si params.id NO existe (es creación)
      then: (schema) =>
        schema
          .required('La imagen de portada es requerida')
          .test('fileType', 'Solo se permiten archivos JPG, PNG y WebP', (value) => {
            if (!value) return false;
            return ['image/jpeg', 'image/png', 'image/webp'].includes(value.type);
          })
          .test('fileSize', 'La imagen no debe superar los 5MB', (value) => {
            if (!value) return false;
            return value.size <= 5 * 1024 * 1024;
          }),
      otherwise: (schema) => schema.nullable(), // Si params.id existe (es edición), bannerPhoto puede ser null
    }),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      active: "",
      category: "",
      bannerPhoto: null,
    },
    validationSchema: paqueteSchema,
    onSubmit: (values) => {
      sendPackages(values);
    },
    enableReinitialize: true,
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
        bannerPhoto: {},
      });
      setInitialValues({
        name: packageInfo.name || "",
        active: packageInfo.active || "",
        category: packageInfo.category.name || "",
        // bannerPhoto: packageInfo.bannerPhoto || null,
        // images: packageInfo.images || [],
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
  }, []);

  const sendCreatePackages = useCallback(async (values) => {
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
      
      const { data: dataPackage } = await createPackage(formData);
      const newId = dataPackage.data.id;
      setNewIdPackage(newId); // Actualiza el estado
      NotificationService.success(`Paquete creado exitosamente`, 1000);
      
      return newId; // Devuelve el ID del paquete creado
    } catch (error) {
      console.error(`Error al crear el paquete:`,  error);
      NotificationService.error(`Error al crear el paquete`, 2200);
      return null;
    } finally {
      setDisabledButton(false);
    }
  }, [filesImages]);

  
  const sendEditPackages = useCallback(async (values) => {
    setDisabledButton(true);
    try {
      const selectedCategory = categories.find((c) => c.value === values.category);
      const dataToSend = {
        id: +params.id,
        active: values.active,
        idCategory: selectedCategory?.id,
        name: values.name,
      }
      const { data: dataPackage } = await updatePackage(dataToSend)
      
      NotificationService.success(`Paquete actualizado exitosamente`, 1000);
    } catch (error) {
      console.error(`Error al actualizar el paquete:`, error);
      NotificationService.error(`Error al actualizar el paquete`, 2200);
    } finally {
      setDisabledButton(false);
    }
  }, [params.id]);

  const sendPackages = (values) => {
    if(params.id){
      // funcion para enviar formulario de texto
      if(formModified){
        if(!formik.validateForm()) return
        sendEditPackages(values)
      }
      // funcion para enviar img bannerPhoto
      if(bannerPhoto){postBannerPhotoImage(values.bannerPhoto, params.id)}
      // funcion para enviar imgs images
      if(filesImages.length > 0){postImages(filesImages)}
      return params.id
    } else{ 
      const newId = sendCreatePackages(values);
      return newId
    }
  };

  const handleSiguiente = async (e, moveForward = false) => {
    e.preventDefault();
    try {
      const newId = await sendPackages(formik.values);
      if (moveForward) {
        if (params.id) {
        navigate(`/admin/paquetes/detalles/${params.id}`, {state: {isNewPackage: false}});
      } else {
        navigate(`/admin/paquetes/detalles/${newId}`, {state: {isNewPackage: true}}); 
      }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Rest of handlers
  const handleImageChange = (event) => {
    setFilesImages((prev) => [...prev, ...event.target.files]);
  };

  const handleImageTitle = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBannerPhoto(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      formik.setFieldValue("bannerPhoto", file);
    }
  };

  const postBannerPhotoImage = useCallback( async (imgFile, packID) => {
    const formData = new FormData();
    formData.append("imageType", "banner");
    formData.append("file", imgFile); // Archivo
  
    try {
      // Pasar el packageId y formData
      const response = await postSimpleImagePackages(packID, formData); // Axios devuelve 'data' directamente
        NotificationService.success('La imagen fue cargada con éxito');
    } catch (error) {
        console.error(error);
        NotificationService.error('Error al cargar la imagen');
    }
  }, [])

  const postImages = useCallback( async (imgsFiles) => {
    const formData = new FormData();
    formData.append("imageType", "packageImages");
    formData.append("file", imgsFiles); // Archivo
    // imgsFiles.forEach((imagen) => {
    //   formData.append("file", imagen);
    // });
    const isManyImgs = imgsFiles.length > 1
    try {
      // Pasar el packageId y formData
      const response = await postImagesPackages(params.id, formData); // Axios devuelve 'data' directamente
        NotificationService.success(isManyImgs ? `Las imágenes fueron cargadas con éxito` : `La imagen fue cargada con éxito`);
    } catch (error) {
        console.error(error);
        NotificationService.error(isManyImgs ? 'Error al cargar las imágenes' : 'Error al cargar la imagen');
    }
  }, [])

  const handleDeleteNewImg = (index) => {
      const newImagenes = [...filesImages];
      newImagenes.splice(index, 1);
      setFilesImages(newImagenes);
  }

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    // Verifica si algún campo ha cambiado comparando con los valores iniciales
    const isModified = hasChanges(initialValues, formik.values);
    setFormModified(isModified);

  }, [formik.values]);

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
                  helperText={
										(formik.errors.name ? formik.touched.name && formik.errors.name :
										`${formik.values.name.length} / 55 caracteres`)
									}
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

              {/* Mostrar las fotos del paquete */}
              {packageData &&
                packageData.images.length > 0 &&
                packageData.images.map((img) => {
                  if (img.id === packageData.bannerPhoto.id) {
                    return null;
                  }
                  return (
                  <Box
                    key={`img-card-${img.id}`}
                    sx={{
                      width: {xs: '100px', md: '150px', xl: '180px'},
                      height: {xs: '100px', md: '150px', xl: '180px'},
                      borderRadius: '8px',
                      zIndex: 10,
                      overflow: 'hidden',
                      position: 'relative',
                      "&:hover .delete-button": {
                        opacity: 1, 
                      },
                    }}
                  >
                      <Box
                        className="delete-button"
                        onClick={() => {
                          setOpenDialog(true)
                          setIdToDelete(img.id)
                        }}
                        sx={{
                          position: 'absolute',
                          top: '15px',
                          right: '15px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          cursor: 'pointer',
                          zIndex: 5,
                          borderRadius: '5px',
                          width: '30px',
                          height: '30px',
                          backgroundColor: '#fff',
                          opacity: {xs: 1, lg: 0},
                          transition: 'opacity 0.3s ease-in-out',
                        }}
                      >
                        <RiDeleteBin6Line size={18} color="#323232" />
                      </Box>
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        background: `url(${img.url})`,
                        backgroundSize: 'cover',
                      }}
                    >
                    </Box>
                  </Box>
                )}
              )}
              {/* boton de nueva imagen */}
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

              {/* Mostrar las fotos que se agregan */}
              {filesImages &&
                filesImages.length > 0 &&
                filesImages.map((img, index) => (

                <Box
                key={`new-img-card-${index}`}
                sx={{
                  width: {xs: '100px', md: '150px', xl: '180px'},
                  height: {xs: '100px', md: '150px', xl: '180px'},
                  borderRadius: '8px',
                  zIndex: 10,
                  overflow: 'hidden',
                  position: 'relative',
                  "&:hover .delete-button": {
                    opacity: 1, 
                  },
                }}
                >
                    <Box
                      className="delete-button"
                      onClick={() => handleDeleteNewImg(index)}
                      // onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        zIndex: 5,
                        borderRadius: '5px',
                        width: '30px',
                        height: '30px',
                        backgroundColor: '#fff',
                        opacity: {xs: 1, lg: 0},
                        transition: 'opacity 0.3s ease-in-out',
                      }}
                    >
                      <RiDeleteBin6Line size={18} color="#323232" />
                    </Box>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      background: `url(${URL.createObjectURL(img)})`,
                      backgroundSize: 'cover',
                    }}
                  >
                  </Box>
                </Box>
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
            disabled={
              !formik.isValid || // Si el formulario no es válido
              disabledButton ||  // Si el fetch está en progreso
              (Boolean(!params.id) && !formik.dirty) || // Si está en modo edición pero no hubo cambios
              (Boolean(params.id) && !formModified && bannerPhoto === null && filesImages.length === 0) // Si está en modo edición pero no hubo cambios
            }
            onClick={(e) => handleSiguiente(e, false)}
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
            disabled={
              !formik.isValid || // Si el formulario no es válido
              disabledButton ||  // Si el fetch está en progreso
              (Boolean(!params.id) && !formik.dirty) || // Si es nuevo pero no hubo cambios
              (Boolean(params.id) && !formModified && bannerPhoto === null && filesImages.length === 0) // Si está en modo edición pero no hubo cambios
            }            type="button"
            onClick={(e) => handleSiguiente(e, true)}
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
      <ModalWarning openDialog={openDialog} setOpenDialog={setOpenDialog} idToDelete={idToDelete} setIdToDelete={setIdToDelete} />
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