const express = require('express')
const app = express(); //blueprint or map
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());  //req.body

const MenuItem = require('./models/MenuItem');

app.get('/', function (req, res) {
  res.send('Welcome to ourHotel');
});

//Import the router files
const personRoutes = require('./routes/personRoutes');
//Use the routes
app.use('/person', personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu',menuItemRoutes);

//Access variables from .env file
const PORT = process.env.PORT || 3000;
//node ko jab hum online server pai host karta hai, online machine jaha host hota hai 
//uska bhi port number hota hai, usi port pai run hota hai. isliya why we declare like this PORT.
//If not means locally 3000, in our machine.
app.listen(PORT, () => {
    console.log("listening on port 3000");
}); //port