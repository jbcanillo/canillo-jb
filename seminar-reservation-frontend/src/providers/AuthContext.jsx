import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context for authentication
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // On component mount, check if token and user are stored in localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));  // Restore the user data from localStorage
    }
  }, []);

  // Login function to set user and authentication state
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    
    // Store user and token in localStorage
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
  };

  // Logout function to reset state and clear localStorage
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    // Remove token and user data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
