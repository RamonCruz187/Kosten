import { Box, CircularProgress } from "@mui/material";
import kosten from "../../assets/kosten.png";
const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
        width: "100%",
				gap: "2rem",
				backgroundColor: "#080808",
      }}
    >
			<CircularProgress />
      <img src={kosten} alt="kosten" width={200} />
    </Box>
  );
};

export default Loading;
