import React from "react";
import { AuthProvider } from "./AuthContext.js";
import { WalletProvider } from "./WalletProvider.js";
import { CategoryProvider } from "./CategoryProvider.js";
const AppContext = React.createContext();

// Create a custom hook that will access all contexts
export const useAppContext = () => {
  return React.useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <WalletProvider>
        <CategoryProvider>{children}</CategoryProvider>
      </WalletProvider>
    </AuthProvider>
  );
};
