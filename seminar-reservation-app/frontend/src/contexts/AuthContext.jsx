import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Create a context for authentication
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
 
  // On component mount, check if the user is authenticated based on backend token validation
  useEffect(() => {
    // Make an authenticated request to check user session based on cookies
    const checkAuthStatus = async () => {
      try {
        // Send request to backend to verify token via middleware
        const response = await axios.get(
          "http://localhost:5000/api/auth/status",
          { withCredentials: true }
        );
        // If token is valid, set authenticated state and user data
        setIsAuthenticated(true);
        setUser(response.data.user); // Assuming the response contains the user
      } catch (error) {
        // If the request fails (i.e., token is invalid or expired), set unauthenticated state
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    checkAuthStatus(); // Trigger the check on mount
  }, []);

  // Login function to set user and authentication state
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    //Cookies.set('user', JSON.stringify(userData), { expires: 7 });
  };

  // Logout function to reset state and clear cookies
  const logout = () => {
    try {
      // Call the backend to clear the httpOnly authToken cookie
      axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      // Reset the state in frontend
      setUser(null);
      setIsAuthenticated(false);

      // Remove the user and authToken from client-side cookies (non-httpOnly)
      Cookies.remove("user");
      Cookies.remove("authToken");
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
