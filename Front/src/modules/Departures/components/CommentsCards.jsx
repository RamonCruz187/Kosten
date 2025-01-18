import { Stack, Typography, Box } from "@mui/material";
import { customPalette } from "../../../../customStyle";
import PropTypes from "prop-types"; 

import {AccountCircle} from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import { formatDateAndHour } from '../utils/utils.jsx';
export default function CommentsCards({ user, text, date, packageName }) {

  CommentsCards.propTypes = {
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.array.isRequired,
  };


  return (
    <Stack
      sx={{
        padding: "1rem",
        backgroundColor: customPalette.text.light,
        borderRadius: "8px",
        width: "95%",
        height: "fit-content",
        maxWidth: "400px",
        gap:'.5rem'
      }}
    >

      <Box sx={{display: 'flex'}}>
        <AccountCircle />
        <Stack direction="row" sx={{gap: '.5rem', alignItems: 'center', paddingLeft:'10px'}}>
          <Typography variant="subtitleBold">{user}</Typography>
        </Stack>
        
      </Box>
      
          <Typography fontWeight={'bold'}> {packageName}</Typography>
      
      <Typography variant="p" >{text}</Typography>


      <Typography variant="text2">{formatDateAndHour(date)}</Typography>
    </Stack>
  );
}
