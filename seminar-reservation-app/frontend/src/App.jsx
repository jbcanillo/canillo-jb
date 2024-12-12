import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserManagement from "./pages/UserManagement";
import SeminarManagement from "./pages/SeminarManagement";
import BookingManagement from "./pages/BookingManagement";

function App() {
  useEffect(() => {
    document.title = "Zemina";
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/manage_users"
                element={
                  <Layout>
                    <UserManagement />
                  </Layout>
                }
              />
              <Route
                path="/manage_seminars"
                element={
                  <Layout>
                    <SeminarManagement />
                  </Layout>
                }
              />
              <Route
                path="/manage_bookings"
                element={
                  <Layout>
                    <BookingManagement />
                  </Layout>
                }
              />
              <Route
                path="/login"
                element={
                  <Layout>
                    <Login />
                  </Layout>
                }
              />
              <Route
                path="/register"
                element={
                  <Layout>
                    <Register />
                  </Layout>
                }
              />
              {/* Catch-all Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;