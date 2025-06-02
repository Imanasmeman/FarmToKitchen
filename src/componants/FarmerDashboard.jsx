import React, { useState, useEffect } from "react";
import { ref, push, onValue } from "firebase/database";
import db from "../firebase/firebaseConfig";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // <-- import useAuth

const FarmerDashboard = () => {
  const { currentUser: user } = useAuth(); // <-- get user from context

  const [listing, setListing] = useState({
    name: "",
    price: "",
    description: "",
    photo: null,
  });
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [listings, setListings] = useState([]);

  // Fetch farmer's listings
  useEffect(() => {
    if (!user) return;
    const listingsRef = ref(db, `listings/${user.uid}`);
    const unsubscribe = onValue(listingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setListings(Object.values(data));
      } else {
        setListings([]);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      setListing((prev) => ({ ...prev, photo: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setListing((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUploading(true);

    try {
      let photoURL = "";
      if (listing.photo) {
        // Upload to Cloudinary
        const cloudName = "dsunltqxm";
        const unsignedPreset = "farm_uploads";
        const formData = new FormData();
        formData.append("file", listing.photo);
        formData.append("upload_preset", unsignedPreset);

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          formData
        );
        photoURL = res.data.secure_url;
      }

      // Save listing to Firebase
      const listingsRef = ref(db, `listings/${user.uid}`);
      await push(listingsRef, {
        name: listing.name,
        price: listing.price,
        description: listing.description,
        photo: photoURL,
        createdAt: Date.now(),
        listby: user.email,
      });

      setListing({ name: "", price: "", description: "", photo: null });
      setPreview(null);
    } catch (err) {
      setError("Failed to upload listing. " + err.message);
    }
    setUploading(false);
  };

  if (!user) {
    return <p>Please log in as a farmer to access your dashboard.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome, Farmer!</h2>
      <p>This is your dashboard. Here you can manage your farm profile, products, and orders.</p>

      <h3>Upload New Listing</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          name="name"
          type="text"
          placeholder="Product Name"
          value={listing.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={listing.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={listing.description}
          onChange={handleChange}
          required
        />
        <input
          name="photo"
          type="file"
          accept="image/*"
          onChange={handleChange}
          required
        />
        {preview && (
          <img src={preview} alt="Preview" width="120" style={{ marginTop: 10 }} />
        )}
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Listing"}
        </button>
      </form>

      <h3>Your Listings</h3>
      {listings.length === 0 ? (
        <p>No listings uploaded yet.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {listings.map((item, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                width: "220px",
                background: "#fafafa",
              }}
            >
              {item.photo && (
                <img
                  src={item.photo}
                  alt={item.name}
                  style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px" }}
                />
              )}
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <p style={{ fontSize: "0.9em" }}>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;