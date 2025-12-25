const passport = require('passport');
const keys = require('../config/key');
const googleStrategy = require('passport-google-oauth20').Strategy;

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