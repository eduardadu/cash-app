import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.js";
import data from "../dummy-backend/auth.json";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle Submit with States - check if email and password were input
  const handleSubmit = (e) => {
    e.preventDefault();

    const userExists = data.users.find((user) => user.email === email);

    if (!email) {
      setState("NO_INPUT_USER");
      if (!password) {
        setState("NO_INPUT_PASSWORD");
      }
      return;
    }
    if (userExists) {
      if (userExists.password === password) {
        setState("LOGIN_SUCCESS");
        setAuth(true);
        navigate("/");
      } else {
        setState("PASSWORD_WRONG");
      }
    } else {
      setState("USER_NOT_FOUND");
    }
  };

  return (
    <div className="login-wrapper p-2">
      <h1 className="title mt-3">Welcome to Pocket</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-input">
          <label htmlFor="email">Email</label>
          <input
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
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn-primary btn-large" type="submit">
          Login
        </button>
      </form>
      {state && <p>{state}</p>} {}
    </div>
  );
}

export default Login;
