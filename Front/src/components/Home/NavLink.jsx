import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import {Link} from "react-router-dom";

const NavLink = ({ href, children }) => (
  <Link
    to={href}
    color="inherit"
    // Corregido el underline de los links
    style={{textDecoration: 'none'}}
  >
    <Typography
      variant="paragraphLight"
      sx={{
        fontWeight: '600',
        fontSize: '1.25rem',
        fontFamily: 'Oswald',
        margin: '8px',
      '&:hover': {
        color: '#9E9E9E',
      },
      '&:active': {
        color: '#FFC800',
      },
      }}
    >
      {children}
    </Typography>
  </Link>
);
NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavLink;
