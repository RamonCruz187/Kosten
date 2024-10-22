import {Backup, BarChart, CardTravel, Hiking, Insights, SupervisedUserCircle} from "@mui/icons-material";

export const MenuOptionsTop = [
    {
        title: 'Paquetes',
        icon: <CardTravel />,
        to: '/admin/paquetes'
    },
    {
        title: 'Salidas',
        icon: <Hiking />,
        to: '/admin/salidas'
    },
    {
        title: 'Usuarios',
        icon: <SupervisedUserCircle />,
        to: '/admin/usuarios'
    },
    {
        title: 'Imagenes',
        icon: <Backup />,
        to: '/admin/imagenes'
    }
]

export const MenuOptionsBottom = [
    {
        title: 'Reportes',
        icon: <BarChart />,
        to: '/admin/reportes'
    },
    {
        title: 'Tráfico',
        icon: <Insights />,
        to: '/admin/trafico'
    }
]