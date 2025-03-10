// @modules/admin/pages/CreateEditPackageDestination.jsx
import { useState, useCallback, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Button,
  InputLabel,
  Typography,
  Paper,
  styled,
  Container,
} from "@mui/material";
import {
  getPackageById,
  postImagesPackages,
  putImagePackagesById,
  updatePackage,
} from "@api/packageApi.js";
import { RiEditLine } from 'react-icons/ri';

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NotificationService } from "@shared/services/notistack.service.jsx";
import { PackagesBreadCrumbs } from "../components/PackagesBreadCrumbs";
import { hasChanges } from "@/shared/utils/compareObj";
import { checkSteps } from "@/shared/utils/checkStepsPackage";
import { WhiteButton } from "@/shared/components/buttons/WhiteButton";
import { ColorButton } from "@/shared/components/buttons/ColorButton";

const paqueteSchema = Yup.object().shape({
  locationInfo: Yup.string()
    .required("La información de la ubicación es requerida")
    .max(1100, "La información de la ubicación no puede superar los 1030 caracteres"),
  historyInfo: Yup.string()
    .required("La información de la historia es requerida")
    .max(1100, "La información de la historia no puede superar los 1030 caracteres"),
  activityInfo: Yup.string()
    .required("La información de las actividades es requerida")
    .max(970, "La información de las actividades no puede superar los 1030 caracteres"),
});

