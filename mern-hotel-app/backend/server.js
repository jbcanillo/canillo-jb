import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';  // Explicit .js extension

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use routes
app.use("/api/users", userRoutes);

// Start the server
app.listen(3000, () => {
   console.log("Server running on http://localhost:3000");
});
