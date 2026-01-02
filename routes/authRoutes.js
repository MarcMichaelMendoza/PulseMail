const passport = require('passport');


module.exports = (app) => {
    // Route to initiate Google OAuth
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']  })); 

    // Callback route for Google OAuth
    app.get('/auth/google/callback', passport.authenticate('google'));

    // Route to get current logged-in user
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    // Route to log out user
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });
};