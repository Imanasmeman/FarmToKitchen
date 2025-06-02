import React from 'react';
import { Link, NavLink } from 'react-router';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
      </div>
      <nav className="nav-links">
        <NavLink to="/products" className="nav-link">Products</NavLink>
        <NavLink to="/farmers" className="nav-link">Our Partner Farmers</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
        <NavLink to="/profile" className="nav-link profile-link">👤</NavLink>
      </nav>
    </header>
  );
};

export default Header;
