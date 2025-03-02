/* eslint-disable react/prop-types */
import { Box, Typography, useTheme } from "@mui/material";
// import avatarImage from "../../../assets/avatar.svg";
import CommentsCards from "./CommentsCards";
import { CallToActionButton } from "@/shared/components/buttons/CallToActionButton";

export default function CommentsBox({ comments, packageName, handleCommentClick }) { 
  const theme = useTheme();
  const { palette } = theme;

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: "2rem", 
      width: '100%',
      paddingY: '5rem',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <Typography
        variant="titleH1"
        sx={{
          textAlign: "center",
          color: palette.text.light,
        }}
      >
        OPINIONES DE QUIENES PARTICIPARON
      </Typography>

        {(!comments || comments.length === 0) ?
        (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "30dvh",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <Typography variant="subtitle" sx={{ color: palette.text.light }}>
            Aún no se han realizado comentarios. Puedes ser el primero!
            </Typography>
            <CallToActionButton
              text="Comenta tu experiencia"
              onClick={handleCommentClick}
              islarge={false}
            />
          </Box>
        ) : (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: {
              xs: 'minmax(250px, 1fr)',
              sm: `repeat(auto-fit, minmax(250px, ${comments.length === 1 ? '400px' : '1fr'}))`,
            },
            gap: '2rem',
            justifyContent: 'center',
            justifyItems: 'center',
            width: '100%',
            maxWidth: '1100px', // Limita el ancho máximo del contenedor
            margin: '0 auto',
            paddingX: 2
          }}>
            {comments.map((comment, index) => (
              <CommentsCards
                key={comment.id || index}
                user={comment.username}
                text={comment.content}
                date={comment.dateCreation}
                packageName={comment.name ? (`Trekking en ${comment.name}`) : (packageName) }
              />
            ))}
          </Box>
        )
        }
    </Box>
  );
}
