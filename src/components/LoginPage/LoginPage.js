import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/MyContext";
import { IoInformationCircleOutline } from "react-icons/io5";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
    navigate("/dashboard");
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h1>
          Login
          <span className="info-icon" onClick={toggleInfo}>
            <IoInformationCircleOutline />
          </span>
        </h1>
        {showInfo && (
          <div className="info-text">
            (Sample username | passwords:)
            <br />
            gau@email.com | password123
            <br />
            manoj@email.com | password123
            <br />
            mozhi@email.com | password123
            <br />
          </div>
        )}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <footer className="footer">Created by Gautham K</footer>
    </div>
  );
}

export default LoginPage;
