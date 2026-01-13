import mongoose from "mongoose";
const { Schema } = mongoose;

// Define Survey schema
const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;