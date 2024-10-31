import { Label } from "@mui/icons-material";
import Box from "@mui/material/Box";
import {Button, Card, Stack, Typography} from "@mui/material";
import {fCurrency} from "../../../shared/utils/formatNumber.js";
import {Link} from "react-router-dom";
import {iconsCardDepartures, iconsCardPackages} from "../utils/utils.jsx";

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
                width: 371,
                height: 200,
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
        <Card sx={{ width: 371, height: 407, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative' }}>
        {departure_.status && renderStatus}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3, flexGrow: 1, justifyContent: 'end' }}>
                <Link to={`/salidas/${departure_.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="subtitle2" noWrap style={{ color: 'inherit' }}>
                        {departure_.name}
                    </Typography>
                </Link>

                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Stack spacing={1} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex' }}>
                                { iconsCardPackages[0] }
                            </Box>
                            <Typography variant="caption" >
                                {departure_.info.date}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex' }}>
                                { iconsCardPackages[1] }
                            </Box>
                            <Typography variant="caption" >
                                {departure_.info.days}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex' }}>
                                { iconsCardPackages[2] }
                            </Box>
                            <Typography variant="caption" >
                                {departure_.info.physicLvl}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex' }}>
                                { iconsCardPackages[3] }
                            </Box>
                            <Typography variant="caption" noWrap >
                                {departure_.info.technicalLvl}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex' }}>
                                { iconsCardPackages[4] }
                            </Box>
                            <Typography variant="caption" >
                                {departure_.included_services}
                            </Typography>
                        </Box>

                    </Stack>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>

                         {renderPrice}

                        <Button variant="contained" size="small" color="brownButton">
                            Reservar
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </Card>
    );
}