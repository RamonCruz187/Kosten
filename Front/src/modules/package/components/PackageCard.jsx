import { Label } from "@mui/icons-material";
import Box from "@mui/material/Box";
import {Button, Card, Stack, Typography} from "@mui/material";
import {fCurrency} from "../../../shared/utils/formatNumber.js";
import {Link} from "react-router-dom";
import {iconsCardPackages} from "../utils/utils.jsx";

export const PackageCard = ({ package_ }) => {

    const { status } = package_

    const renderStatus = (
        <Label
            variant="inverted"
            color={( status === 'sale' && 'error') || 'info' }
            sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase',
            }}
        >
            {package_.status}
        </Label>
    );

    const renderImg = (
        <Box
            component="img"
            alt={package_.name}
            src={package_.coverUrl}
            sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: 'cover',
                position: 'absolute',
            }}
        />
    );

    const renderPrice = (
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>
            <Typography
                component="span"
                variant="body1"
                sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through',
                }}
            >
                {package_.priceSale && fCurrency(package_.priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(package_.price)}
        </Typography>
    );

    return (
        <Card>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                {package_.status && renderStatus}

                {renderImg}
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link to={`/paquetes/${package_.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="subtitle2" noWrap style={{ color: 'inherit' }}>
                        {package_.name}
                    </Typography>
                </Link>

                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Stack spacing={1} sx={{ display: 'flex', flexDirection: 'column'}}>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex' }}>
                                { iconsCardPackages[0] }
                            </Box>
                            <Typography variant="caption" >
                                {package_.info.date}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex' }}>
                                { iconsCardPackages[1] }
                            </Box>
                            <Typography variant="caption" >
                                {package_.info.days}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex' }}>
                                { iconsCardPackages[2] }
                            </Box>
                            <Typography variant="caption" >
                                {package_.info.physicLvl}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex' }}>
                                { iconsCardPackages[3] }
                            </Box>
                            <Typography variant="caption" >
                                {package_.info.technicalLvl}
                            </Typography>
                        </Box>

                    </Stack>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>

                         {renderPrice}

                        <Button variant="contained" size="small" color="primary">
                            Reservar
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </Card>
    );
}