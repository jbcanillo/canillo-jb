import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserManagement from "./pages/UserManagement";
import SeminarManagement from "./pages/SeminarManagement";
import BookingManagement from "./pages/BookingManagement";

function App() {

  useEffect(() => {
    document.title = "Sranimes";
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manage_users" element={<UserManagement />} />
            <Route path="/manage_seminars" element={<SeminarManagement />} />
            <Route path="/manage_bookings" element={<BookingManagement />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
