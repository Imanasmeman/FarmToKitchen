import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth } from "../firebase/firebaseConfig";
import db from "../firebase/firebaseConfig";
import { useNavigate } from "react-router";
import axios from "axios";

const FarmerSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    produce: "",
    about: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, photo: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, phone, address, produce, about, photo } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // 1. Upload photo to Cloudinary (unsigned)
      let photoURL = "";
      if (photo) {
        const cloudName = "dsunltqxm";
        const unsignedPreset = "farm_uploads"; // You MUST create this preset in Cloudinary settings
        const formData = new FormData();
        formData.append("file", photo);
        formData.append("upload_preset", unsignedPreset);

        const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData);
        photoURL = res.data.secure_url;
      }

      // 2. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 3. Store farmer data in Realtime DB
      await set(ref(db, `farmers/${user.uid}`), {
        id: user.uid,
        name,
        email,
        phone,
        address,
        produce,
        about,
        photo: photoURL,
        role: "farmer",
        rating: 0
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Register as Farmer</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <input name="name" type="text" placeholder="Full Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
        <input name="phone" type="tel" placeholder="Mobile Number" onChange={handleChange} required />
        <input name="address" type="text" placeholder="Farm Address" onChange={handleChange} required />
        <input name="produce" type="text" placeholder="What do you produce?" onChange={handleChange} required />
        <textarea name="about" placeholder="Tell us about your farm..." onChange={handleChange} rows={4} />
        <input name="photo" type="file" accept="image/*" onChange={handleChange} />
        {preview && <img src={preview} alt="Preview" width="100" style={{ marginTop: "10px" }} />}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default FarmerSignup;
