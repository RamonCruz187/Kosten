import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import {Button, Typography} from "@mui/material";
import {_price, _departureInfo, _departureNames} from "../../Departures/mock/_data.js";
import Divider from "@mui/material/Divider";
import AppAppBar from "../../../shared/components/AppAppBar.jsx";
import {iconsCardDepartures} from "../../Departures/utils/utils.jsx";
import {fCurrency} from "../../../shared/utils/formatNumber.js";
import NavBar from "../../../components/Home/NavBar.jsx";

export const PackageFull = () => {

    const [id, setId] = useState(null);
    const [img, setImg] = useState(null);

    const params = useParams();

    const renderPrice =(package_) => (
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

    useEffect(() => {
        setId(params.id.charAt(params.id.length - 1));
    }, []);

    useEffect(() => {

        if(id) {
            const img = `/images/paquetes/paquete-${Number(id) + 1}.jpg`;
            setImg(img);
        }

    }, [id]);

    return (id && img) && (<>
        <NavBar />
        <Box
            sx={{
                mt: 1,
                display: {xs: 'flex'},
                flexDirection: {xs: 'column', lg: 'row'},
                justifyContent: {xs: 'flex-end', lg: 'center'},
                // alignItems: {lg: 'center'},
                width: '100%',
                height: {
                    xs: 390, //phones 300
                    sm: 400, //tablets 600
                    md: 420, //small laptop 900
                    lg: 440, //desktop 1024
                    xl: 550, //large screens 1536
                    // xxl: 560 //large desktop 1600
                },
                backgroundImage: `url(${img})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    display: {xs: "none", lg: 'flex'},
                    width: {lg: '30%'},
                    height: {lg: 'auto'},
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: {lg: '70%'},
                        height: {lg: '90%'},
                        backgroundImage: `url(${img})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: {lg: '10px'},
                    }}
                >
                </Box>
            </Box>
            <Box
                sx={{
                    backgroundColor: 'rgba(0,0,0,.6)',
                    color: 'white',
                    p: 1,
                    width: {lg: '70%'},
                    display: {lg: 'flex'},
                    flexDirection: {lg: 'column'},
                    height: {lg: '70%'},
                    position: {lg: 'relative'},
                    top: {lg: '50%'},
                    transform: {lg: 'translateY(-50%)'},
                    borderRadius: {lg: '10px'},
                    backdropFilter: {lg: 'blur(3px)'},
                    overflow: {lg: 'hidden'},
                    overflowY: {lg: 'auto'},
                    paddingRight: {lg: '1rem'},
                }}
            >
                <Typography
                    fontWeight='500'
                    sx={{ mb: 2, fontSize: {xs: "1rem", sm: '1.5rem', md: '2rem'} }}
                >
                    {_departureNames( Number(id) + 1)}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex' }}>
                            { iconsCardDepartures[0] }
                        </Box>
                        <Typography
                            sx={{ fontSize: {xs: ".6rem", sm: '.8rem', md: '1rem'} }}
                        >
                            {_departureInfo(Number(id) + 1).date}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex' }}>
                            { iconsCardDepartures[1] }
                        </Box>
                        <Typography
                            sx={{ fontSize: {xs: ".6rem", sm: '.8rem', md: '1rem'} }}
                        >
                            {_departureInfo(Number(id) + 1).days}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex' }}>
                            { iconsCardDepartures[2] }
                        </Box>
                        <Typography
                            sx={{ fontSize: {xs: ".6rem", sm: '.8rem', md: '1rem'} }}
                        >
                            {_departureInfo(Number(id) + 1).physicLvl}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex' }}>
                            { iconsCardDepartures[3] }
                        </Box>
                        <Typography
                            sx={{ fontSize: {xs: ".6rem", sm: '.8rem', md: '1rem'} }}
                        >
                            {_departureInfo(Number(id) + 1).technicalLvl}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: 1,
                    }}
                >

                    <Typography variant="h6" sx={{ fontWeight: 'bold'}}>
                        ${_price(Number(id) + 1).toFixed(2)}
                    </Typography>

                    <Button variant="contained" size="small" color="primary">
                        Reservar
                    </Button>
                </Box>
            </Box>
        </Box>
    </>)
}