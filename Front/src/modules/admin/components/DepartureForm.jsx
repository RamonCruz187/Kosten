// Front/src/modules/admin/components/DepartureForm.jsx
import { Box, Button, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material"
import { RiDeleteBin6Line } from "react-icons/ri";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
const es = dayjs.locale('es');


import { useState } from "react";
import { StyledLabel } from "./styles";

export const DepartureForm = ({ 
	departureData = {}, 
	package_Id = '', 
	allStaff = [],
	setOpenModal = () => {},
	isCreate = false,
	index = '',
}) => {
	const { startDate, endDate } = departureData;
  const [formData, setFormData] = useState({
    packageId: departureData?.id || package_Id,
	startDate: startDate ? `${startDate[2]}-${startDate[1] < 10 ? "0": ""}${startDate[1]}-${startDate[0]}` : '',
    endDate: endDate ? `${endDate[2]}-${startDate[1] < 10 ? "0": ""}${endDate[1]}-${endDate[0]}` : '',
    price: departureData?.price || '',
    quota: departureData?.quota || '',
	guide: departureData?.guide || '',
    meetingPlace: departureData?.meetingPlace || 'string',
    finishPlace: departureData?.finishPlace || 'string',
    isActive: departureData?.isActive || true,
  });
  console.log('departureData?.startDate', departureData?.startDate)

  const handleDateChange = (event,field) => {
    setFormData({
      ...formData,
      [field]: dayjs(event.$d).format("DD-MM-YYYY"), // Convierte la fecha al formato deseado
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Aquí puedes agregar la lógica para enviar los datos
  };

  return (
		<Box component="form" onSubmit={handleSubmit} sx={{backgroundColor: '#F3F3F3', padding: '20px',}}>
			<Box sx={{ marginBottom: '20px'}}>
			<Typography variant="titleH3" sx={{ color: '#000' }}>
				{!isCreate ? `Salida ${index+1}` : 'Nueva Salida'}
			</Typography>
			</Box>
			<Box sx={{ 
				display: 'grid', 
				gap: '1rem', 
				alignItems: 'center', 
				gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '3fr 1fr 2fr 3fr' },
			}}>

				<Box sx={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
					<LocalizationProvider 
					dateAdapter={AdapterDayjs}
					adapterLocale={es}
					>
						<DatePicker
							label="Inicio"
							value={dayjs(formData.startDate, 'DD-MM-YYYY') || null}
							onChange={(event) => handleDateChange(event, 'startDate')}
							slotProps={{ textField: { fullWidth: true } }}
							disablePast
							shouldDisableDate={(date) => {
								// Si hay una fecha final seleccionada, deshabilitar fechas posteriores
								if (formData.endDate !== null) {
									return dayjs(date).isAfter(dayjs(formData.endDate, 'DD-MM-YYYY'));
								}
								return false;
							}}
						/>
					</LocalizationProvider>
					<Typography variant="titleH3" sx={{display: {xs: 'none', sm: 'block'}, color: '#000'}}>-</Typography>		
					<LocalizationProvider 
					dateAdapter={AdapterDayjs}
					adapterLocale={es}
					>
						<DatePicker
							label="Fin"
							value={dayjs(formData.endDate, 'DD-MM-YYYY') || null}
							onChange={(event) => handleDateChange(event,'endDate')}
							slotProps={{ textField: { fullWidth: true } }}
							disablePast
							shouldDisableDate={(date) => {
								// Si hay una fecha inicial seleccionada, deshabilitar fechas anteriores
								if (formData.startDate !== null) {
										return dayjs(date).isBefore(dayjs(formData.startDate, 'DD-MM-YYYY'));
								}
								return false;
							}}
						/>
					</LocalizationProvider>
				</Box>
				<Box>
					<TextField
						name="quota"
						label="Cupos"
						type="number"
						fullWidth
						value={formData.quota}
						onChange={handleChange}
						InputProps={{
							inputProps: { min: 0 }
						}}
					/>
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
							inputProps: { min: 0 }
						}}
					/>
				</Box>
				<Box>
					<FormControl fullWidth>
						<StyledLabel id="guide-label">Guía asignado</StyledLabel>
						<Select
							id="guide"
							name="guide"
							labelId="guide-label"
							value={formData.guide}
							onChange={handleChange}
						>
							{allStaff && allStaff.length > 0 ? (
								allStaff.map((staff) => (
									<MenuItem
										key={`staff-${staff.id}${staff.name}`}
										value={staff.id}
									>
										{staff.name} {staff.lastName}
									</MenuItem>
								))
							) : (
								<MenuItem value="">No hay staffs</MenuItem>
							)}
						</Select>
					</FormControl>
				</Box>

			</Box>
			<Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'end' }}>
				{!isCreate &&
				<Button
					type="button"
					onClick={() => setOpenModal(departureData)}
					fullWidth
					variant="contained"
					
					sx={{ mt: 3, mb: 2, backgroundColor: "#9E9E9E" }}
				>
					Ver inscriptos
				</Button>
				}
				<Button
					// type="submit"
					type="button"
					onClick={() => console.log(formData)}
					fullWidth
					variant="contained"
					color="green"
					sx={{ mt: 3, mb: 2, backgroundColor: '#72CCA0' }}
				>
					Guardar
				</Button>
				{!isCreate &&
				<Button
					// type="submit"
					type="button"
					onClick={() => console.log(formData)}
					fullWidth
					variant="contained"
					color="transparent"
					sx={{ 
						mt: 3,
						mb: 2, 
						boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',

					}}
				>	
					<RiDeleteBin6Line size={24}/>
				</Button>}
			</Box>
	</Box>
  )
}