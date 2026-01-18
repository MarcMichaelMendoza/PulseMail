/**
 * @fileoverview Recipient subdocument schema for survey recipients.
 * @module models/recipient
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

/** @see {import('../types').Recipient} */
const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;