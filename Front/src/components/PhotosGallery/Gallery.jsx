import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import NavBar from "../Home/NavBar";
import Footer from "../Home/Footer";
import { getAllPackages } from "../../api/packageApi";

import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close"; 
import { useRef } from "react";


export function Gallery() {
    const [images, setImages] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [open, setOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageWidth, setImageWidth] = useState(0);
    const imageRef = useRef(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("https://kostentours-api-10061c08f8f8.herokuapp.com/images/all");
                const result = await response.json();
                
                if (!result.isError && Array.isArray(result.data)) {
                    const imageUrls = result.data.map(item => item.url);
                    setImages(imageUrls);
                } else {
                    console.error("Error en la respuesta del servidor:", result.message);
                }
            } catch (error) {
                console.error("Error al obtener imágenes:", error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchImages();
    }, []);
    
    const handleImageLoad = () => {
        if (imageRef.current) {
            const width = imageRef.current.offsetWidth;
            setImageWidth(width);
        }
    };

    const handleOpen = (index) => {
        setCurrentImageIndex(index);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };



    if (isFetching) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <NavBar />
            {images.length > 0 ? (
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", p: 2 }}>
                    <Grid container spacing={2} sx={{ maxWidth: "90%", mx: "auto" }}>
                        {images.map((img, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: "100%",
                                        paddingTop: "100%",
                                        overflow: "hidden",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => handleOpen(index)}
                                >
                                    <Box
                                        component="img"
                                        src={img}
                                        alt={`Paquete ${index + 1}`}
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover"
                                        }}
                                    />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                    <Alert severity="info" sx={{ width: '100%' }}>
                        <AlertTitle>Sin paquetes</AlertTitle>
                        No hay paquetes para mostrar.
                    </Alert>
                </Box>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-slider"
                aria-describedby="modal-gallery-slider"
                BackdropProps={{
                    style: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)'
                    }
                }}
            >
                <Box
                    sx={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        height: "90%",
                        bgcolor: "transparent",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        outline: "none",
                        borderRadius: 2
                    }}
                >
                    <IconButton
                        onClick={handleClose}
                        sx={{ position: "absolute", top: "10px", right: "10px", color: "white" }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <IconButton
                        onClick={handlePrev}
                        sx={{ position: "absolute", left: "2%", color: "white" }}
                    >
                        <ArrowBackIosIcon fontSize="large" />
                    </IconButton>

                    <Box
                        ref={imageRef}
                        component="img"
                        src={images[currentImageIndex]}
                        alt={`Paquete ${currentImageIndex + 1}`}
                        onLoad={handleImageLoad}
                        sx={{ 
                            maxHeight: "80%", 
                            maxWidth: "80%", 
                            objectFit: "contain"
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: imageWidth ? `${imageWidth}px` : 'auto',
                            mt: 2,
                            color: "white",
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Título de la imagen {currentImageIndex + 1}
                        </Typography>
                        <IconButton
                            onClick={() => console.log("Compartir")}
                            sx={{ color: "white" }}
                        >
                            <ShareIcon />
                        </IconButton>
                    </Box>

                    <IconButton
                        onClick={handleNext}
                        sx={{ position: "absolute", right: "2%", color: "white" }}
                    >
                        <ArrowForwardIosIcon fontSize="large" />
                    </IconButton>
                </Box>
            </Modal>
            <Footer />
        </Box>
    );
}

// ***************** new repo start **************//
// import React, { useState, useEffect, useCallback } from "react";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Modal from "@mui/material/Modal";
// import IconButton from "@mui/material/IconButton";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import CircularProgress from "@mui/material/CircularProgress";
// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";
// import NavBar from "../Home/NavBar";
// import Footer from "../Home/Footer";
// import image1 from "../../assets/image-1.png";
// import image2 from "../../assets/image-2.jpg"
// import image3 from '../../assets/image-3.jpg';
// import image4 from '../../assets/image-4.jpg';
// import image5 from '../../assets/TourDestination/cerro_champaqui.jpg'
// import image6 from '../../assets/TourDestination/cerro_del_medio.jpg'
// import image7 from '../../assets/TourDestination/cerro_penitente.jpg'
// import image8 from '../../assets/TourDestination/cerro_serrata.jpg'
// import image9 from '../../assets/TourDestination/cerro_tres_picos.jpg'
// import image10 from '../../assets/TourDestination/cerro_vallecitos.jpg'
// import image11 from '../../assets/TourDestination/la_cadenita.jpg'
// import image12 from '../../assets/TourDestination/lanin.jpg'

// //import { getAllPackages } from "../../api/packageApi";

// import Typography from "@mui/material/Typography";
// import ShareIcon from "@mui/icons-material/Share";
// import CloseIcon from "@mui/icons-material/Close"; 
// import { useRef } from "react";


// export function Gallery() {
//     const [images, setImages] = useState([]);
//     const [isFetching, setIsFetching] = useState(true);
//     const [open, setOpen] = useState(false);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [imageWidth, setImageWidth] = useState(0);
//     const imageRef = useRef(null);
//     const imageTitles = ["El Chalten", "Cerro Tronador", "Cerro Torre", "Cerro Colorado", "Cerro Champaqui", "Cerro del Medio", "Cerro Penitente", "Cerro Serrata", "Cerro Tres Picos", "Cerro Vallecitos", "La Cadenita", "Volcán Lanin"];

//     useEffect(() => {
//         // const fetchImages = async () => {
//         //     try {
//         //         const response = await fetch("https://kostentours-api-10061c08f8f8.herokuapp.com/images/all");
//         //         const result = await response.json();
                
//         //         if (!result.isError && Array.isArray(result.data)) {
//         //             const imageUrls = result.data.map(item => item.url);
//         //             setImages(imageUrls);
//         //         } else {
//         //             console.error("Error en la respuesta del servidor:", result.message);
//         //         }
//         //     } catch (error) {
//         //         console.error("Error al obtener imágenes:", error);
//         //     } finally {
//         //         setIsFetching(false);
//         //     }
//         // };
//         //fetchImages();
//         const imageUrls = [image1, image2, image3, image4, image5,image6, image7, image8,image9,image10,image11,image12];
//         setImages(imageUrls);
//         setIsFetching(false);
//     }, []);
    
//     const handleImageLoad = () => {
//         if (imageRef.current) {
//             const width = imageRef.current.offsetWidth;
//             setImageWidth(width);
//         }
//     };

//     const handleOpen = (index) => {
//         setCurrentImageIndex(index);
//         setOpen(true);
//     };

//     const handleClose = () => setOpen(false);

//     const handleNext = () => {
//         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     };

//     const handlePrev = () => {
//         setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//     };



//     if (isFetching) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }
//     return (
//         <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//             <NavBar />
//             {images.length > 0 ? (
//                 <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", p: 2 }}>
//                     <Grid container spacing={2} sx={{ maxWidth: "90%", mx: "auto" }}>
//                         {images.map((img, index) => (
//                             <Grid item xs={12} sm={6} md={3} key={index}>
//                                 <Box
//                                     sx={{
//                                         position: "relative",
//                                         width: "100%",
//                                         paddingTop: "100%",
//                                         overflow: "hidden",
//                                         cursor: "pointer"
//                                     }}
//                                     onClick={() => handleOpen(index)}
//                                 >
//                                     <Box
//                                         component="img"
//                                         src={img}
//                                         alt={`Paquete ${index + 1}`}
//                                         sx={{
//                                             position: "absolute",
//                                             top: 0,
//                                             left: 0,
//                                             width: "100%",
//                                             height: "100%",
//                                             objectFit: "cover"
//                                         }}
//                                     />
//                                 </Box>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>
//             ) : (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
//                     <Alert severity="info" sx={{ width: '100%' }}>
//                         <AlertTitle>Sin paquetes</AlertTitle>
//                         No hay paquetes para mostrar.
//                     </Alert>
//                 </Box>
//             )}
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-slider"
//                 aria-describedby="modal-gallery-slider"
//                 BackdropProps={{
//                     style: {
//                         backgroundColor: 'rgba(0, 0, 0, 0.7)'
//                     }
//                 }}
//             >
//                 <Box
//                     sx={{
//                         position: "fixed",
//                         top: "50%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                         width: "90%",
//                         height: "90%",
//                         bgcolor: "transparent",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         flexDirection: "column",
//                         outline: "none",
//                         borderRadius: 2
//                     }}
//                 >
//                     <IconButton
//                         onClick={handleClose}
//                         sx={{ position: "absolute", top: "10px", right: "10px", color: "white" }}
//                     >
//                         <CloseIcon />
//                     </IconButton>

//                     <IconButton
//                         onClick={handlePrev}
//                         sx={{ position: "absolute", left: "2%", color: "white" }}
//                     >
//                         <ArrowBackIosIcon fontSize="large" />
//                     </IconButton>

//                     <Box
//                         ref={imageRef}
//                         component="img"
//                         src={images[currentImageIndex]}
//                         alt={`Paquete ${currentImageIndex + 1}`}
//                         onLoad={handleImageLoad}
//                         sx={{ 
//                             maxHeight: "80%", 
//                             minHeight: "65%",
//                             minWidth: "65%",
//                             maxWidth: "80%", 
//                             objectFit: "contain"
//                         }}
//                     />

//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             width: imageWidth ? `${imageWidth}px` : 'auto',
//                             mt: 2,
//                             color: "white",
//                         }}
//                     >
//                         <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                             {imageTitles[currentImageIndex]}
//                         </Typography>
//                         <IconButton
//                             onClick={() => console.log("Compartir")}
//                             sx={{ color: "white" }}
//                         >
//                             <ShareIcon />
//                         </IconButton>
//                     </Box>

//                     <IconButton
//                         onClick={handleNext}
//                         sx={{ position: "absolute", right: "2%", color: "white" }}
//                     >
//                         <ArrowForwardIosIcon fontSize="large" />
//                     </IconButton>
//                 </Box>
//             </Modal>
//             <Footer />
//         </Box>
//     );
// }
