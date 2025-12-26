const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/key');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// Set up authentication routes
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);   