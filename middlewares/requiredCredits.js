/**
 * @fileoverview Middleware to ensure user has sufficient credits.
 * @module middlewares/requiredCredits
 */

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next
 * @throws {403} When user has insufficient credits
 */
module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enough credits!' });
    }
    next();
};