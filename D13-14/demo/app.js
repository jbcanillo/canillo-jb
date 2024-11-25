const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");
require("dotenv").config();

//Express app
const app = express();
const port = process.env.PORT || 3000;

//Middleware
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
app.use("/todos", todoRoutes);

//Start the server
app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
  dbConnect();
});
