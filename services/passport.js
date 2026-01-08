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
passport.use(new googleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    },  
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id })
        if (existingUser) {
            // User already exists
            return done(null, existingUser);
        } 
        // Create a new user
        const user = await new User({ googleId: profile.id }).save()
        done(null, user);
    }
));