import mongoose from "mongoose";
const portfolioSchema = new mongoose.Schema(
    {
       fullname:{type:String, required:true, trim:true},
email:{type:String, required:true, trim:true},
title:{type:String, required:true, trim:true},
        category:{type:String,default:"Web development"},
        urlive:{type:String},
        description:{type:String},
        image:{type:String},
         
    }
)
const Portfolio=mongoose.model("Portfolio",portfolioSchema);
export default Portfolio;