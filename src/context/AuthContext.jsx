import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("isLoggedIn"));
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");

  const login = (userEmail) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("email", userEmail);
    setIsLoggedIn(true);
    setEmail(userEmail); 
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setEmail("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, email, login, logout ,}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
