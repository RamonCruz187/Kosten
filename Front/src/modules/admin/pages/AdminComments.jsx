// src/modules/admin/pages/AdminComments.jsx
import { deleteCommentById, getAllComments, updateCommentFavorite, updateCommentVisibility } from "@/api/commentApi";
import { WhiteButton } from "@/shared/components/buttons/WhiteButton";
import { NotificationService } from "@/shared/services/notistack.service";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import {
  RiDeleteBin6Line,
  RiStarFill,
  RiStarLine,
} from "react-icons/ri";

const AdminComments = () => {
  const theme = useTheme();
  const { palette } = theme;

  const [isFetching, setIsFetching] = useState(false);
  const [tabValue, setTabValue] = useState("Todos");
  const [isVisibleSelected, setIsVisibleSelected] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);

  const handleChangeVisible = (event, comment) => {
    if(isFetching) return
    const newVisibleValue = event.target.value;
  
    // Actualizar solo el usuario correspondiente
    setIsVisibleSelected((prev) => ({
      ...prev,
      [comment.id]: newVisibleValue,
    }));
    fetchUpdateVisible(comment.id, newVisibleValue);
  };

  const handleChangeTabs = (event, newValue) => {
    setTabValue(newValue);
    filterComments(allComments, setFilteredComments, newValue)
  };

  const handleChangeFavorite = (comment) => {
    if(isFetching) return
    // en caso que se vaya a tildar y no destildar, se fija si ya hay 6 favoritos o más
    if(!comment.isFavorite && countFavorites(allComments) >= 6){
      NotificationService.error("No puedes tener más de 6 comentarios favoritos", 2000);
      return
    }
    fetchUpdateFavorite(comment.id, !comment.isFavorite);
  }

  const handleDeleteComment = (comment) => {
    if(isFetching) return
    fetchDeleteComment(comment.id);
  }
  const filterComments = (allComments, setFilteredComments, tabValue) => {
    switch (tabValue) {
      case "Todos":
        setFilteredComments(allComments);
        break;
      case "Nuevos":
        setFilteredComments(allComments.filter((comment) => dayjs(comment.dateCreation).isAfter(dayjs().subtract(7, "days"))));
        break;
      case "Visibles":
        setFilteredComments(allComments.filter((comment) => !!comment.isVisible));
        break;
      case "Ocultos":
        setFilteredComments(allComments.filter((comment) => !comment.isVisible));
        break;
      default:
        break;
    }
  }
  const countFavorites = (comments) => {
    let count = 0;
    comments.forEach((comment) => {
      if (comment.isFavorite) {
        count++;
      }
    });
    return count;
  }
  const fetchAllComments = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await getAllComments();
      setFilteredComments(response?.data?.data);
      setAllComments(response?.data?.data);
      NotificationService.success("Comentarios cargados con exito", 2000);
    } catch (error) {
      NotificationService.error("Error al cargar los comentarios", 2000);
      console.log("Error al cargar los comentarios: ", error);
    } finally {
      setIsFetching(false);
    }
    
  }, []);

  const fetchUpdateVisible = useCallback(async (id, visible) => {
    setIsFetching(true);
    const body = { commentId: id, isVisible: visible };
    try {
      const response = await updateCommentVisibility(body);
      NotificationService.success("Comentario actualizado con exito", 2000);
      fetchAllComments();
      setTabValue("Todos");
    } catch (error) {
      NotificationService.error("Error al actualizar el comentario", 2000);
      console.log("Error al actualizar el comentario: ", error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const fetchUpdateFavorite = useCallback(async (id, favorite) => {
    setIsFetching(true);
    const body = { commentId: id, isFavorite: favorite };
    try {
      const response = await updateCommentFavorite(body);
      NotificationService.success("Comentario actualizado con exito", 2000);
      fetchAllComments()
      setTabValue("Todos");
    } catch (error) {
      NotificationService.error("Error al actualizar el comentario", 2000);
      console.log("Error al actualizar el comentario: ", error);
    } finally {
      setIsFetching(false);
    }
  }, []);
  const fetchDeleteComment = useCallback(async (id) => {
    setIsFetching(true);
    try {
      const response = await deleteCommentById(id);
      NotificationService.success("Comentario borrado con exito", 2000);
      fetchAllComments()
      setTabValue("Todos");
    } catch (error) {
      NotificationService.error("Error al borrar el comentario", 2000);
      console.log("Error al borrar el comentario: ", error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchAllComments();
  }, []);

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (filteredComments.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Typography variant="subtitle" sx={{ color: palette.text.light }}>
        Todavía no hay comentarios para mostrar.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: {xs: 0, sm: 4},
      }}
    >
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Tabs
          value={tabValue}
          onChange={handleChangeTabs}
          textColor={palette.primary.light}
          indicatorColor={palette.primary.light}
          aria-label="filter tabs"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: palette.primary.light,
            },
            "& .Mui-selected": {
              color: palette.primary.light,
            },
          }}
        >
          {["Todos", "Nuevos", "Visibles", "Ocultos"].map((tab) => (
            <Tab
              key={tab}
              label={tab}
              value={tab}
              sx={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "1.1rem",
                fontWeight: 400,
                color: palette.tertiary.light,
                textTransform: "none",
              }}
            />
          ))}
        </Tabs>
      </Box>

        {filteredComments.map((comment) => (
          <Box
            key={`comment-${comment?.id}`}
            sx={{
              backgroundColor: palette.tertiary.light,
              marginBottom: 1,
              borderRadius: "4px",
              display: "flex",
              width: "100%",
              flexDirection: {xs: "column", md: "row"},
              alignItems: "center",
              justifyContent: "space-between",
              padding: 1,
              boxShadow: 2,
            }}
          >
            <Box  sx={{height: "100%", padding: 1, display: "flex", flexDirection: "column", gap: ".5rem"}}>
            <Box sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}>
              <Box
                sx={{cursor: "pointer"}}
                onClick={() => handleChangeFavorite(comment)}
              >
              {comment?.isFavorite ? (
                <RiStarFill size={26} color={palette.accent.darkest2} />
              ) : (
                <RiStarLine size={26} color={palette.text.main} />
              )}
              </Box>
              <Typography variant="textBoxFill"
                sx={{fontWeight: 600}}
              >{comment?.username}</Typography>
              <Typography variant="textBoxFill">
                {dayjs(comment?.dateCreation).format("D")}{' de '}
                {dayjs(comment?.dateCreation).format("MMMM")}{' de '}
                {dayjs(comment?.dateCreation).format("YYYY")}
              </Typography>
            </Box>
              <Typography variant="textBoxFill" sx={{fontWeight: 600}}>{comment?.packageName}</Typography>
              <Typography variant="textBoxFill">{comment?.content}</Typography>
            </Box>
          {/* boton y select */}
          <Box
            sx={{
              display: "flex",
              flexDirection: {xs: "row", md: "column"},
              // alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              padding: 1,
            }}
          >
            <WhiteButton
              onClick={() =>handleDeleteComment(comment)}
              isFetching={isFetching}
              icon={<RiDeleteBin6Line />}
              text="ELIMINAR"
              sx={{
                width: "130px",
                // height: {xs: '40px', md: 'unset'}, 
              }}
            />
            <FormControl>
              <InputLabel 
                id="isVisible-label" 
                sx={{ 
                  backgroundColor: palette.tertiary.light, 
                  paddingX: '3px',
                  '&.Mui-focused': {
                    color: palette.text.primary, // Mantiene el color cuando está enfocado
                  },
                }}
              >
                Estado
              </InputLabel>
              <Select
                labelId="isVisible-label"
                id="isVisible"
                name="isVisible"
                value={comment.isVisible ? true : false}
                onChange={(event) => handleChangeVisible(event, comment)}
                variant="outlined"
                displayEmpty // Esto asegura que el marcador de posición sea visible
                sx={{
                  width: '130px',
                  // minHeight: '40px', 
                  borderRadius: '4px', 
                  fontFamily: "Catamaran, sans-serif",
                  color: palette.text.primary, // Cambia el color del texto
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: palette.tertiary[700], // Cambia el color del borde
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: palette.tertiary[700], // Mantiene el color cuando está enfocado
                  },
                  '& .MuiSelect-icon': {
                    color: palette.text.primary, // Cambia el color del icono del select
                  },
                }}
              >
                <MenuItem key={`isvisible-empty`} value="" disabled></MenuItem>
                <MenuItem key={`isvisible-Visible`} value={true}>
                  Visible
                </MenuItem>
                <MenuItem key={`isvisible-NoVisible`} value={false}>
                  No visible
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          </Box>
        ))}
    </Box>
  );
};

export default AdminComments;