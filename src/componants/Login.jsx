import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import "./AuthStyles.css";

const Login = () => {
  const { login, googleLogin, setUserRole } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [role, setRole] = useState("consumer");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrMsg("");
    try {
      await login(email, password);
      setUserRole(role);
      navigate("/");
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      setUserRole(role);
      navigate("/");
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        {errMsg && <p className="error-msg">{errMsg}</p>}
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <div className="role-selector">
            <label>
              <input type="radio" name="role" value="consumer" checked={role === "consumer"} onChange={(e) => setRole(e.target.value)} /> Consumer
            </label>
            <label>
              <input type="radio" name="role" value="farmer" checked={role === "farmer"} onChange={(e) => setRole(e.target.value)} /> Farmer
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="or-divider">or</div>
        <button className="google-btn" onClick={handleGoogleLogin}>
          <img className="google-icon small" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" /> Continue with Google
        </button>
        <p className="switch-link">Don’t have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
