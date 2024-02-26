require('./models/database');
const Category = require('./models/category');
const Recipe = require('./models/Recipe');
const file1 = require('../../public/js/ingredient');
const { response } = require('express');
const Signup=require('./models/signup');

// Call the addIngredients function

exports.signUp=async(req,res)=>{
    try{
        res.render('signup',{
            title:"Cooking Blog-Home",
            errorMessage:null
        })
}
    catch(err){
        res.status(500).send("Error Occured");
    }
}
exports.login=async(req,res)=>{
    try{
        const username=req.body.username;
        const password=req.body.password;
        const user=await Signup.find({});
        res.render('login',{
            title:'Cooking Blog Home',
            errorMessage:"Back to login page"
        });
}
    catch(err){
        res.status(500).send("Error Occured");
    }
}

// Assuming you have a model named Signup

exports.loginOnPost = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Signup.findOne({ username: username, password: password });

        if (user) {
            // If user is found, render a success message or redirect to home page
            res.redirect("/home");
           
        } else {
            // If user is not found, render the login page with an error message
            res.render('login', { title: 'Cooking Blog Home', errorMessage: 'Invalid username or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred');
    }
};

exports.signUpOnPost=async(req,res)=>{
    try{
            const username=req.body.username;
            const email=req.body.email;
            const password=req.body.password;
            const newUser=new Signup({
                username:username,
                email:email,
                password:password
            })
            const userSave=await newUser.save();
            res.render("login",{
                title:"Cooking Blog-Home",
                errorMessage:"Sign Up Successfull"
            });
        }

    catch(err){
        res.status(500).send("Error Occured");
    }

}














exports.homepage=async(req,res)=>{
try{
const limitNumber=4;
const categories=await Category.find({}).limit(limitNumber);
const latestRecipes=await Recipe.find({}).sort({_id:-1}).limit(6);
const thai=await Recipe.find({category:'Thai'}).sort({_id:-1}).limit(6);
const american=await Recipe.find({category:'American'}).sort({_id:-1}).limit(6);
const chinese=await Recipe.find({category:'Chinese'}).sort({_id:-1}).limit(6);
const food={latestRecipes,thai,american,chinese};
    res.render("index",{
        title:"Cooking Blog-Home",
        categories:categories,
        food:food
    });
}
catch(error){
res.status(500).send("Error Occured");
} 
}
//explore-Categories
exports.exploreCategories=async(req,res)=>{
    try{
    const limitNumber=20;
    const categories=await Category.find({}).limit(limitNumber);
        res.render("categories",{
            title:"Cooking Blog-Home",
            categories:categories
        });
    }
    catch(error){
    res.status(500).send("Error Occured");
    } 
    }


    exports.exploreRecipes=async(req,res)=>{
        try{
       let recipeId=req.params.id;
       const recipe=await Recipe.findById(recipeId);
            res.render("recipe",{
                title:"Cooking Blog-Home",
                recipe:recipe
            });
        }
        catch(error){
        res.status(500).send("Error Occured");
        } 
        }

    

exports.exploreCategoriesById = async (req, res) => {
    try {
        const id = req.params.id;
        const categoryById = await Category.findById({_id:id}); // Directly passing the ID
        const type = categoryById.type;
        const categoryByType = await Recipe.find({ category: type });
        res.render("myCategory", {
            title: "Cooking Blog-Home",
            categoryByType: categoryByType,
            categoryById: categoryById
        });
      

    } catch (error) {
        res.status(500).send("Error Occurred");
    }
}


//Search
exports.exploreSearch = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;

        // Ensure searchTerm is not empty before querying
        if (!searchTerm) {
            return res.status(400).json({ error: 'Search term is required' });
        }

        const recipeByCategory = await Recipe.find({ category: searchTerm });

// Next, perform a text search on indexed fields
const recipeByTextSearch = await Recipe.find(
    { $text: { $search: searchTerm, $diacriticSensitive: true } }
);

