const keys = require('../config/key');
const stripe = require('stripe')(keys.stripeSecretKey);
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
    // Create a Stripe Checkout session
    app.post('/api/stripe', async (req, res) => {
        if (!req.user) {
            return res.status(401).send({ error: 'You must be logged in!' });
        }

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'PulseMail Email Credits',
                                description: '5 email credits',
                            },
                            unit_amount: 500, // $5.00 in cents
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${req.headers.origin}/surveys?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/surveys`,
                locale: 'auto',
                client_reference_id: req.user.id,
            });

            res.json({ url: session.url });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Verify payment on success redirect (simpler than webhooks for development)
    app.get('/api/stripe/success', async (req, res) => {
        const { session_id } = req.query;
        
        if (!session_id || !req.user) {
            return res.status(400).send({ error: 'Invalid request' });
        }

        try {
            const session = await stripe.checkout.sessions.retrieve(session_id);
            
            if (session.payment_status === 'paid' && session.client_reference_id === req.user.id) {
                // Add credits to user
                req.user.credits += 5;
                await req.user.save();
                res.send(req.user);
            } else {
                res.status(400).send({ error: 'Payment not completed' });
            }
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
};
