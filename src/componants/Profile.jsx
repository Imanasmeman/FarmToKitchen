import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ref, get } from "firebase/database";
import db from "../firebase/firebaseConfig";

const Profile = () => {
  const { currentUser } = useAuth();
  const [isFarmer, setIsFarmer] = useState(false);
  const [farmerData, setFarmerData] = useState(null);

  useEffect(() => {
    if (!currentUser) return;
    // Check if user is a farmer by email in farmers node
    const farmersRef = ref(db, "farmers");
    get(farmersRef).then((snapshot) => {
      const farmers = snapshot.val();
      if (farmers) {
        const found = Object.values(farmers).find(
          (farmer) => farmer.email === currentUser.email
        );
        if (found) {
          setIsFarmer(true);
          setFarmerData(found);
        } else {
          setIsFarmer(false);
        }
      }
    });
  }, [currentUser]);

  if (!currentUser) {
    return <div style={{ padding: 32 }}>Please log in to view your profile.</div>;
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(44,62,80,0.10)", padding: 32 }}>
      <h2 style={{ color: "#166534", marginBottom: 24 }}>Profile</h2>
      <div style={{ fontSize: "1.1rem" }}>
        <p><strong>Name:</strong> {currentUser.displayName || "N/A"}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
        {isFarmer ? (
          <>
            <p><strong>Role:</strong> Farmer</p>
            {farmerData && (
              <>
                <p><strong>Farm Name:</strong> {farmerData.farmName || "N/A"}</p>
                <p><strong>Location:</strong> {farmerData.location || "N/A"}</p>
                <p><strong>Phone:</strong> {farmerData.phone || "N/A"}</p>
              </>
            )}
          </>
        ) : (
          <p><strong>Role:</strong> User</p>
        )}
      </div>
    </div>
  );
};

export default Profile;