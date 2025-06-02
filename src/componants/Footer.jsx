import React from "react";
import { NavLink } from "react-router";
import "./Footer.css";

const Footer = () => (
  <footer className="app-footer">
    <div className="footer-content">
      <div className="footer-brand">
        <span role="img" aria-label="farm" style={{ fontSize: 28 }}>🌾</span>
        <span className="footer-title">Farm to Kitchen</span>
      </div>
      <nav className="footer-links">
        <NavLink to="/products" className="footer-link">Products</NavLink>
        <NavLink to="/farmers" className="footer-link">Farmers</NavLink>
        <NavLink to="/about" className="footer-link">About</NavLink>
      </nav>
      <div className="footer-social">
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg" alt="Twitter" />
        </a>
        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" />
        </a>
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" />
        </a>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} Farm to Kitchen. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;