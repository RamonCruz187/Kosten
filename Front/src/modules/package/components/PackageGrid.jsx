import Grid from '@mui/material/Grid2';
import { _departures } from "../../Departures/mock/_data.js";
import {PackageCard} from "./PackageCard.jsx";
import {Alert, AlertTitle, CircularProgress, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {usePackages} from "../../../shared/hooks/usePackages.jsx";
import {useCallback, useEffect, useState} from "react";
import {getAllPackages, getPackageById} from "../../../api/packageApi.js";
import {NotificationService} from "../../../shared/services/notistack.service.jsx";

export const PackageGrid = ({ title }) => {

    const [isFetching, setIsFetching] = useState(true);
    const [paginatedData, setPaginatedData] = useState(null);
    const { packages, setPackages } = usePackages();

    const fetchPackages = useCallback( async () => {

        try {
            const { data } = await getAllPackages();
            console.log(data);
            setPackages( data.data ? data.data.content : [] );
            setPaginatedData( data.data );

        } catch (error) {
            console.error(error);
            NotificationService.error('Error al cargar los paquetes');
        } finally {
            setIsFetching(false);
        }


    }, [])

    useEffect(() => {

        if( isFetching ) {
            fetchPackages();
        }

    }, [ fetchPackages, isFetching ]);

    if( isFetching ) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50dvh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return !isFetching && packages.length > 0 ? (
        <Box>
            <Typography variant='h6' gutterBottom sx={{ textAlign: 'center', mb: '2rem', color: '#F3F3F3', fontFamily: 'Oswald', fontWeight: 'regular', fontSize: '24px' }}>
                { title }
            </Typography>
            <Grid container spacing={3}>
                {
                    packages.map( ( item ) => (
                        <Grid key={item.id} size={{ xs: 12, sm: 4 }} >
                            <PackageCard package_={ item } setIsFetching={ setIsFetching } />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30dvh',  }}>
            <Alert severity="info" sx={{ width: '100%' }}>
                <AlertTitle>Sin paquetes</AlertTitle>
                No hay paquetes para mostrar.
            </Alert>
        </Box>
    )

}