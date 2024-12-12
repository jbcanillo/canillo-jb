import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Define validation schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          values,
          { withCredentials: true } // Important: Include withCredentials to handle cookies
        );

        if (response.status === 200) {
          const userData = response.data;
          login(userData); // Assuming login function stores user info in context
          navigate("/"); // Redirect to homepage or dashboard
        }
      } catch (err) {
        console.error("Login error", err);
        formik.setErrors({
          general: "Invalid email and/or password. Please try again.",
        });
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card shadow-xl w-full bg-base-200 sm:w-96 card-bordered card-compact">
        <div className="card-title items-center justify-center">
          <h1 className="text-5xl font-bold m-5">Zemina</h1>
        </div>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input input-bordered w-full"
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input input-bordered w-full"
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>
            {/* Display general error message */}
            {formik.errors.general && (
              <div className="text-red-500">{formik.errors.general}</div>
            )}
            <button type="submit" className="btn btn-secondary w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;