/**
 * @fileoverview Survey management routes for creating and sending email surveys.
 * @module routes/surveyRoutes
 */
const _ = require('lodash');
const { Path }  = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requiredLogin = require("../middlewares/requiredLogin");
const requiredCredits = require("../middlewares/requiredCredits");
const Mailer = require("../services/mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const path = require('path');
const { url } = require('inspector');

const Survey = mongoose.model('surveys');

/**
 * Register survey-related routes.
 *
 * @param {import('express').Application} app - Express application
 * @example
 * const surveyRoutes = require('./routes/surveyRoutes');
 * surveyRoutes(app);
 */
module.exports = (app) => {
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for your Feedback!');
    });

    /** * Handle incoming survey webhook events.
     * 
     * @route POST /api/surveys/webhooks
     * @throws {400} Invalid webhook payload
     */
    app.post('/api/surveys/webhooks', (req, res) => {
        // Define the path pattern 
        const pattern = new Path('/api/surveys/:surveyId/:choice');

        // Process each event in the webhook payload
        const events = _.chain(req.body)
            .map(({ email, url }) => {
                const match = pattern.test(new URL(url).pathname);
                if (match) {
                    return {
                        email, 
                        surveyId: match.surveyId, 
                        choice: match.choice
                    }
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .values();

        console.log(events);

        res.send(); // Respond with 200 OK

    });

    /**
     * Create and send a survey via email.
     * 
     * @route POST /api/surveys
     * @middleware requiredLogin, requiredCredits
     * @throws {422} Invalid recipients or email send failure
     */
    app.post('/api/surveys', requiredLogin, requiredCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        const recipientForms = recipients.split(',').map(email => ({ email: email.trim() }));
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipientForms,
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();

            // Deduct one credit from the user and return updated user
            req.user.credits -= 1;
            await req.user.save();
            return res.send(req.user);
        } catch (err) {
            return res.status(422).send(err);
        }

    });
};