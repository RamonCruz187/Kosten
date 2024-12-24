import { useState, useRef, useEffect } from "react";
import { Box, Typography, IconButton, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const TruncatedText = ({ text }) => {
    const [isTruncated, setIsTruncated] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            const isOverflowing =
                textRef.current.scrollHeight > textRef.current.clientHeight;
            setIsTruncated(isOverflowing);
        }
    }, [text]);

    const toggleModal = () => {
        setOpenModal((prev) => !prev);
    };

    return (
        <>
            <Box
                sx={{
                    textAlign: "center",
                    padding: "16px",
                    bgcolor: "#F3F3F3",
                    overflow: "hidden",
                }}
            >
                <Typography
                    ref={textRef}
                    variant="body1"
                    sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: { xs: 3, sm: 5, md: 6, lg: 7 },
                    }}
                >
                    {text}
                </Typography>
                {isTruncated && (
                    <Button
                        onClick={toggleModal}
                        variant="contained"
                        sx={{ marginTop: "8px",
                            bgcolor:'#D9D9D9',
                            borderRadius:'4px',
                            height:'2.5rem',
                            
                         }}
                    >
                        <Typography sx={{fontSize:'2rem', fontWeight:'200'}}>+  </Typography>
                        Ver más
                    </Button>
                )}
            </Box>

            <Modal
                open={openModal}
                onClose={toggleModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        textAlign: "center",
                        top: "10%",
                        left: "50%",
                        transform: "translate(-50%, 0)",
                        width: {xs:'90%',sm:'80%',md:'70%', lg:'60%', xl:'50%'},
                        height:'auto',
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 7,
                        overflowY: "auto",
                        position: "relative",
                    }}
                >
                    <IconButton
                        onClick={toggleModal}
                        sx={{
                            position: "absolute",
                            top: 26,
                            right: 26,
                            color: "grey.600",
                            fontSize:'1.5rem',

                        }}
                    >
                        <CloseIcon  sx={{ fontSize: "2.5rem" }} />
                    </IconButton>

                    <Typography
                        id="modal-title"
                        variant="h6"
                        sx={{ marginBottom: "16px", fontWeight: "bold" }}
                    >
                        Itinerario
                    </Typography>
                    <Typography id="modal-description" variant="body1" sx={{fontFamily:'catamaran'}}>
                        {text}
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default TruncatedText;
