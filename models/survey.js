import mongoose from "mongoose";
const { Schema } = mongoose;
const recipientSchema = require("./recipient");

// Define Survey schema
const surveySchema = new Schema({
    title: String,
    subject: String,
    body: String,
    recipients: [recipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'users' },
    dateSent: Date,
    lastResponded: Date
});

// Create and export Survey model
mongoose.model('surveys', surveySchema);