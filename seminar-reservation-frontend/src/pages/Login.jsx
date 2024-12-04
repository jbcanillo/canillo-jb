import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../providers/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const userCredentials = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        userCredentials
      );

      if (response.status === 200) {
        const userData = response.data;
        login(userData);
        navigate("/");
      }
    } catch (err) {
      setError("Invalid email and/or password. Please try again.");
      console.error("Login error", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Login</h1>

      {/* Login form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        {/* Display error message*/}
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="btn btn-primary w-full">
          Proceed
        </button>
      </form>
    </div>
  );
};

export default Login;
