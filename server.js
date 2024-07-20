const express = require('express')
const app = express(); //blueprint or map
const db = require('./db');

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

app.listen(3000, () => {
    console.log("listening on port 3000");
}); //port