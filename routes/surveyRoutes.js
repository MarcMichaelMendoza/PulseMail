const mongoose = require('mongoose');
const requiredLogin = require("../middlewares/requiredLogin");
const requiredCredits = require("../middlewares/requiredCredits");
const Mailer = require("../services/mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model('surveys');

module.exports = (app) => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for your Feedback!');
    });

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