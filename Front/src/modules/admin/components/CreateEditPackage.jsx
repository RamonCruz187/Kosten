import { useState } from 'react';
import {
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Box
} from '@mui/material';

const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const niveles = ['Fácil', 'Moderado', 'Difícil', 'Muy difícil'];

export const CreateEditPackage = () => {
    const [paquete, setPaquete] = useState({
        name: '',
        description: '',
        punctuation: '',
        duration: '',
        itinerary: '',
        physical_level: '',
        technical_level: '',
        included_services: '',
        all_months: [],
    });
    const [imagenes, setImagenes] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPaquete(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleMesesChange = (event) => {
        const { value } = event.target;
        setPaquete(prevState => ({
            ...prevState,
            all_months: value
        }));
    };

    const handleImagenChange = (event) => {
        setImagenes(Array.from(event.target.files));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('packageData', JSON.stringify(paquete));
        imagenes.forEach((imagen, index) => {
            formData.append(`filesImages`, imagen);
        });

        // Aquí iría la lógica para enviar formData al backend
        console.log('Datos del formulario:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid xs={12} sm={6} item>
                    <TextField
                        fullWidth
                        label="Nombre"
                        name="name"
                        value={paquete.name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid xs={12} sm={6} item>
                    <TextField
                        fullWidth
                        label="Descripción"
                        name="description"
                        value={paquete.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                    />
                </Grid>
                <Grid xs={12} sm={6} item>
                    <TextField
                        fullWidth
                        label="Puntuación"
                        name="punctuation"
                        type="number"
                        value={paquete.punctuation}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid xs={12} sm={6} item>
                    <TextField
                        fullWidth
                        label="Duración"
                        name="duration"
                        value={paquete.duration}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid xs={12} item>
                    <TextField
                        fullWidth
                        label="Itinerario"
                        name="itinerary"
                        value={paquete.itinerary}
                        onChange={handleChange}
                        multiline
                        rows={4}
                    />
                </Grid>
                <Grid xs={12} sm={6} item>
                    <FormControl fullWidth>
                        <InputLabel>Nivel físico</InputLabel>
                        <Select
                            name="physical_level"
                            value={paquete.physical_level}
                            onChange={handleChange}
                        >
                            {niveles.map((nivel) => (
                                <MenuItem key={nivel} value={nivel}>{nivel}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                    <FormControl fullWidth>
                        <InputLabel>Nivel técnico</InputLabel>
                        <Select
                            name="technical_level"
                            value={paquete.technical_level}
                            onChange={handleChange}
                        >
                            {niveles.map((nivel) => (
                                <MenuItem key={nivel} value={nivel}>{nivel}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} item>
                    <TextField
                        fullWidth
                        label="Servicios incluidos"
                        name="included_services"
                        value={paquete.included_services}
                        onChange={handleChange}
                        multiline
                        rows={4}
                    />
                </Grid>
                <Grid xs={12} item>
                    <FormControl fullWidth>
                        <InputLabel>Meses disponibles</InputLabel>
                        <Select
                            multiple
                            name="all_months"
                            value={paquete.all_months}
                            onChange={handleMesesChange}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={meses[value - 1]} />
                                    ))}
                                </Box>
                            )}
                        >
                            {meses.map((mes, index) => (
                                <MenuItem key={mes} value={index + 1}>
                                    {mes}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} item>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={handleImagenChange}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" component="span">
                            Subir imágenes
                        </Button>
                    </label>
                    <Box mt={2}>
                        {imagenes.map((imagen, index) => (
                            <Chip key={index} label={imagen.name} onDelete={() => {
                                const newImagenes = [...imagenes];
                                newImagenes.splice(index, 1);
                                setImagenes(newImagenes);
                            }} />
                        ))}
                    </Box>
                </Grid>
                <Grid xs={12} item container justifyContent="flex-end" spacing={2}>
                    <Grid item>
                        <Button variant="outlined" color="secondary">
                            Cancelar
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" color="primary">
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};