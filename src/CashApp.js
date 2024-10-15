import React from "react";
import "./styles/style.scss";
import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
import Wallets from "./pages/Wallets.js";
import Login from "./pages/Login.js";
import { AppProvider } from "./context/AppContext.js";
import { useAuth } from "./context/AuthContext.js";

function CashApp() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<ProtectedRouteLogin />} />
          <Route path="/" element={<ProtectedRoute />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

// <Route path="/login" element={<ProtectedRouteLogin />} />
//<Route path="/" element={<ProtectedRoute />} />

function ProtectedRoute() {
  const { auth } = useAuth();

  return auth ? <Wallets /> : <Navigate to="/login" />;
}

function ProtectedRouteLogin() {
  const { auth } = useAuth();

  return !auth ? <Login /> : <Wallets to="/" />;
}

export default CashApp;
