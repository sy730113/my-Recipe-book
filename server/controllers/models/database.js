const mongoose = require('mongoose');
require('dotenv').config(); // Load .env file

const uri = process.env.MONGODB_URI;

// ✅ Correct connection string
mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to database');
});

// Import your models
require('./category');
require('./Recipe');
