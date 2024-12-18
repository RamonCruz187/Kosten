// Front/src/modules/admin/utils/Menu.jsx
import { RiChatQuoteLine, RiGroupLine, RiWalkLine, RiMapPinLine,  } from 'react-icons/ri';
// RiImage2Line, RiSettings4Line, RiAccountCircleLine,


export const MenuOptionsTop = [
    {
        title: 'Paquetes / Destinos',
        icon: <RiWalkLine />,
        to: '/admin/paquetes'
    },
    {
        title: 'Salidas',
        icon: <RiMapPinLine />,
        to: '/admin/salidas'
    },
    {
        title: 'Comentarios',
        icon: <RiChatQuoteLine />,
        to: '/admin/comentarios'
    },
    {
        title: 'Usuarios / Staff',
        icon: <RiGroupLine />,
        to: '/admin/usuarios'
    },
    // {
    //     title: 'Paquetes',
    //     icon: <CardTravel />,
    //     to: '/admin/paquetes'
    // },
    // {
    //     title: 'Imágenes',
    //     icon: <RiImage2Line />,
    //     to: '/admin/paquetes'
    // },
]

export const MenuOptionsBottom = [
    // {
    //     title: 'Reportes',
    //     icon: <BarChart />,
    //     to: '/admin/reportes'
    // },
    // {
    //     title: 'Tráfico',
    //     icon: <Insights />,
    //     to: '/admin/trafico'
    // }
]