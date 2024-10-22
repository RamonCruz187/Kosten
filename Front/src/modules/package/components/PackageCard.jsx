import {Delete, Edit, Label} from "@mui/icons-material";
import Box from "@mui/material/Box";
import {Avatar, Button, Card, Paper, Stack, Tooltip, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {iconsCardPackages} from "../../Departures/utils/utils.jsx";
import {deepOrange} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";

export const PackageCard = ({ package_ }) => {

    const navigate = useNavigate();

    const handleDelete = ( id ) => {
        console.log('Eliminar paquete', id);
    }

    const handleEdit = ( id ) => {
        navigate(`/admin/paquetes/editar/${id}`);
    }

    const renderPunctuation = (
        <Box
            sx={{
                zIndex: 9,
                top: 16,
                right: 0,
                left: 0,
                position: 'absolute',
                textTransform: 'uppercase',
                width: '100%'
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', px: 2 }}>

                    {
                        package_.active ?
                            <Tooltip title={"Disponible"} placement="top">
                                <Label color="success" sx={{ fontSize: '1rem' }} />
                            </Tooltip>
                            :
                            <Tooltip title={"No Disponible"} placement="top">
                                <Label color="disabled" sx={{ fontSize: '1rem' }} />
                            </Tooltip>
                    }

                <Tooltip title={"Puntuación"} placement="top">
                    <Avatar sx={{ bgcolor: deepOrange[500], width: 24, height: 24, fontSize: '.8rem' }} variant="circular" sizes="small">
                        {package_.punctuation}
                    </Avatar>
                </Tooltip>
            </Box>
        </Box>
    );

    const renderImg = (
        <Box
            component="img"
            alt={package_.name}
            src={package_.images.length > 0 && package_.images[0].url }
            sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: 'cover',
                position: 'absolute',
            }}
        />
    );

    return (
        <Card>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                {package_.punctuation && renderPunctuation}

                {renderImg}
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link to={`/paquetes/${package_.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Tooltip title={package_.name} placement="top">
                        <Typography variant="subtitle2" noWrap style={{ color: 'inherit' }}>
                            {package_.name}
                        </Typography>
                    </Tooltip>
                </Link>

                <Paper variant="outlined" sx={{ widt: '100%', p: 1 }} >
                    <Tooltip title={package_.description} placement="top">
                        <Typography variant="body2" noWrap style={{ color: 'inherit' }}>
                            {package_.description}
                        </Typography>
                    </Tooltip>
                </Paper>

                <Box display="flex" alignItems="flex-end" justifyContent="space-between" >
                    <Stack spacing={1} sx={{ display: 'flex', flexDirection: 'column'}}>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>

                            <Tooltip title="Meses" placement="top">
                                <Box sx={{ display: 'flex' }}>
                                    { iconsCardPackages[0] }
                                </Box>
                            </Tooltip>

                            <Typography variant="caption" >
                                {package_.months.length > 0 ? package_.months.map(month => month.name).join(', ') : 'Sin mes especificado'}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>

                            <Tooltip title="Duración" placement="top">
                                <Box sx={{ display: 'flex' }}>
                                    { iconsCardPackages[1] }
                                </Box>
                            </Tooltip>

                            <Typography variant="caption" >
                                {package_.duration}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>

                            <Tooltip title="Nivel físico" placement="top">
                                <Box sx={{ display: 'flex' }}>
                                    { iconsCardPackages[2] }
                                </Box>
                            </Tooltip>

                            <Typography variant="caption" >
                                {package_.physical_level}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                            <Tooltip title="Nivel técnico" placement="top">
                                <Box sx={{ display: 'flex' }}>
                                    { iconsCardPackages[3] }
                                </Box>
                            </Tooltip>

                            <Typography variant="caption" >
                                {package_.technical_level}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                            <Tooltip title="Servicios incluidos" placement="top">
                                <Box sx={{ display: 'flex' }}>
                                    { iconsCardPackages[4] }
                                </Box>
                            </Tooltip>

                            <Typography variant="caption" >
                                {package_.included_services}
                            </Typography>
                        </Box>

                    </Stack>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Eliminar paquete" placement="top">
                            <IconButton size="small" variant="contained" color="error" onClick={ () => handleDelete(package_.id) }>
                                <Delete />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Editar paquete" placement="top">
                            <IconButton size="small" variant="contained" color="success" onClick={ () => handleEdit(package_.id) }>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Stack>
        </Card>
    );
}