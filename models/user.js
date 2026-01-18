/**
 * @fileoverview User model with Google OAuth and Stripe integration.
 * @module models/user
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

/** @see {import('../types').User} */
const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 },
    processedSessions: [String]  // Track processed Stripe sessions
});

// Add error handler for schema validation
userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('Duplicate key error'));
    } else {
        next(error);
    }
});

// Create and export User model
mongoose.model('users', userSchema);