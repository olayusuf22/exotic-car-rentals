require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');
const carRoutes = require('./controllers/cars');


const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Morgan for logging HTTP requests
app.use(morgan('dev'));
// Serves static assets to the browser
app.use(express.static('public'));
// Middleware to parse URL-encoded data from forms
// express.urlencoded is what creates req.body
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Require the middleware that adds the user doc to the req & the res.locals objects
const addUserToReqAndLocals = require('./middleware/addUserToReqAndLocals');
// Be sure to mount after the session middleware above
app.use(addUserToReqAndLocals);


// Routes/Controllers

const ensureLoggedIn = require('./middleware/ensureLoggedIn');

// GET / (root/landing page)
app.get('/', async (req, res) => {
  res.render('home.ejs');
});

// '/auth' is a "starts with" path that all paths
// within authCtrl are appended to
app.use('/auth', require('./controllers/auth'));
app.use('/', require('./controllers/reservations'));
app.use('/cars', require('./controllers/cars'));
// If you wanted to protect ALL routes 
// app.use('/todos', ensureLoggedIn, require('./controllers/todos'));




app.get('/reservation', (req, res) => {
  const cities = ['New York', 'Los Angeles', 'Miami', 'Chicago', 'Houston', 'Dallas', 'Las Vegas'];
  res.render('reservation', { user: req.user, cities: cities });
});

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";
// An alternative to above
// const port = process.env.PORT || "3000";


// app.get('/', (req, res) => {
//   // Fetch or define the cars data
//   const cars = [
//     {
//       name: 'Ferrari',
//       locations: ['New York', 'Los Angeles']
//     },
//     {
//       name: 'Lamborghini',
//       locations: ['Miami', 'Chicago']
//     }
//     // Add more cars as needed
//   ];

//   // Render the home.ejs view, passing the cars data
//   res.render('home', { cars });
// });


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
