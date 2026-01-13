const mongoose = require('mongoose');
const requiredLogin = require("../middlewares/requiredLogin");
const requiredCredits = require("../middlewares/requiredCredits");

const Survey = mongoose.model('surveys');

module.exports = (app) => {
    app.post('/api/surveys', requiredLogin, requiredCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        try {
            await survey.save();
            req.user.credits -= 1;
            await req.user.save();
            res.send(req.user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};