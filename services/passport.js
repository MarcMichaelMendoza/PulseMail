const passport = require('passport');
const keys = require('../config/key');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

// Retrieve User model
const User = mongoose.model('users');

// This function is called to serialize user instance to the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// This function is called to deserialize user instance from the session
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

// Configure Passport to use Google OAuth strategy
passport.use(new googleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
            // User already exists
            done(null, existingUser);
        } else {
            // Create a new user
            new User({ googleId: profile.id }).save().then(user => done(null, user));
        }
    });
}));