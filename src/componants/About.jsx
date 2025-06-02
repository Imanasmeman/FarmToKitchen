import React from "react";

const About = () => (
  <div style={{
    maxWidth: 800,
    margin: "40px auto",
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(44,62,80,0.08)",
    padding: "40px 32px"
  }}>
    <h1 style={{ color: "#166534", fontSize: "2.5rem", marginBottom: 16 }}>About Farm to Kitchen</h1>
    <p style={{ fontSize: "1.2rem", color: "#444", marginBottom: 24 }}>
      <strong>Farm to Kitchen</strong> is on a mission to connect local farmers directly with consumers, ensuring everyone gets the freshest, healthiest, and most sustainable produce possible. We believe in empowering farmers, supporting local communities, and making healthy food accessible to all.
    </p>
    <h2 style={{ color: "#15803d", marginTop: 32, marginBottom: 12 }}>Why Choose Us?</h2>
    <ul style={{ fontSize: "1.1rem", color: "#333", marginBottom: 24, paddingLeft: 24 }}>
      <li style={{ marginBottom: 10 }}>🌱 <strong>Freshness Guaranteed:</strong> All products come straight from the farm, harvested just for you.</li>
      <li style={{ marginBottom: 10 }}>🤝 <strong>Support Local Farmers:</strong> Every purchase helps small farmers grow and thrive.</li>
      <li style={{ marginBottom: 10 }}>🌍 <strong>Sustainable Choices:</strong> Reduce food miles and carbon footprint by buying local.</li>
      <li style={{ marginBottom: 10 }}>💚 <strong>Transparency:</strong> Know exactly where your food comes from and who grew it.</li>
    </ul>
    <h2 style={{ color: "#15803d", marginTop: 32, marginBottom: 12 }}>Our Story</h2>
    <p style={{ fontSize: "1.1rem", color: "#444", marginBottom: 24 }}>
      Born out of a passion for healthy living and community spirit, Farm to Kitchen was founded to bridge the gap between hardworking farmers and conscious consumers. We use technology to make farm-fresh food just a click away, while ensuring farmers get fair prices and recognition for their efforts.
    </p>
    <h2 style={{ color: "#15803d", marginTop: 32, marginBottom: 12 }}>Meet Our Team</h2>
    <p style={{ fontSize: "1.1rem", color: "#444", marginBottom: 24 }}>
      We are a group of food lovers, tech enthusiasts, and community builders dedicated to making a difference—one meal at a time.
    </p>
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Farmers" style={{ borderRadius: 12, width: "70%", maxWidth: 400, boxShadow: "0 2px 12px rgba(44,62,80,0.10)" }} />
      <p style={{ color: "#888", marginTop: 12, fontSize: "0.95rem" }}>Together, we grow a healthier future.</p>
    </div>
  </div>
);

export default About;