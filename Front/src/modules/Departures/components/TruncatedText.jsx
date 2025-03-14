import { useState, useRef, useEffect } from "react";
import { Box, Typography, IconButton, Modal, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { RiAddLine } from "react-icons/ri";
import { WhiteButton } from "@/shared/components/buttons/WhiteButton";
import { formatLongTexts } from "@/shared/utils/formatLongTexts";
const TruncatedText = ({ text }) => {
	const theme = useTheme();
	const { palette } = theme;
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
          overflow: "hidden",
        }}
      >
        <Typography
          ref={textRef}
          variant="p"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
						fontSize: { xs: "12px", sm: "12px", md: "14px", xl: "18px" },  // mismo de que se trata
            WebkitLineClamp: { xs: 10, sm: 10, md: 10, lg: 10 },
          }}
        >
              {formatLongTexts(text).map((info, index) => (
                <Typography key={`itineraryInfoTruncated-${index}`} sx={{ fontSize: "inherit", fontFamily: "inherit" }}>
                  {info.trim() === "" ? "\u00A0" : info}
                </Typography>
              ))
            }
        </Typography>
        {isTruncated && text !== "Itinerario no disponible" && (
          <WhiteButton
            onClick={toggleModal}
						text="Ver más"
            icon={<RiAddLine size={24} />} 
						sx={{ margin: "1rem auto 0 auto" }}
          />
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
						display: "flex",
						flexDirection: "column",
            textAlign: "center",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, 0)",
            width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
            height: "auto",
						maxHeight: "85vh",
            backgroundColor: palette.tertiary.light,
            padding: {xs: '1rem 0.5rem', sm: '2rem 1rem', md: '2rem', lg: '2rem 2rem', xl: '2rem 3rem'},
            overflowY: "auto",
            position: "relative",
          }}
        >
          <IconButton
            onClick={toggleModal}
            sx={{
              position: "absolute",
              top: {xs: "0.5rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1rem"},
              right: {xs: "0.5rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1rem"},
              color: "grey.600",
              fontSize: {xs: "1.5rem", md: "2rem", xl: "2.5rem"},
            }}
          >
            <CloseIcon sx={{ fontSize: 'inherit' }}/>
          </IconButton>

          <Typography
            id="modal-title"
            variant="titleH2"
            sx={{ 
							fontSize: { xs: "20px", sm: "22px", md: "24px", xl: "28px" },
							marginBottom: "16px", 
							fontWeight: "bold" 

						}}
          >
            Itinerario
          </Typography>

          {formatLongTexts(text).map((info, index) => (
              <Typography key={`itineraryInfoComplete-${index}`} variant="p"
                sx={{fontSize: { xs: "12px", sm: "12px", md: "14px", xl: "18px" },}}
              >
                {info.trim() === "" ? "\u00A0" : info}
              </Typography>
            ))
          }
        </Box>
      </Modal>
    </>
  );
};

export default TruncatedText;
