const passport = require('passport');
const keys = require('../config/key');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

// Retrieve User model
const User = mongoose.model('users');

// Configure Passport to use Google OAuth strategy
passport.use(new googleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    new User({ googleId: profile.id }).save();
}));