// Combine the results
const recipe = [...recipeByCategory, ...recipeByTextSearch];
       res.render('search',{
        title:"Search results",
        recipe:recipe
       })
    } catch (error) {
        console.error('Error searching recipes:', error);
        res.status(500).send("Error Occurred");
    }
};



exports.exploreLatest=async(req,res)=>{
    try{
const numberOfData=await Recipe.find({}).count();
   const latestRecipe=await Recipe.find({}).sort({_id:-1}).limit(numberOfData);
        res.render("explorelatest",{
            title:"Cooking Blog-Home",
            latestRecipe:latestRecipe
        });
    }
    catch(error){
    res.status(500).send("Error Occured");
    } 
}


exports.exploreRandom=async(req,res)=>{
    try{
const numberOfData=await Recipe.find({}).count();
const random=Math.floor(Math.random()*numberOfData);
   const randomRecipe=await Recipe.findOne().skip(random).exec();
        res.render("explore-random",{
            title:"Cooking Blog-Home",
            randomRecipe:randomRecipe
        });
    }
    catch(error){
        res.status(500).send("Error Occured");
    } 
}

exports.submitRecipe=async(req,res) => {
try{
    const recipe=await Recipe.find();
res.render("submitRecipe",{
    title:"Cooking Blog-Home",
    recipe:recipe
});
}
catch(error){
    res.status(500).send("Error Occured");
}
}

exports.submitRecipeOnPost=async(req,res) => {
    
        try {
            const { name, description, email, category } = req.body;
            
        const myingredients = req.body.ingredients;
        const ingredients=myingredients.split(',');
        // Collect ingredients into an array
        const image = req.file.filename; // Access uploaded file via req.file

        const recipe = new Recipe({ name, description, email, ingredients, category, image });
        await recipe.save();
        res.redirect("/submit-recipe");
          } catch (err) {
            res.status(400).json({ message: err.message });
          }
   
  
    }

    exports.deleteRecipe = async(req,res)=>{
        try{
       const deleteRecipe = req.params.id;
       await Recipe.findByIdAndDelete({_id:deleteRecipe});
       res.redirect('/home');
        }
        catch(err){
            res.status(500).send("Error Occured");
        }
    }

    exports.updateMyRecipe=async(req,res) => {
        try{
            const id=req.params.id;
            
            const recipe=await Recipe.findByIdAndUpdate({_id:id});
            if(recipe==null){
                res.redirect("/home");
            }
            else{
                res.render("edit",{
                    title:"Cooking Blog-Home",
                    recipe:recipe
                });
            }
     
        }
        catch(error){
            res.status(500).send("Error Occured");
        }
        }

        exports.updateRecipe = async (req, res) => {
            try {
                const id = req.params.id;
                const { name, description, email, category} = req.body;
                const ingredients=req.body.ingredients;
                // Check if ingredients are provided and convert to string
               
              
                // Collect ingredients into an array
                 

                let updateData = {
                    name: name,
                    description: description,
                    email: email,
                    category: category,
                    ingredients: ingredients.split(','),
                };
        
                // Check if a new image is uploaded
                if (req.file) {
                    updateData.image = req.file.filename;
                }
        
                const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, { new: true });
        
                if (!updatedRecipe) {
                    return res.status(404).send("Recipe not found");
                }
        
                res.redirect("/submit-recipe");
            } catch (err) {
                console.error(err);
                res.status(500).send("Error Occurred");
            }
        };
        

    // exports.updateRecipeById=async(req,res) => {
    
    //     try {
            
    //         const id = req.params.id; // Correct variable name
    //         const { name, description, email, category } = req.body;
            
    //     const myingredients = req.body.ingredients;
    //     const ingredients=myingredients.split(',');
    //     // Collect ingredients into an array
    //     const image = req.file.filename; // Access uploaded file via req.file

    //     const updateRecipe = await Recipe.findByIdAndUpdate({_id:id},{
    //        name:name,
    //        description:description,
    //        email:email,
    //        category:category,
    //        ingredients:ingredients,
    //        image:image 
    //     });
        
    //     res.redirect("/submit-recipe");
    //       } catch (err) {
    //         res.status(400).json({ message: err.message });
    //       }
   
  
    // }