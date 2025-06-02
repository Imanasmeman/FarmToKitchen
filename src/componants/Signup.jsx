/* src/pages/Signup.jsx */
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import "./AuthStyles.css";

const Signup = () => {
  const { signup, googleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrMsg("");
    if (password !== confirmPass) {
      setErrMsg("Passwords do not match");
      return;
    }
    try {
      await signup(email, password);
      navigate("/");
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        {errMsg && <p className="error-msg">{errMsg}</p>}
        <form onSubmit={handleSignup}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} required />
          <button type="submit">Sign Up</button>
        </form>
        <div className="or-divider">or</div>
        <button className="google-btn" onClick={handleGoogleSignup}>
          <img className="google-icon small" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" /> Sign up with Google
        </button>
        <p className="switch-link">Already have an account? <Link to="/login">Log In</Link></p>
      </div>
    </div>
  );
};

export default Signup;