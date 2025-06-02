// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import Login from "./componants/Login"; // replace with your actual login page
import Signup from "./componants/Signup";
import Landing from "./componants/Landing";
import SignupFarmer from "./componants/SingnupFarmer";
import Header from "./componants/Header";
import FarmersList from "./componants/FarmerList";
import FarmerDashboard from "./componants/FarmerDashboard";
import ProductPage from "./componants/ProductPage";
import About from "./componants/About";
import Profile from "./componants/Profile";
import Footer from "./componants/Footer";

// import Home from "./pages/Home"; // replace with your actual homepage

const App = () => {
  return (
    <AuthProvider>
    
      <Router>
          <Header/>
        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/signup-farmer" element={<SignupFarmer />} />
          {/* Replace with your actual landing page */}
          <Route path="/login" element={<Login />} />
          {/* Add more routes as needed */}
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/farmers"  element={<FarmersList/>}/>
        <Route path="/profile"  element={<Profile/>}/>
          <Route path="/dashboard" element={<FarmerDashboard />} />
          <Route path="/Products"  element={<ProductPage/>}/>
          <Route path="/about"  element={<About/>}/>
          
                
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
            <Footer/>
      </Router>
  
    </AuthProvider>
  );
};

export default App;
