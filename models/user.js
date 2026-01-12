const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define User schema
const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

// Create and export User model
mongoose.model('users', userSchema);