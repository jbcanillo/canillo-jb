import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../contexts/ToastContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();
  const { showToastMessage } = useToast();
  const [generalError, setGeneralError] = useState(""); // For API errors

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Repeat password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      setGeneralError(""); // Reset the general error before submission

      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          values
        );
        if (response.status === 201) {
          showToastMessage(
            "Registration successful! You may now login",
            "success"
          );
          navigate("/login");
        }
      } catch (err) {
        // Set the general error to display
        setGeneralError("Registration failed. Please try again.");
        showToastMessage("Registration failed. Please try again.", "error");
        console.error("Registration error", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input input-bordered w-full"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="text-red-500">{formik.errors.firstName}</div>
          )}
        </div>

        <div>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input input-bordered w-full"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-red-500">{formik.errors.lastName}</div>
          )}
        </div>

        <div>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input input-bordered w-full"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}
        </div>

        <div>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input input-bordered w-full"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}
        </div>

        <div>
          <input
            id="repeatPassword"
            type="password"
            placeholder="Repeat Password"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input input-bordered w-full"
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword && (
            <div className="text-red-500">{formik.errors.repeatPassword}</div>
          )}
        </div>

        {/* Display general error */}
        {generalError && <div className="text-red-500">{generalError}</div>}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Processing..." : "Proceed"}
        </button>
      </form>
    </div>
  );
};

export default Register;
