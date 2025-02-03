// Front/src/modules/admin/components/DepartureForm.jsx
import { Box, Button, TextField, Typography } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/es";
const es = dayjs.locale("es");

import { useCallback, useEffect, useState } from "react";
import {
  createDeparture,
  deleteDeparture,
  updateDeparture,
} from "@/api/departuresApi";
import { NotificationService } from "@/shared/services/notistack.service";
import { useNavigate } from "react-router-dom";

export const DepartureForm = ({
  departureData = {},
  package_Id = "",
  // allStaff = [],
  setOpenModal = () => {},
  onActionComplete = () => {},
  isCreate = false,
  index = "",
}) => {
  const { startDate, endDate } = departureData;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    packageId: departureData?.id || package_Id,
    id: departureData?.id || "",
    startDate: startDate
      ? `${startDate[2]}-${startDate[1] < 10 ? "0" : ""}${startDate[1]}-${startDate[0]}`
      : "",
    endDate: endDate
      ? `${endDate[2]}-${startDate[1] < 10 ? "0" : ""}${endDate[1]}-${endDate[0]}`
      : "",
    price: departureData?.price || "",
    // quota: departureData?.quota || '',
    // guide: departureData?.guide || '',
    meetingPlace: departureData?.meetingPlace || "string",
    finishPlace: departureData?.finishPlace || "string",
    isActive: departureData?.isActive || true,
  });
  console.log("departureData?.startDate", departureData?.startDate);

  // Original data to compare against
  const [originalData, setOriginalData] = useState({ ...formData });
  const [hasChanges, setHasChanges] = useState(false);

  // state para las llamadas a apis
  const [isFetching, setIsFetching] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleDateChange = (event, field) => {
    setFormData({
      ...formData,
      [field]: dayjs(event.$d).format("DD-MM-YYYY"), // Convierte la fecha al formato deseado
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? +value : value,
    });
  };

  const fetchCreateDepartures = useCallback(async (body) => {
    setIsFetching(true);
    try {
      const response = await createDeparture(body); // Axios devuelve 'data' directamente
      console.log("data", response?.data?.data?.content);
      setResponseData(response);
      NotificationService.success("Las salidas fueron cargadas con éxito");
      console.log("Las salidas fueron cargadas con éxito");
    } catch (error) {
      console.error(error);
      NotificationService.error("Error al cargar las salidas");
    } finally {
      setIsFetching(false);
    }
  }, []);

  const fetchUpdateDepartures = useCallback(async (body) => {
    setIsFetching(true);
    try {
      const response = await updateDeparture(body); // Axios devuelve 'data' directamente
      console.log("data", response?.data?.data?.content);
      setResponseData(response);
      NotificationService.success("La salida fueron actualizada con éxito");
    } catch (error) {
      console.error(error);
      NotificationService.error("Error al cargar la salida");
    } finally {
      setIsFetching(false);
    }
  }, []);

  const fetchDeleteDepartures = useCallback(async (body) => {
    setIsFetching(true);
    try {
      const response = await deleteDeparture(body); // Axios devuelve 'data' directamente
      console.log("data", response?.data?.data?.content);
      setResponseData(response);
      NotificationService.success("La salida fueron borrada con éxito");
    } catch (error) {
      console.error(error);
      NotificationService.error("Error al borrar la salida");
    } finally {
      setIsFetching(false);
    }
  }, []);

  const handleCreate = () => {
    const dataToSend = {
      ...formData,
      startDate: dayjs(formData?.startDate, "DD-MM-YYYY").$d,
      endDate: dayjs(formData?.endDate, "DD-MM-YYYY").$d,
    };
    console.log("formData", formData);
    console.log("dataToSend", dataToSend);

    fetchCreateDepartures(dataToSend);
    // window.location.reload();
    navigate(`/admin/salidas/${package_Id}`);
  };

  const handleUpdate = () => {
    const dataToSend = {
      ...formData,
      startDate: dayjs(formData?.startDate, "DD-MM-YYYY").$d,
      endDate: dayjs(formData?.endDate, "DD-MM-YYYY").$d,
    };
    console.log("formData", formData);
    console.log("dataToSend", dataToSend);
    fetchUpdateDepartures(dataToSend);
  };

  const handleDelete = () => {
    fetchDeleteDepartures(formData?.id);
    // window.location.reload();
    navigate(`/admin/salidas/${package_Id}`);
  };
  // Check for changes whenever formData updates
  useEffect(() => {
    const changes = Object.keys(formData).some(
      (key) => formData[key] !== originalData[key]
    );
    setHasChanges(changes);
  }, [formData, originalData]);

  return (
    <Box component="form" sx={{ backgroundColor: "#F3F3F3", padding: "20px" }}>
      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="titleH3" sx={{ color: "#000" }}>
          {!isCreate ? `Salida ${index + 1}` : "Nueva Salida"}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: "1rem",
          alignItems: "center",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "3fr 2fr 3fr" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={es}>
            <DatePicker
              label="Inicio"
              value={dayjs(formData.startDate, "DD-MM-YYYY") || null}
              onChange={(event) => handleDateChange(event, "startDate")}
              slotProps={{ textField: { fullWidth: true } }}
              disablePast
              shouldDisableDate={(date) => {
                // Si hay una fecha final seleccionada, deshabilitar fechas posteriores
                if (formData.endDate !== null) {
                  return dayjs(date).isAfter(
                    dayjs(formData.endDate, "DD-MM-YYYY")
                  );
                }
                return false;
              }}
            />
          </LocalizationProvider>
          <Typography
            variant="titleH3"
            sx={{ display: { xs: "none", sm: "block" }, color: "#000" }}
          >
            -
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={es}>
            <DatePicker
              label="Fin"
              value={dayjs(formData.endDate, "DD-MM-YYYY") || null}
              onChange={(event) => handleDateChange(event, "endDate")}
              slotProps={{ textField: { fullWidth: true } }}
              disablePast
              shouldDisableDate={(date) => {
                // Si hay una fecha inicial seleccionada, deshabilitar fechas anteriores
                if (formData.startDate !== null) {
                  return dayjs(date).isBefore(
                    dayjs(formData.startDate, "DD-MM-YYYY")
                  );
                }
                return false;
              }}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <TextField
            name="price"
            label="Precio"
            type="number"
            fullWidth
            value={formData.price}
            onChange={handleChange}
            InputProps={{
              inputProps: { min: 0 },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: isCreate ? "center" : "end",
          }}
        >
          {!isCreate && (
            <Button
              type="button"
              onClick={() => setOpenModal(departureData)}
              fullWidth
              variant="contained"
              disabled={isFetching}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#9E9E9E",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                cursor: "pointer",
              }}
            >
              Ver inscriptos
            </Button>
          )}
          <Button
            // type="submit"
            type="button"
            onClick={isCreate ? handleCreate : handleUpdate}
            variant="contained"
            color="green"
            disabled={!hasChanges || isFetching}
            sx={{
              mt: 3,
              mb: 2,
              width: isCreate ? "70%" : "30%",
              backgroundColor: hasChanges ? "#72CCA0" : "#E0E0E0",
              cursor: hasChanges ? "pointer" : "not-allowed",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            {isCreate
              ? isFetching
                ? "Creando..."
                : "Crear"
              : isFetching
                ? "Guardando..."
                : "Guardar"}
          </Button>
          {!isCreate && (
            <Button
              type="button"
              onClick={handleDelete}
              fullWidth
              variant="contained"
              color="transparent"
              disabled={isFetching}
              sx={{
                mt: 3,
                mb: 2,
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <RiDeleteBin6Line size={24} />
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
