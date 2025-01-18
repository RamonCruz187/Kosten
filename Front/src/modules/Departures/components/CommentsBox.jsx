/* eslint-disable react/prop-types */
import { Alert, AlertTitle, Box, Typography } from "@mui/material";
import { customPalette } from "../../../../customStyle";
// import avatarImage from "../../../assets/avatar.svg";
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "30dvh",
            }}
          >
            <Alert severity="info" sx={{ width: "90dvw" }}>
              <AlertTitle>Sin comentarios</AlertTitle>
              No hay comentarios disponibles aún.
              </Alert>
          </Box>
        ) : (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: {sx: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}, 
            gap: '2rem',
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
