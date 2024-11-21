const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

//Express app
const app = express();
const port = process.env.PORT || 3000;

//Connect to MongoDB
const dbConnect = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB')
    } catch (e) {
        throw new Error("Error Occurred:",e);
    }
}

//Start the server
app.listen(port,()=>{
    console.log(`Server is running in port ${port}`);
    dbConnect();
});
