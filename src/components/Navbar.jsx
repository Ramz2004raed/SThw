import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <nav style={navStyle}>
      <Link
        to="/"
        style={isActive('/') ? activeStyle : linkStyle}
      >
        Home
      </Link>

      <Link
        to="/add"
        style={isActive('/add') ? activeStyle : linkStyle}
      >
        Add Student
      </Link>
    </nav>
  );
}

const navStyle = {
  backgroundColor: '#2d2d2d',
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  borderRadius: '10px',
  marginTop: '10px',
  marginBottom: '20px',
};

const linkStyle = {
  padding: '10px 20px',
  color: 'white',
  backgroundColor: '#444',
  textDecoration: 'none',
  borderRadius: '8px',
};

const activeStyle = {
  ...linkStyle,
  backgroundColor: '#2563eb',
};

export default Navbar;
