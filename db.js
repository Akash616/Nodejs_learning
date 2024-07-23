const mongoose = require('mongoose');
require('dotenv').config();

//Define the MongoDB connection URL
//const mongoURL = process.env.MONGODB_URL_LOCAL //Replace 'hotels' with your database name
const mongoURL = process.env.MONGODB_URL;

//Set up MongoDB connection
mongoose.connect(mongoURL);

//Get the default connection
//Mongoose maintains a default object representing the MongoDB connection.
const db = mongoose.connection;

//Define event listeners for database connection

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('MongoDBConnected server:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

//EXPORT THE DATABASE CONNECTION
module.exports = db;
