import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.js";
import data from "../dummy-backend/auth.json";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [missing, setMissing] = useState(false); // Changed to boolean
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Resetting error states
    setMissing(false);
    setErrorMessage("");

    if (!email || !password) {
      setMissing(true);
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const userExists = data.users.find((user) => user.email === email);

    if (!userExists) {
      setErrorMessage("A user with that email was not found.");
      return;
    }

    if (userExists.password !== password) {
      setErrorMessage("Email does not match the password.");
      return;
    }

    setAuth(true);
    navigate("/");
  };

  return (
    <div className="login-wrapper p-2">
      <h1 className="title mt-3">Welcome to Pocket</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-input">
          <label htmlFor="email">Email</label>
          <input
            className={` ${missing && !email && "empty"}`}
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-input">
          <label htmlFor="password">Password</label>
          <input
            className={` ${missing && !password && "empty"}`}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn-primary btn-large" type="submit">
          Login
        </button>
        {errorMessage && <div className="error-message p-1 mt-1">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default Login;
