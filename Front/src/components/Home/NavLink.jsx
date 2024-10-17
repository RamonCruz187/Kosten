import React from 'react';
import PropTypes from 'prop-types';
import { Link, Typography } from '@mui/material';

const NavLink = ({ href, children }) => (
  <Link
    href={href}
    color="inherit"
    underline="none"
   
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
        color: '#00BD7E',
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
