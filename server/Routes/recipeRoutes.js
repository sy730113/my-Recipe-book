const express = require('express');
const Router=express.Router();
const recipeController=require('../controllers/recipeController.js');
const multer=require('multer');


const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'public/uploads';
        // Synchronously create the directory if it doesn't exist
        if (!fs.existsSync(dir)) {
            mkdirp.sync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

Router.post("/submit-recipe", upload.single('image'), recipeController.submitRecipeOnPost);

Router.get("/",recipeController.signUp);
Router.post("/signup",recipeController.signUpOnPost);
Router.get("/login",recipeController.login);
Router.post("/loginOnPost",recipeController.loginOnPost);
Router.get("/home",recipeController.homepage);
Router.get("/categories",recipeController.exploreCategories);
Router.get("/recipes/:id",recipeController.exploreRecipes);
Router.get("/categories/:id",recipeController.exploreCategoriesById);
Router.post("/search",recipeController.exploreSearch);
Router.get("/explore-latest",recipeController.exploreLatest);
Router.get("/random-recipe",recipeController.exploreRandom);
Router.get("/submit-recipe",recipeController.submitRecipe);
Router.get("/recipes/delete/:id",recipeController.deleteRecipe);
Router.get("/recipes/update-recipe/:id",recipeController.updateMyRecipe);

Router.post("/recipes/update/:id",upload.single('image'),recipeController.updateRecipe);
// Router.post("recipes/updateById/:id",recipeController.updateRecipeById);
// Router.post("/submit-recipe",recipeController.submitRecipeOnPost);
module.exports=Router;