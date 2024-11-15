import { Stack, Typography } from "@mui/material";
import { customPalette } from "../../../../customStyle";
import PropTypes from "prop-types"; 

export default function CommentsCards({ avatar, user, title, text, date }) {
  CommentsCards.propTypes = {
    avatar: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  };

  return (
    <Stack
      sx={{
        padding: "1rem",
        backgroundColor: customPalette.text.light,
        borderRadius: "8px",
        // width: "100%",
        height: "fit-content",
        maxWidth: "400px",
        gap:'.5rem'
      }}
    >
      <Stack direction="row" sx={{gap: '.5rem', justifyContent:'flex-start', alignItems: 'center'}}>
        <img src={avatar} alt="avatar" />
        <Typography variant="subtitleBold">{user}</Typography>
      </Stack>
      <Typography variant="subtitleBold">{title}</Typography>

      <Typography variant="p">{text}</Typography>

      <Typography variant="text2">{date}</Typography>
    </Stack>
  );
}
