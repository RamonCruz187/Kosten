/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { customPalette } from "../../../../customStyle";
import avatarImage from "../../../assets/avatar.svg";
import CommentsCards from "./CommentsCards";

export default function CommentsBox({ comments, packageName }) { 


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
          color: customPalette.text.light,
        }}
      >
        OPINIONES DE QUIENES PARTICIPARON
      </Typography>

        {(!comments || comments.length === 0) ?
        (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body1" color="#fff">
            No hay comentarios disponibles aún.
          </Typography>
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
            paddingX: 2 // Opcional: para dar algo de espacio en los laterales
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
