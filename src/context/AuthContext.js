import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Retrieve the initial auth state from local storage
  const initialAuthState = localStorage.getItem("auth") === "true";
  const [auth, setAuth] = useState(initialAuthState);

  // Store auth in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("auth", auth);
  }, [auth]);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
