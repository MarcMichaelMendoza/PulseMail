const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/key');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// Configure cookie session middleware
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

// Initialize Passport middleware
app.use(passport.initialize());

// Use Passport session middleware
app.use(passport.session());

// Set up authentication routes 
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);   