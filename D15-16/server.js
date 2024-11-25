const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

//Connect to MongoDB
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (e) {
    throw new Error("Error Occurred:", e);
  }
};

//Routes

//Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
  dbConnect();
});
