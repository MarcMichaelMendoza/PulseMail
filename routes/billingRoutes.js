const keys = require('../config/key');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
    app.post('/api/stripe', async (req, res) => {
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
                success_url: `${req.headers.origin}/surveys`,
                cancel_url: `${req.headers.origin}/`,
            });

            res.json({ url: session.url });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};
