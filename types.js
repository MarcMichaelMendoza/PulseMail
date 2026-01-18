/**
 * @fileoverview Shared type definitions for the survey application.
 * @module types
 */

/**
 * @typedef {Object} User
 * @property {string} _id - MongoDB ObjectId
 * @property {string} googleId - Google OAuth identifier
 * @property {number} credits - Available email credits
 * @property {string[]} processedSessions - Processed Stripe session IDs
 */

/**
 * @typedef {Object} Recipient
 * @property {string} email - Email address
 * @property {boolean} responded - Whether recipient has responded
 */

/**
 * @typedef {Object} Survey
 * @property {string} _id - MongoDB ObjectId
 * @property {string} title - Survey title
 * @property {string} subject - Email subject line
 * @property {string} body - Survey question content
 * @property {Recipient[]} recipients - Survey recipients
 * @property {number} yes - Yes response count
 * @property {number} no - No response count
 * @property {string} _user - Reference to User ObjectId
 * @property {Date} dateSent - When survey was sent
 * @property {Date} lastResponded - Last response timestamp
 */

/**
 * @typedef {Object} StripeSession
 * @property {string} id - Stripe session ID
 * @property {string} payment_status - Payment status ('paid', etc.)
 * @property {string} client_reference_id - Associated user ID
 * @property {string} url - Checkout URL
 */

module.exports = {};