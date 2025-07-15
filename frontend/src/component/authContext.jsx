import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [role, setRole] = useState("");
  const [redirect, setRedirect] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser, showLoginModal, setShowLoginModal, role, setRole, redirect, setRedirect }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);