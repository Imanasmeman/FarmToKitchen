import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import db from "../firebase/firebaseConfig";

const FarmersList = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const farmersRef = ref(db, "farmers");

    const unsubscribe = onValue(farmersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const farmersArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setFarmers(farmersArray);
      } else {
        setFarmers([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading farmers...</p>;
  if (farmers.length === 0) return <p>No farmers found.</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
      {farmers.map((farmer) => (
        <div
          key={farmer.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            maxWidth: "300px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
            textAlign: "center"
          }}
        >
          {farmer.photo && (
            <img
              src={farmer.photo}
              alt={farmer.name}
              style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "6px", marginBottom: "15px" }}
            />
          )}
          <h3 style={{ marginBottom: "10px", color: "#2c3e50" }}>{farmer.name}</h3>
          <p><strong>Email:</strong> {farmer.email}</p>
          <p><strong>Phone:</strong> {farmer.phone}</p>
          <p><strong>Address:</strong> {farmer.address}</p>
          <p><strong>Produce:</strong> {farmer.produce}</p>
          <p><strong>About:</strong> {farmer.about || "No description provided"}</p>
          <p><strong>Rating:</strong> {farmer.rating ?? 0} / 5</p>
        </div>
      ))}
    </div>
  );
};

export default FarmersList;
