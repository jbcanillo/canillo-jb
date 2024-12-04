import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../providers/ToastContext";

const Register = () => {
  const navigate = useNavigate();
  const { showToastMessage } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError("");

    // Check if passwords match
    if (password !== repeatPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    setIsSubmitting(true);

    const userCredentials = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        userCredentials
      );
      if (response.status === 201) {
        const userData = response.data;
        showToastMessage(
          "Registration successful! You may now login",
          "success"
        );
        navigate("/login");
      }
    } catch (err) {
      setError(err.response.data.error);
      showToastMessage("Registration failed. Please try again.", "error");
      console.error("Registration error", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Register</h1>
      <form onSubmit={handleRegistration} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
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
        <div>
          <input
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Proceed"}
        </button>
      </form>
    </div>
  );
};

export default Register;
