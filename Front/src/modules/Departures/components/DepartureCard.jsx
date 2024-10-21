import { Label } from "@mui/icons-material";
import Box from "@mui/material/Box";
import {Button, Card, Stack, Typography} from "@mui/material";
import {fCurrency} from "../../../shared/utils/formatNumber.js";
import {Link} from "react-router-dom";
import {iconsCardDepartures} from "../utils/utils.jsx";

export const DepartureCard = ({ departure_ }) => {

    const { status } = departure_

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
            {departure_.status}
        </Label>
    );

    const renderImg = (
        <Box
            component="img"
            alt={departure_.name}
            src={departure_.coverUrl}
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
                {departure_.priceSale && fCurrency(departure_.priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(departure_.price)}
        </Typography>
    );

    return (
        <Card>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                {departure_.status && renderStatus}

                {renderImg}
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link to={`/salidas/${departure_.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="subtitle2" noWrap style={{ color: 'inherit' }}>
                        {departure_.name}
                    </Typography>
                </Link>

                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Stack spacing={1} sx={{ display: 'flex', flexDirection: 'column'}}>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex' }}>
                                { iconsCardDepartures[0] }
                            </Box>
                            <Typography variant="caption" >
                                {departure_.info.date}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex' }}>
                                { iconsCardDepartures[1] }
                            </Box>
                            <Typography variant="caption" >
                                {departure_.info.days}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex' }}>
                                { iconsCardDepartures[2] }
                            </Box>
                            <Typography variant="caption" >
                                {departure_.info.physicLvl}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex' }}>
                                { iconsCardDepartures[3] }
                            </Box>
                            <Typography variant="caption" >
                                {departure_.info.technicalLvl}
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