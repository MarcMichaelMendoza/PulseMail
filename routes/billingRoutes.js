/**
 * @fileoverview Stripe billing integration for purchasing email credits.
 * @module routes/billingRoutes
 */

const keys = require('../config/key');
const stripe = require('stripe')(keys.stripeSecretKey);
const requiredLogin = require('../middlewares/requiredLogin');
const mongoose = require('mongoose');
const User = mongoose.model('users');

/**
 * Register billing routes for Stripe integration.
 * 
 * @param {import('express').Application} app - Express application
 * @throws {Error} When Stripe API key is invalid
 */
module.exports = app => {
    app.post('/api/stripe', requiredLogin, async (req, res) => {
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

    /**
     * Development-only payment verification route.
     * In production, use Stripe webhooks instead.
     * 
     * @throws {400} Invalid session or user
     * @throws {500} Stripe API error
     */
    app.get('/api/stripe/success', async (req, res) => {
        const { session_id } = req.query;
        
        if (!session_id || !req.user) {
            return res.status(400).send({ error: 'Invalid request' });
        }

        // Check if session already processed
        if (req.user.processedSessions && req.user.processedSessions.includes(session_id)) {
            return res.send(req.user);  // Already processed, just return user
        }

        try {
            const session = await stripe.checkout.sessions.retrieve(session_id);
            
            if (session.payment_status === 'paid' && session.client_reference_id === req.user.id) {
                // Add credits to user
                req.user.credits += 5;
                if (!req.user.processedSessions) {
                    req.user.processedSessions = [];
                }
                req.user.processedSessions.push(session_id);
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

