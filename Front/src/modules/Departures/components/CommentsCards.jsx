// Front/src/modules/Departures/components/CommentsCards.jsx
import { Stack, Typography, Box } from "@mui/material";
import PropTypes from "prop-types"; 

import {AccountCircle} from "@mui/icons-material";
import { formatDateAndHour } from '@modules/Departures/utils/utils.jsx';
export default function CommentsCards({ user, text, date, packageName }) {

  CommentsCards.propTypes = {
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  };


  return (
    <Stack
      sx={{
        padding: "1rem",
        backgroundColor: "#F3F3F3",
        borderRadius: "4px",
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
      
          <Typography variant="p" fontWeight={'bold'}> {packageName}</Typography>
      
      <Typography variant="p" >{text}</Typography>


      <Typography variant="text2">{formatDateAndHour(date)}</Typography>
    </Stack>
  );
}
