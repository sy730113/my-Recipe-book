const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // You need to require the path module
require('dotenv').config();

const app = express();
const port = process.env.PORT;


app.use(express.static(path.join(__dirname, 'public')));
// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Correct views path
app.set('layout', 'layouts/main'); // Modified layout path

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(express.static("public"));

// Routes
const routes = require('./server/Routes/recipeRoutes.js');
app.use("/", routes);

module.exports = app;