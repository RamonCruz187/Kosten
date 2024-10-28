import React, {useState, useCallback, useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Typography, CardMedia, Card, Paper
} from '@mui/material';
import {createPackage, getPackageById, updatePackage} from "../../../api/packageApi.js";
import Container from "@mui/material/Container";
import {useNavigate, useParams} from "react-router-dom";
import {NotificationService} from "../../../shared/services/notistack.service.jsx";
import {Edit} from "@mui/icons-material";

const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const states = ['Activo', 'Inactivo'];
const regions = ['Costa', 'Sierras', 'Cuyo', 'Norte', 'Litoral', 'Patagonia', 'Central'];

const niveles = ['Principiante', 'Intermedio', 'Intermedio-Avanzado', 'Avanzado'];

const paqueteSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    description: Yup.string().required('La descripción es requerida'),
    punctuation: Yup.number().min(0).max(10),
    all_months: Yup.array().of(Yup.number()).min(1, 'Selecciona al menos un mes'),
});

export const CreateEditPackage = () => {

    const [disabledButton, setDisabledButton] = useState(false);
    const [imagenes, setImagenes] = useState([]);
    const [package_, setPackage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [packageValues, setPackageValues] = useState(
        {
            name: '',
            description: '',
            punctuation: '',
            duration: '',
            itinerary: '',
            physical_level: '',
            technical_level: '',
            included_services: '',
            all_months: [],
            state: '',
            region: '',
        }
    );

    const params = useParams();
    const navigate = useNavigate();

    const getPackById = useCallback(async ( id ) => {
        try {
            const { data: dataPackages } = await getPackageById( id );
            setPackage( dataPackages.data );
            setPackageValues({
                name: dataPackages.data.name,
                description: dataPackages.data.description,
                punctuation: dataPackages.data.punctuation,
                duration: dataPackages.data.duration,
                itinerary: dataPackages.data.itinerary,
                physical_level: dataPackages.data.physical_level,
                technical_level: dataPackages.data.technical_level,
                included_services: dataPackages.data.included_services,
                all_months: dataPackages.data.months.map(month => month.name),
                state: dataPackages.data.state || 'Activo',
                region: dataPackages.data.region || 'Costa',
            });
        } catch (error) {
            console.error('Error al obtener los departures: ', error);
        }
    }, [setPackage, setPackageValues]);

    const requestPackages = useCallback(async (values) => {
        console.log('Valores del formulario: ', values);
        setDisabledButton(true);

        const formData = new FormData();
        formData.append('packageData', new Blob([JSON.stringify(values)], { type: 'application/json' }));
        imagenes.forEach((imagen) => {
            formData.append('filesImages', imagen, imagen.name);
        });

        if( imagenes.length === 0 )
            formData.append('filesImages', new Blob([JSON.stringify([])], { type: 'application/json' }), '[]');

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const { data: dataPackage } = params.id ? await updatePackage(formData) : await createPackage(formData);

            console.log('Respuesta del backend: ', dataPackage);
            NotificationService.success(params.id ? 'Paquete actualizado exitosamente' : 'Paquete creado exitosamente', 1000);
            navigate('/admin/paquetes');

        } catch (error) {
            console.error(params.id ? 'Error al actualizar el paquete' : 'Error al crear el paquete', error.response);
            NotificationService.error(params.id ? 'Error al actualizar el paquete' : 'Error al crear el paquete', 2200);
        } finally {
            setDisabledButton(false);
        }
    }, [ imagenes ]);

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
            all_months: packageValues.all_months.map(mes => meses.indexOf(mes)),
            state: packageValues.state || 'Activo',
            region: packageValues.region || 'Costa',
        },
        enableReinitialize: true,
        validationSchema: paqueteSchema,
        onSubmit: (values) => {
            requestPackages(values);
        },
    });

    const handleImageChange = (event) => {
        setImagenes( prev => [...prev, ...event.target.files]);
    };

    const handleImageTitle = (event) => {

        const file = event.target.files[0];

        if( file ) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }

         if( imagenes.length > 0 ) {
            const newImagenes = [...imagenes];
            newImagenes[0] = file;
            setImagenes(newImagenes);
            return;
         }

            setImagenes([file]);
    }

    const handleClearForm = () => {
        formik.resetForm();
        setImagenes([]);
    };

    useEffect(() => {
        if (params.id) {
            getPackById(params.id);
        }
    }, [ params.id, getPackById ]);

    useEffect(() => {

        if( imagenes.length > 0 ) {
            const previewUrl = URL.createObjectURL(imagenes[0]);
            setImagePreview(previewUrl);
        }

    }, [imagenes]);

    return (
        <Container component="main" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} >

            <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 2 }}>
                {/*Grid container principal*/}
                <Grid container spacing={4}>

                    {/*Disponibilidad, ubicacion y boton guardar*/}
                    <Grid item xs={12} >
                        <Paper elevation={3} sx={{ p: 2, borderRadius: 2, width: '100%' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={4} >
                                    <Typography variant="overline" sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold' }}>Disponibilidad del paquete</Typography>
                                    <FormControl fullWidth error={formik.touched.state && Boolean(formik.errors.state)}>
                                        <InputLabel id="state-label">Estado</InputLabel>
                                        <Select
                                            labelId="state-label"
                                            id="state"
                                            name="state"
                                            value={ formik.values.state }
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            variant="outlined"
                                        >
                                            {states.map((state) => (
                                                <MenuItem key={state} value={state}>{state}</MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.state && formik.errors.state && (
                                            <Typography variant="caption" color="error">{formik.errors.state}</Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4} >
                                    <Typography variant="overline" sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold' }}>Ubicación</Typography>
                                    <FormControl fullWidth error={formik.touched.region && Boolean(formik.errors.region)}>
                                        <InputLabel id="region-label">Región</InputLabel>
                                        <Select
                                            labelId="region-label"
                                            id="region"
                                            name="region"
                                            value={ formik.values.region }
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            variant="outlined"
                                        >
                                            {regions.map((region) => (
                                                <MenuItem key={region} value={region}>{region}</MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.state && formik.errors.state && (
                                            <Typography variant="caption" color="error">{formik.errors.state}</Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4} >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            height: '100%',
                                            px: 3,
                                        }}
                                    >
                                        <Button
                                            className="hover__transform"
                                            variant="contained"
                                            disabled={disabledButton}
                                            type="submit"
                                            sx={{
                                                backgroundColor: '#005538',
                                                color: '#fff',
                                                width: '100%',
                                                transition: 'transform 0.3s ease-in-out'
                                            }}
                                        >
                                            {
                                                params.id ? 'Actualizar' : 'Crear Paquete'
                                            }
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/*Imagen y titulo*/}
                    <Grid item xs={12} >
                        <Paper elevation={3} sx={{ borderRadius: 2, width: '100%', m: 0 }}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} >
                                    <Box
                                        sx={{
                                            height: '180px',
                                            backgroundColor: '#747474',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: "flex-end",
                                            position: 'relative',
                                            backgroundImage: `url(${
                                                imagePreview ||
                                                (package_ && package_.images.length > 0 ? package_.images[0].url : '')
                                            })`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    >
                                        {
                                            <Typography variant="body1" sx={{color: '#fff', pb: 4, fontSize: '2.5rem', fontWeight: 'bold'}}>
                                                {formik.values.name || packageValues.name || 'Título del paquete'}
                                            </Typography>
                                        }

                                        {/*Modificar imagen button*/}
                                        <input
                                            accept="image/*"
                                            style={{display: 'none'}}
                                            id="raised-button-file"
                                            type="file"
                                            onChange={handleImageTitle}
                                        />
                                        <label htmlFor="raised-button-file"
                                                  style={{position: 'absolute', left: 10, top: 10 }}
                                        >
                                            <Button startIcon={<Edit/>} className="hover__transform" variant="contained" component="span"
                                                    sx={{transition: 'transform 0.3s ease-in-out', bgcolor: 'var(--color-links)'}}>
                                                Modificar imagen
                                            </Button>
                                        </label>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sx={{p: 2}}>
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
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/*De que se trata e informacion importante*/}
                    <Grid item xs={12} >
                        <Grid container spacing={2}>
                            <Grid sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} item xs={8} >
                                <Paper elevation={3} sx={{ borderRadius: 2, width: '100%', m: 0, p: 2 }}>
                                    <Typography variant="overline" sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold' }}>De qué se trata</Typography>
                                    <TextField
                                        fullWidth
                                        id="description"
                                        name="description"
                                        label="De qué se trata la salida?"
                                        multiline
                                        rows={4}
                                        value={ formik.values.description }
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                    />
                                </Paper>
                                <Paper elevation={3} sx={{ borderRadius: 2, width: '100%', m: 0, p: 2 }}>
                                    <Typography variant="overline" sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold' }}>Itinerario</Typography>
                                    <TextField
                                        fullWidth
                                        id="itinerary"
                                        name="itinerary"
                                        label="Qué actividades se hacen este día?"
                                        multiline
                                        rows={9}
                                        value={ formik.values.itinerary }
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.itinerary && Boolean(formik.errors.itinerary)}
                                        helperText={formik.touched.itinerary && formik.errors.itinerary}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={4} >
                                <Paper elevation={3} sx={{ borderRadius: 2, width: '100%', m: 0, p: 2 }}>
                                    <Typography variant="overline" sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold' }}>Información importante</Typography>
                                    <TextField
                                        fullWidth
                                        id="duration"
                                        name="duration"
                                        label="Duración de salida"
                                        value={ formik.values.duration }
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.duration && Boolean(formik.errors.duration)}
                                        helperText={formik.touched.duration && formik.errors.duration}
                                    />
                                    <FormControl sx={{ mt: 2 }} fullWidth error={formik.touched.physical_level && Boolean(formik.errors.physical_level)}>
                                        <InputLabel id="physical-level-label">Nivel físico</InputLabel>
                                        <Select
                                            labelId="physical-level-label"
                                            id="physical_level"
                                            name="physical_level"
                                            value={ formik.values.physical_level }
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            variant="outlined"
                                        >
                                            {niveles.map((nivel) => (
                                                <MenuItem key={nivel} value={nivel}>{nivel}</MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.physical_level && formik.errors.physical_level && (
                                            <Typography variant="caption" color="error">{formik.errors.physical_level}</Typography>
                                        )}
                                    </FormControl>
                                    <FormControl sx={{ mt: 2 }} fullWidth error={formik.touched.technical_level && Boolean(formik.errors.technical_level)}>
                                        <InputLabel id="technical-level-label">Nivel técnico</InputLabel>
                                        <Select
                                            labelId="technical-level-label"
                                            id="technical_level"
                                            name="technical_level"
                                            value={ formik.values.technical_level }
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            variant="outlined"
                                        >
                                            {niveles.map((nivel) => (
                                                <MenuItem key={nivel} value={nivel}>{nivel}</MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.technical_level && formik.errors.technical_level && (
                                            <Typography variant="caption" color="error">{formik.errors.technical_level}</Typography>
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
                                        value={ formik.values.included_services }
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.included_services && Boolean(formik.errors.included_services)}
                                        helperText={formik.touched.included_services && formik.errors.included_services}
                                    />
                                    <TextField
                                        sx={{ mt: 2 }}
                                        fullWidth
                                        id="punctuation"
                                        name="punctuation"
                                        label="Puntuación"
                                        type="number"
                                        value={ formik.values.punctuation }
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.punctuation && Boolean(formik.errors.punctuation)}
                                        helperText={formik.touched.punctuation && formik.errors.punctuation}
                                    />
                                    <FormControl sx={{ mt: 2 }} fullWidth error={formik.touched.all_months && Boolean(formik.errors.all_months)}>
                                        <InputLabel id="all-months-label">Meses disponibles</InputLabel>
                                        <Select
                                            labelId="all-months-label"
                                            id="all_months"
                                            name="all_months"
                                            multiple
                                            value={ formik.values.all_months }
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            variant="outlined"
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={meses[value]} />
                                                    ))}
                                                </Box>
                                            )}
                                        >
                                            {meses.map((mes, index) => (
                                                <MenuItem key={mes} value={index}>
                                                    {mes}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.all_months && formik.errors.all_months && (
                                            <Typography variant="caption" color="error">{formik.errors.all_months}</Typography>
                                        )}
                                    </FormControl>
                                </Paper>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', }}>
                        <Box sx={{ minWidth: '40%', }}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="multiple-images-input"
                                multiple
                                type="file"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="multiple-images-input">
                                <Button className="hover__transform" variant="contained" component="span" sx={{ transition: 'transform 0.3s ease-in-out' }}>
                                    Subir imágenes
                                </Button>
                            </label>
                            <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, minHeight: '40px', overflow: 'hidden', overflowY: 'auto' }}>
                                {imagenes.map((imagen, index) => (
                                    <Chip
                                        key={index}
                                        label={imagen.name}
                                        onDelete={() => {
                                            const newImagenes = [...imagenes];
                                            newImagenes.splice(index, 1);
                                            setImagenes(newImagenes);
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                        <Box sx={{ minWidth: '60%', display: 'flex', flexWrap: 'wrap', gap: 2, minHeight: '40px', overflow: 'hidden', overflowY: 'auto' }}>
                            {
                                package_ && package_.images.length > 0 && (
                                    package_.images.map(( img ) => (
                                        <Card sx={{ maxWidth: 150 }} key={img.id}>
                                            <CardMedia
                                                component="img"
                                                height="auto"
                                                image={img.url}
                                                alt={img.url}
                                            />
                                        </Card>
                                    ))
                                )
                            }
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={5} display="flex" justifyContent="space-between">
                    <Button
                        type="button"
                        variant="outlined"
                        className="hover__transform"
                        onClick={handleClearForm}
                        sx={{ width: '100%', mx: '5rem', transition: 'transform 0.3s ease-in-out' }}
                    >
                        Limpiar
                    </Button>
                    <Button
                        className="hover__transform"
                        variant="contained"
                        disabled={disabledButton}
                        type="submit"
                        sx={{
                            backgroundColor: '#005538',
                            color: '#fff',
                            width: '100%',
                            transition: 'transform 0.3s ease-in-out'
                        }}
                    >
                        {
                            params.id ? 'Actualizar' : 'Crear Paquete'
                        }
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};