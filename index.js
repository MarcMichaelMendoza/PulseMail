const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/key');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// Use body-parser middleware
app.use(bodyParser.json());

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
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React app
    app.use(express.static('client/build'));
    
    // Handle React routing, return all requests to React app
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);   