const express = require('express');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/key');

const app = express();

// Configure Passport to use Google OAuth strategy
passport.use(new googleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);
    console.log('Profile:', profile);
}));

// Route to initiate Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']  })); 

// Callback route for Google OAuth
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 3000;
app.listen(PORT);   