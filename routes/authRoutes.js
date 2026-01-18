/**
 * @fileoverview Authentication routes using Google OAuth via Passport.
 * @module routes/authRoutes
 */

const passport = require('passport');

/**
 * Register authentication routes.
 * 
 * @param {import('express').Application} app - Express application
 * @example
 * const authRoutes = require('./routes/authRoutes');
 * authRoutes(app);
 */
module.exports = (app) => {
    // OAuth routes
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']  })); 
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/surveys');
    });

    // User session routes
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};