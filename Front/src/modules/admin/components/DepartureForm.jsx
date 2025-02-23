// Front/src/modules/admin/components/DepartureForm.jsx
import { Box, TextField, Typography, useTheme } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/es";
const es = dayjs.locale("es");
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback, useEffect, useState } from "react";
import {
  createDeparture,
  deleteDeparture,
  updateDeparture,
} from "@/api/departuresApi";
import { NotificationService } from "@/shared/services/notistack.service";
import { hasChanges } from "@/shared/utils/compareObj";
import { WhiteButton } from "@/shared/components/buttons/WhiteButton";
import { ColorButton } from "@/shared/components/buttons/ColorButton";

const DepartureSchema = Yup.object().shape({
  startDate: Yup.string()
    .required('Esta fecha es requerida'),
  endDate: Yup.string()
    .required('Esta fecha es requerida'),
  price: Yup.number()
    .required('El precio es requerido')
    .min(1, 'El precio debe ser mayor a 0'),
});

export const DepartureForm = ({
  departureData = {},
  package_Id = "",
  setOpenModal = () => {},
  refetch = () => {},
  isCreate = false,
  index = "",
}) => {
  const { startDate, endDate } = departureData;

  const theme = useTheme();
  const { palette } = theme;

  // const [formData, setFormData] = useState({
    const formik = useFormik({
      initialValues: {
        packageId: departureData?.id || package_Id,
        id: departureData?.id || "",
        startDate: startDate
          ? typeof startDate === "string" ? dayjs(departureData.startDate, "YYYY-MM-DD").format("DD-MM-YYYY") : `${startDate[2]}-${startDate[1] < 10 ? "0" : ""}${startDate[1]}-${startDate[0]}`
          : "",
        endDate: endDate
          ? typeof endDate === "string" ? dayjs(departureData.endDate, "YYYY-MM-DD").format("DD-MM-YYYY") : `${endDate[2]}-${startDate[1] < 10 ? "0" : ""}${endDate[1]}-${endDate[0]}`
          : "",
        price: departureData?.price || "",
        meetingPlace: "string",
        finishPlace: "string",
        isActive: departureData?.isActive || true,
      },
      validationSchema: DepartureSchema,
      onSubmit: (values) => {
        {isCreate ? fetchCreateDepartures(values) : fetchUpdateDepartures(values)};
      },
      enableReinitialize: true,
    });


  const [formModified, setFormModified] = useState(false);

  // state para las llamadas a apis
  const [isFetching, setIsFetching] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleDateChange = (event, field) => {
    formik.setFieldValue(field, dayjs(event.$d).format("DD-MM-YYYY"));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, name === "price" ? +value : value);
  };

  const fetchCreateDepartures = useCallback(async (data) => {
    const body = { ...data};
    body.startDate = dayjs(data.startDate, "DD-MM-YYYY").utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
    body.endDate = dayjs(data.endDate, "DD-MM-YYYY").utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
    setIsFetching(true);
    try {
      const response = await createDeparture(body); // Axios devuelve 'data' directamente
      refetch();
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
  
  const fetchUpdateDepartures = useCallback(async (data) => {
    const body = { ...data};
    body.startDate = dayjs(data.startDate, "DD-MM-YYYY").utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
    body.endDate = dayjs(data.endDate, "DD-MM-YYYY").utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
    setIsFetching(true);
    try {
      const response = await updateDeparture(body); // Axios devuelve 'data' directamente
      setResponseData(response);
      NotificationService.success("La salida fueron actualizada con éxito");
      refetch();
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
      setResponseData(response);
      NotificationService.success("La salida fueron borrada con éxito");
      refetch();
    } catch (error) {
      console.error(error);
      NotificationService.error("Error al borrar la salida");
    } finally {
      setIsFetching(false);
    }
  }, []);

  const handleDelete = () => {
    fetchDeleteDepartures(formik.values?.id);
  };

  useEffect(() => {
    // Verifica si algún campo ha cambiado comparando con los valores iniciales
    const isModified = hasChanges(formik.initialValues, formik.values);
    setFormModified(isModified);
  }, [formik.values]);

  return (
    <Box component="form" sx={{ backgroundColor: palette.tertiary.light, padding: "20px", marginBottom: "2rem" }}>
      <Box sx={{ marginBottom: "10px" }}>
        <Typography variant="titleH3" sx={{ color: palette.text.main }}>
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
              value={dayjs(formik.values.startDate, "DD-MM-YYYY") || null}
              onChange={(event) => handleDateChange(event, "startDate")}
              slotProps={{ 
                textField: { 
                  fullWidth: true,
                  error: formik.touched.startDate && Boolean(formik.errors.startDate),
                  helperText: formik.touched.startDate && formik.errors.startDate
                } 
              }}
              disablePast
              shouldDisableDate={(date) => {
                // Si hay una fecha final seleccionada, deshabilitar fechas posteriores
                if (formik.values.endDate !== null) {
                  return dayjs(date).isAfter(
                    dayjs(formik.values.endDate, "DD-MM-YYYY")
                  );
                }
                return false;
              }}
            />
          </LocalizationProvider>
          <Typography
            variant="titleH3"
            sx={{ display: { xs: "none", sm: "block" }, color: palette.text.main }}
          >
            -
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={es}>
            <DatePicker
              label="Fin"
              value={dayjs(formik.values.endDate, "DD-MM-YYYY") || null}
              onChange={(event) => handleDateChange(event, "endDate")}
              slotProps={{ 
                textField: { 
                  fullWidth: true,
                  error: formik.touched.startDate && Boolean(formik.errors.startDate),
                  helperText: formik.touched.startDate && formik.errors.startDate
                } 
              }}
              disablePast
              shouldDisableDate={(date) => {
                // Si hay una fecha inicial seleccionada, deshabilitar fechas anteriores
                if (formik.values.startDate !== null) {
                  return dayjs(date).isBefore(
                    dayjs(formik.values.startDate, "DD-MM-YYYY")
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
            value={formik.values.price}
            onChange={handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            InputProps={{
              inputProps: { min: 1 },
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
            <>
            <WhiteButton
              onClick={handleDelete}
              isFetching={isFetching}
              icon={<RiDeleteBin6Line size={20} />}
            />
            <WhiteButton
              onClick={() => setOpenModal(departureData)}
              isFetching={isFetching}
              text="Ver inscriptos"
              fetchingText="Inscriptos"
            />
            </>
          )}
          <ColorButton
            type="greenButton"
            onClick={formik.handleSubmit}
            text= {isCreate ? "Crear" : "Guardar"}
            isFetching={isFetching}
            disabled={
              !formModified ||
              !formik.isValid
            }
            sx={{
              width: isCreate ? "70%" : "30%",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
