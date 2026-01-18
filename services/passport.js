/**
 * @fileoverview Passport.js configuration for Google OAuth authentication.
 * @module services/passport
 */

const passport = require('passport');
const keys = require('../config/key');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

// Passport session serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// This function is called to deserialize user instance from the session
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

// Google OAuth strategy configuration
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