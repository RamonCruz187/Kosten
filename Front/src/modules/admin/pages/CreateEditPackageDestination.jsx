// @modules/admin/pages/CreateEditPackage.jsx
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
  createPackage,
  getPackageById,
  updatePackage,
} from "@api/packageApi.js";
import { RiEditLine } from 'react-icons/ri';

import { useNavigate, useParams } from "react-router-dom";
import { NotificationService } from "@shared/services/notistack.service.jsx";
import { PackagesBreadCrumbs } from "../components/PackagesBreadCrumbs";

const niveles = [
  "Principiante",
  "Intermedio",
  "Intermedio-Avanzado",
  "Avanzado",
];

const paqueteSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  description: Yup.string().required("La descripción es requerida"),
  punctuation: Yup.number().min(0).max(10),
  all_months: Yup.array().of(Yup.number()).min(1, "Selecciona al menos un mes"),
});

export const CreateEditPackageDestination = () => {
  const [disabledButton, setDisabledButton] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [package_, setPackage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [packageValues, setPackageValues] = useState({
    name: "",
    description: "",
    punctuation: "",
    duration: "",
    itinerary: "",
    physical_level: "",
    technical_level: "",
    included_services: "",
    all_months: [],
    state: "",
    region: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  const getPackById = useCallback(
    async (id) => {
      try {
        const { data: dataPackages } = await getPackageById(id);
        setPackage(dataPackages.data);
        setPackageValues({
          name: dataPackages.data.name,
          description: dataPackages.data.description,
          punctuation: dataPackages.data.punctuation,
          duration: dataPackages.data.duration,
          itinerary: dataPackages.data.itinerary,
          physical_level: dataPackages.data.physical_level,
          technical_level: dataPackages.data.technical_level,
          included_services: dataPackages.data.included_services,
          all_months: dataPackages.data.months.map((month) => month.name),
          state: dataPackages.data.state || "Activo",
          region: dataPackages.data.region || "Costa",
        });
      } catch (error) {
        console.error("Error al obtener los departures: ", error);
      }
    },
    [setPackage, setPackageValues]
  );

  const requestPackages = useCallback(
    async (values) => {
      console.log("Valores del formulario: ", values);
      setDisabledButton(true);

      const formData = new FormData();
      formData.append(
        "packageData",
        new Blob([JSON.stringify(values)], { type: "application/json" })
      );
      imagenes.forEach((imagen) => {
        formData.append("filesImages", imagen, imagen.name);
      });

      if (imagenes.length === 0)
        formData.append(
          "filesImages",
          new Blob([JSON.stringify([])], { type: "application/json" }),
          "[]"
        );

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

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
      name: packageValues.name,
      description: packageValues.description,
      punctuation: packageValues.punctuation,
      duration: packageValues.duration,
      itinerary: packageValues.itinerary,
      physical_level: packageValues.physical_level,
      technical_level: packageValues.technical_level,
      included_services: packageValues.included_services,
      state: packageValues.state || "Activo",
      region: packageValues.region || "",
    },
    enableReinitialize: true,
    validationSchema: paqueteSchema,
    onSubmit: (values) => {
      requestPackages(values);
    },
  });

  const handleImageTitle = (event) => {
    const file = event.target.files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }

    if (imagenes.length > 0) {
      const newImagenes = [...imagenes];
      newImagenes[0] = file;
      setImagenes(newImagenes);
      return;
    }

    setImagenes([file]);
  };

  const handleClearForm = () => {
    formik.resetForm();
    setImagenes([]);
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
			<PackagesBreadCrumbs step={3} />
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
                    id="description"
                    name="description"
                    label="Descripción de donde se encuentra"
                    multiline
                    rows={5}
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
                    id="itinerary"
                    name="itinerary"
                    label="Su historia y lo que lo hace atractivo"
                    multiline
                    rows={5}
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
                    id="itinerary"
                    name="itinerary"
                    label="Cómo es la propuesta de excursión"
                    multiline
                    rows={5}
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
                    backgroundImage: `url(${imagePreview || (package_ && package_.images.length > 0 ? package_.images[0].url : '')})`,
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
                    backgroundImage: `url(${imagePreview || (package_ && package_.images.length > 0 ? package_.images[0].url : '')})`,
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
                    backgroundImage: `url(${imagePreview || (package_ && package_.images.length > 0 ? package_.images[0].url : '')})`,
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
              </Box>
            </Paper>

            {/* Botones */}
            <Box sx={{display:"flex", justifyContent:"space-between", gap:'1rem'}} >
              <Button
                type="button"
                variant="contained"
                onClick={handleClearForm}
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
                // type="submit"
                type="button"
                onClick={() => navigate("/admin/paquetes/destinos")}
                sx={{
                  backgroundColor: "#72CCA0",
                  width: "100%",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                {params.id ? "Actualizar Paquete" : "Publicar"}
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