export const CreateEditPackageDestination = () => {
  const location = useLocation();
  const isNewPackage = location.state ? location.state?.isNewPackage : {};
  const params = useParams();
  const navigate = useNavigate();
  
  const [disabledButton, setDisabledButton] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [imagenes, setImagenes] = useState([...new Array(3)]);
  const [imagePreview, setImagePreview] = useState([...new Array(3)]);
  const [package_, setPackage] = useState(null);
  const [packageValues, setPackageValues] = useState({
    locationInfo: "",
    historyInfo: "",
    activityInfo: "",
  });
  const [formModified, setFormModified] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [completeSteps, setCompleteSteps] = useState({});

  // traer info del paquete
  const getPackById = useCallback(async (id) => {
    try {
      const { data: dataPackages } = await getPackageById(id);
      setPackage(dataPackages.data);
      setCompleteSteps(checkSteps(dataPackages.data));
      setPackageValues({
        locationInfo: dataPackages.data.locationInfo,
        historyInfo: dataPackages.data.historyInfo,
        activityInfo: dataPackages.data.activityInfo,
      });
      setInitialValues({
        locationInfo: dataPackages.data.locationInfo,
        historyInfo: dataPackages.data.historyInfo,
        activityInfo: dataPackages.data.activityInfo,
      });
      formik.setValues({
        locationInfo: dataPackages.data.locationInfo,
        historyInfo: dataPackages.data.historyInfo,
        activityInfo: dataPackages.data.activityInfo,
      });
      if(dataPackages.data.destinyPhotos.length > 0){
        dataPackages.data.destinyPhotos.map((photo, index) => {
          setImagePreview((prevImagenes) => {
            const newImagenes = [...prevImagenes];
            newImagenes[index] = photo.url;
            return newImagenes;
          });
        })
      }
    } catch (error) {
      console.error("Error al obtener los departures: ", error);
    }
  },
  [setPackage, setPackageValues]
);

  const formik = useFormik({
    initialValues: {
      locationInfo: "",
      historyInfo: "",
      activityInfo: "",
    },
    enableReinitialize: true,
    validationSchema: paqueteSchema,
    onSubmit: (values) => {
      sendPackages(values);
    },
  });

  // guarda en el state segun posicion y muestra las imagenes
  const handleChangeImage = (event, position) => {
    const file = event.target.files[0];
    if (file) {
      setImagenes((prevImagenes) => {
        const newImagenes = [...prevImagenes];
        newImagenes[position] = file;
        return newImagenes;
      });
      setImagePreview((prevImags) => {
        const newImags = [...prevImags];
        newImags[position] = URL.createObjectURL(file);
        return newImags;
      });
    }
  };

  const handleSiguiente = async (e, moveForward = false) => {
    e.preventDefault();
    try {
      await sendPackages(formik.values);
      if (moveForward) {
					navigate(`/admin/paquetes/`); 
				}
    } catch (error) {
      console.error(error);
    }
  };

  const sendPackages = async (values) => {
    try {
      setDisabledButton(true);
      setIsFetching(true);
      // Validar el formulario
      const errors = await formik.validateForm();
      if (Object.keys(errors).length > 0) {
        console.error('Errores de validación:', errors);
        return;
      }
      // Actualizar el paquete si hay cambios
      if (hasChanges(formik.values, initialValues)) {
        await sendEditPackages(values);
      }
      // Manejar las imágenes
      if (package_.destinyPhotos && Object(package_.destinyPhotos).length === 0) {
        if (!imagenes.some(imagen => imagen === undefined)) {
          await postImages(imagenes);
        }
      } else {
        await Promise.all(
          imagenes.map((imagen, index) => {
            if (imagen !== undefined && package_?.destinyPhotos[index]?.id) {
              return putImageById(package_.destinyPhotos[index].id, imagen);
            }
            return Promise.resolve();
          })
        );
      }
      NotificationService.success('Cambios guardados exitosamente');
      setFormModified(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      NotificationService.error('Error al guardar los cambios');
    } finally {
      setDisabledButton(false);
      setIsFetching(false);
    }
  };

  const sendEditPackages = async (values) => {
    if (!package_?.category?.id) {
      console.error('No se encontró la categoría del paquete');
      return;
    }

    const dataToSend = {
      id: +params.id,
			idCategory: (isNewPackage && Object.keys(isNewPackage).length !== 0) ? isNewPackage?.categoryId : package_.category.id,
      locationInfo: values.locationInfo,
      historyInfo: values.historyInfo,
      activityInfo: values.activityInfo,
    };

    try {
      setIsFetching(true);
      const { data: dataPackage } = await updatePackage(dataToSend);
      
      // Actualizar los valores iniciales después de una actualización exitosa
      setInitialValues({
        locationInfo: values.locationInfo,
        historyInfo: values.historyInfo,
        activityInfo: values.activityInfo,
      });
      
      return dataPackage;
    } catch (error) {
      console.error('Error al actualizar el paquete:', error);
      throw error; // Propagar el error para manejarlo en sendPackages
    } finally {
      setIsFetching(false);
    }
  };

  const postImages = useCallback( async (imgsFiles) => {
    const formData = new FormData();
    formData.append("packageId", +params.id);
    formData.append("imageType", "destinyPhotos");
    imgsFiles.forEach((imagen) => {
      formData.append("files", imagen);
    });
    try {
      setIsFetching(true);
      // Pasar el packageId y formData
      const response = await postImagesPackages(params.id, formData); // Axios devuelve 'data' directamente
        NotificationService.success(`Las imágenes fueron cargadas con éxito`);
    } catch (error) {
        console.error(error);
        NotificationService.error('Error al cargar las imágenes');
    } finally {
      setIsFetching(false);
    }
  }, [])

  const putImageById = useCallback( async (idImg, imgFile) => {
    const formData = new FormData();
    formData.append("imageId", idImg);
    formData.append("image", imgFile); // Archivo
    try {
      setIsFetching(true);
      // Pasar el packageId y formData
      const response = await putImagePackagesById(idImg, formData); // Axios devuelve 'data' directamente
      NotificationService.success(`La imagen con Id #${idImg} fue cargada con éxito`);
      console.log(`La imagen con Id #${idImg} fue cargada con éxito`);
    } catch (error) {
        console.error(error);
        console.log(`Error al cargar la imagen con Id #${idImg}`);
    } finally {
      setIsFetching(false);
    }
  }, [])

  useEffect(() => {
      getPackById(params.id);
  }, []);

    useEffect(() => {
      // Verifica si algún campo ha cambiado comparando con los valores iniciales
      const isModified = hasChanges(formik.values, initialValues);
      setFormModified(isModified);
      if(imagenes.some(imagen => imagen !== undefined)) setFormModified(true);
    }, [formik.values, imagenes]);

  return (
    <Container
      component="main"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
			<PackagesBreadCrumbs step={3} completeSteps={completeSteps}/>
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
                    UBICACIÓN
                  </Typography>
                  <TextField
                    fullWidth
                    id="locationInfo"
                    name="locationInfo"
                    label="Descripción de donde se encuentra"
                    multiline
                    rows={5}
                    value={formik.values.locationInfo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.locationInfo &&
                      Boolean(formik.errors.locationInfo)
                    }
                    helperText={
											(formik.errors.locationInfo ? formik.touched.locationInfo && formik.errors.locationInfo :
											`${formik.values.locationInfo.length} / 1100 caracteres`)
										}
                  />
                </Paper>
                <Paper
                  elevation={3}
                  sx={{ borderRadius: 2, width: "100%", m: 0,  padding: {xs:'1rem', md:'2rem' }  }}
                >
                  <Typography
                    variant="overline"
                    sx={{ mb: 2, fontSize: "1rem", fontWeight: "bold" }}
                  >
                    HISTORIA
                  </Typography>
                  <TextField
                    fullWidth
                    id="historyInfo"
                    name="historyInfo"
                    label="Su historia y lo que lo hace atractivo"
                    multiline
                    rows={5}
                    value={formik.values.historyInfo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.historyInfo &&
                      Boolean(formik.errors.historyInfo)
                    }
                    helperText={
											(formik.errors.historyInfo ? formik.touched.historyInfo && formik.errors.historyInfo :
											`${formik.values.historyInfo.length} / 1100 caracteres`)
										}
                  />
                </Paper>
                <Paper
                  elevation={3}
                  sx={{ borderRadius: 2, width: "100%", m: 0,  padding: {xs:'1rem', md:'2rem' }  }}
                >
                  <Typography
                    variant="overline"
                    sx={{ mb: 2, fontSize: "1rem", fontWeight: "bold" }}
                  >
                    QUÉ ACTIVIDAD PROPONEMOS?
                  </Typography>
                  <TextField
                    fullWidth
                    id="activityInfo"
                    name="activityInfo"
                    label="Cómo es la propuesta de excursión"
                    multiline
                    rows={5}
                    value={formik.values.activityInfo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.activityInfo &&
                      Boolean(formik.errors.activityInfo)
                    }
                    helperText={
											(formik.errors.activityInfo ? formik.touched.activityInfo && formik.errors.activityInfo :
											`${formik.values.activityInfo.length} / 970 caracteres`)
										}
                  />
                </Paper>
              </Box>
              
          </Box>
          <Box sx={{flex:1, display: 'flex', flexDirection:'column', gap:'1rem'}}>
            {/* DER: imagenes y botones*/}

            {/* Imagen 1 */}
            <Paper elevation={3} sx={{ borderRadius: 2, width: '100%', m: 0 }}>
              <Box>
                <Box
                  sx={{
                    height: '250px',
                    backgroundColor: '#747474',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    backgroundImage: `url(${(imagePreview[0] ? imagePreview[0] : "" )})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file1"
                    type="file"
                    onChange={(e) => handleChangeImage(e, 0)}
                  />
                  <label
                    htmlFor="raised-button-file1"
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
                        borderRadius: "4px",
                      }}
                    >
                      Modificar imagen
                    </Button>
                  </label>
                </Box>
              </Box>
            </Paper>
            
            {/* Imagen 2 */}
            <Paper elevation={3} sx={{ borderRadius: 2, width: '100%', m: 0 }}>
              <Box>
                <Box
                  sx={{
                    height: '260px',
                    backgroundColor: '#747474',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    backgroundImage: `url(${(imagePreview[1] ? imagePreview[1] : "" )})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file2"
                    type="file"
                    onChange={(e) => handleChangeImage(e, 1)}
                  />
                  <label
                    htmlFor="raised-button-file2"
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
                        borderRadius: "4px",
                      }}
                    >
                      Modificar imagen
                    </Button>
                  </label>
                </Box>
              </Box>
            </Paper>

            {/* Imagen 3 */}
            <Paper elevation={3} sx={{ borderRadius: 2, width: '100%', m: 0 }}>
              <Box>
                <Box
                  sx={{
                    height: '260px',
                    backgroundColor: '#747474',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    backgroundImage: `url(${(imagePreview[2] ? imagePreview[2] : "" )})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file3"
                    type="file"
                    onChange={(e) => handleChangeImage(e, 2)}
                  />
                  <label
                    htmlFor="raised-button-file3"
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
                        borderRadius: "4px",
                      }}
                    >
                      Modificar imagen
                    </Button>
                  </label>
                </Box>
              </Box>
            </Paper>

            {/* Botones */}
            <Box sx={{display:"flex", justifyContent:"space-between", gap:'1rem'}} >
              <WhiteButton
                isFetching={isFetching}
                disabled={
                  disabledButton ||
                  !formik.isValid ||
                  !formModified ||
                  (isNewPackage && Object.keys(isNewPackage).length !== 0 && !formik.dirty)
                }
                type="button"
                variant="contained"
								onClick={(e) => handleSiguiente(e, false)}
                sx={{width: "100%",}}
                text="Actualizar Paquete"
                fetchingText="Actualizando..."
              />
              <ColorButton
                isFetching={isFetching}
                disabled={
                  disabledButton ||
                  !formik.isValid ||
                  !formModified ||
                  (isNewPackage && Object.keys(isNewPackage).length !== 0 && !formik.dirty)
                }
                type="button"
                variant="contained"
								onClick={(e) => handleSiguiente(e, true)}
                sx={{
                  backgroundColor: "#72CCA0",
                  width: "100%",
                  transition: "transform 0.3s ease-in-out",
                }}
                text={(isNewPackage && Object.keys(isNewPackage).length === 0) ? "Actualizar Paquete" : "Publicar"}
              />
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