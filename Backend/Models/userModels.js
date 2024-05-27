 // Here we are creating Modedels for data base


 // Import Mongoose package
 const MONGODB=require('mongoose');

 // here we are create schema by schema function
 const userSchema=new MONGODB.Schema({
    Firstname:{
        type:String,
        required:true
    },
    Lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

 });

 // Creating  Schema
 MONGODB.model("SalesAppUserData",userSchema)


 module.exports =userSchema;