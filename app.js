const express = require('express');
const expressLayouts= require('express-ejs-layouts');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
require('dotenv').config(); // Load .env file

const port = process.env.PORT;
const app = express();
require('dotenv').config();
app.set('view engine','ejs');
app.set('layout',"./layouts/main");

app.use(bodyParser.urlencoded({ extended:true }));

app.use(express.urlencoded({extended:true}));

app.use(expressLayouts);

app.use(express.static("public"));
const routes=require('./server/Routes/recipeRoutes.js');
app.use("/",routes);

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
});