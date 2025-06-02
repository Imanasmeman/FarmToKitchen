import React from "react";
import { useNavigate } from "react-router";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-hero">
        <div className="landing-hero-text">
          <h1>Farm to Kitchen</h1>
          <p className="landing-tagline">
            Fresh, Local, and Direct from Farmers to You
          </p>
          <div className="landing-buttons">
            <button className="farmer-btn" onClick={() => navigate("/signup-farmer")}>
              Register as Farmer
            </button>
            <button className="customer-btn" onClick={() => navigate("/login")}>
              Login as Customer
            </button>
          </div>
        </div>
        <img
          className="landing-hero-img"
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Farmers"
        />
      </div>
      <div className="landing-features">
        <h2>How It Works</h2>
        <div className="features-list">
          <div className="feature">
            <span role="img" aria-label="farm" className="feature-icon">🌱</span>
            <h3>For Farmers</h3>
            <p>Register, list your fresh produce, and reach more customers directly.</p>
          </div>
          <div className="feature">
            <span role="img" aria-label="basket" className="feature-icon">🛒</span>
            <h3>For Customers</h3>
            <p>Browse local products, order online, and enjoy farm-fresh food at your doorstep.</p>
          </div>
          <div className="feature">
            <span role="img" aria-label="handshake" className="feature-icon">🤝</span>
            <h3>Community Impact</h3>
            <p>Support local farmers and sustainable agriculture with every purchase.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;