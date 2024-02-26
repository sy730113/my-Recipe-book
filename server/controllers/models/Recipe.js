const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   ingredients:{
    type:Array,
    required:true
   },
   category:{
   type:String,
   enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian','Spanish'] 
   },
   image:{
    type:String,
    required:true
   }
});
recipeSchema.index({name:'text',description:'text',email:'text'})
module.exports = mongoose.model("Recipe", recipeSchema);
