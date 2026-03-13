const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requiredLogin = require('../middlewares/requiredLogin');
const requiredCredits = require('../middlewares/requiredCredits');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
    app.get('/api/surveys', requiredLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false })
            .sort({ dateSent: -1 });
        res.send(surveys);
    });

    app.delete('/api/surveys/:surveyId', requiredLogin, async (req, res) => {
        try {
            await Survey.deleteOne({
                _id: req.params.surveyId,
                _user: req.user.id
            });
            const surveys = await Survey.find({ _user: req.user.id })
                .select({ recipients: false })
                .sort({ dateSent: -1 });
            res.send(surveys);
        } catch (err) {
            res.status(422).send({ error: 'Error deleting survey' });
        }
    });

    app.get('/api/surveys/:surveyId/:choice', async (req, res) => {
        const { surveyId, choice } = req.params;

        if (choice !== 'yes' && choice !== 'no') {
            return res.status(400).send('Invalid choice');
        }

        try {
            await Survey.updateOne(
                { _id: surveyId },
                {
                    $inc: { [choice]: 1 },
                    $set: { lastResponded: new Date() }
                }
            );
        } catch (err) {
            console.error('Vote recording error:', err.message);
        }

        const isYes = choice === 'yes';
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Thank You — PulseMail</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
                        background: #0d1117;
                        color: #e6edf3;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                        padding: 24px;
                    }
                    .card {
                        background: #161b22;
                        border: 1px solid #30363d;
                        border-radius: 12px;
                        padding: 48px 40px;
                        max-width: 480px;
                        width: 100%;
                        text-align: center;
                    }
                    .icon {
                        width: 64px;
                        height: 64px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 24px;
                        background: ${isYes ? 'rgba(35,134,54,.2)' : 'rgba(31,111,235,.2)'};
                    }
                    .icon svg {
                        width: 32px;
                        height: 32px;
                        color: ${isYes ? '#3fb950' : '#58a6ff'};
                    }
                    h1 {
                        font-size: 24px;
                        font-weight: 600;
                        margin-bottom: 12px;
                    }
                    p {
                        font-size: 16px;
                        color: #8b949e;
                        line-height: 1.6;
                        margin-bottom: 8px;
                    }
                    .response-badge {
                        display: inline-block;
                        margin-top: 16px;
                        padding: 4px 16px;
                        border-radius: 20px;
                        font-size: 14px;
                        font-weight: 600;
                        background: ${isYes ? 'rgba(35,134,54,.15)' : 'rgba(218,54,51,.15)'};
                        color: ${isYes ? '#3fb950' : '#f85149'};
                        border: 1px solid ${isYes ? 'rgba(35,134,54,.3)' : 'rgba(218,54,51,.3)'};
                    }
                    .footer {
                        margin-top: 32px;
                        padding-top: 20px;
                        border-top: 1px solid #30363d;
                        font-size: 12px;
                        color: #6e7681;
                    }
                </style>
            </head>
            <body>
                <div class="card">
                    <div class="icon">
                        <svg viewBox="0 0 16 16" fill="currentColor">
                            ${isYes 
                                ? '<path d="M8 16A8 8 0 108 0a8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z"/>'
                                : '<path d="M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0zm4.879-2.773l4.264 2.559a.25.25 0 010 .428l-4.264 2.559A.25.25 0 016 10.559V5.442a.25.25 0 01.379-.215z"/>'
                            }
                        </svg>
                    </div>
                    <h1>Thank you for your feedback!</h1>
                    <p>Your response has been recorded successfully.</p>
                    <span class="response-badge">You answered: ${choice.toUpperCase()}</span>
                    <div class="footer">Powered by PulseMail</div>
                </div>
            </body>
            </html>
        `);
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const pattern = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
            .map(({ email, url }) => {
                const match = pattern.test(new URL(url).pathname);
                if (match) {
                    return {
                        email, 
                        surveyId: match.surveyId, 
                        choice: match.choice
                    };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne(
                    {
                        _id: surveyId,
                        recipients: {
                            $elemMatch: { email: email, responded: false }
                        }
                    },
                    {
                        $inc: { [choice]: 1 },
                        $set: { 'recipients.$.responded': true, lastResponded: new Date() }
                    }
                ).exec();
            })
            .value();

        res.send({});
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
            console.error('Survey send error:', err.response ? err.response.body : err.message);
            return res.status(422).send(err);
        }

    });
};