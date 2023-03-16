import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Mimer Prototype</h1>
      <nav className="navbar">
        <NavLink exact activeClassName="active" to="/">
          Om
        </NavLink>
        <NavLink activeClassName="active" to="/users">
          Användare
        </NavLink>
        <NavLink activeClassName="active" to="/properties">
          Fastighetsdata
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
