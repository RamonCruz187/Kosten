/* eslint-disable react/prop-types */
import { Stack, Typography } from "@mui/material";
import { customPalette } from "../../../../customStyle";
import avatarImage from "../../../assets/avatar.svg";
import CommentsCards from "./CommentsCards";

export default function CommentsBox({ comments }) { 

  return (
    <Stack sx={{ gap: "2rem", background: customPalette.page_bg, padding: "2rem 3rem" }}>
      <Typography
        variant="titleH1"
        sx={{
          textAlign: "center",
          color: customPalette.text.light,
        }}
      >
        OPINIONES DE QUIENES PARTICIPARON
      </Typography>
      <Stack direction="row" sx={{ justifyContent:'center', flexWrap:'wrap', gap:'1.5rem' }}>
        {comments && comments?.map((comment, index) => (
          <CommentsCards
            key={index}
            user={comment.user}
            title={comment.title}
            text={comment.text}
            date={comment.date}
            avatar={avatarImage}
          />
        ))}
      </Stack>
    </Stack>
  );
}
