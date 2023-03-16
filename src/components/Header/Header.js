import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Admin Dashboard</h1>
      <nav className="navbar">
        <NavLink exact activeClassName="active" to="/">
          Om
        </NavLink>
        <NavLink activeClassName="active" to="/users">
          Användare
        </NavLink>
        <NavLink activeClassName="active" to="/settings">
          Fastighsdata
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
