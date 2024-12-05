import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator"; // Fixed typo from "exresss-validator"

const router = express.Router();

// Register route
router.post(
  "/register",
  [
    // Validation middleware
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Password with 6 or more characters is required"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      // Check if user already exists
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create a new user
      user = new User(req.body);
      await user.save();

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d", // Token expiration time
      });

      // Set token in cookie
      res.cookie("auth_token", token, {
        httpOnly: true, // Prevent access to cookie via JavaScript
        secure: process.env.NODE_ENV === "production", // Use secure cookie in production
        maxAge: 86400000, // 1 day
      });

      return res.status(200).send({ message: "User registered OK" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

export default router;
