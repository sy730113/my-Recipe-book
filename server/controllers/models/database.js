const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Shubham_123:123456skT@cluster0.ld2mebh.mongodb.net/Recipe?appName=mongosh+2.0.2");

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to database');
});
require('./category');
require('./Recipe');