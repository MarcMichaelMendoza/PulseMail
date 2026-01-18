/**
 * @fileoverview Middleware to ensure user authentication.
 * @module middlewares/requiredLogin
 */

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next
 * @throws {401} When user not authenticated
 */
module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!' });
    }
    next();
};