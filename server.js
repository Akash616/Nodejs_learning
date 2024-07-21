const express = require('express')
const app = express(); //blueprint or map
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());  //req.body

//Middleware function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
  next(); //Move on to the next phase
}
app.use(logRequest); // tells express to use this for all routes.

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/', function (req, res) {
  res.send('Welcome to our Hotel');
});

//Import the router files
const personRoutes = require('./routes/personRoutes');
//Use the routes
app.use('/person', localAuthMiddleware, personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu', menuItemRoutes);
//app.use('/menu', localAuthMiddleware, menuItemRoutes);

//Access variables from .env file
const PORT = process.env.PORT || 3000;
//node ko jab hum online server pai host karta hai, online machine jaha host hota hai 
//uska bhi port number hota hai, usi port pai run hota hai. isliya why we declare like this PORT.
//If not means locally 3000, in our machine.
app.listen(PORT, () => {
    console.log("listening on port 3000");
}); //port