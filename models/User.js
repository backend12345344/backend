const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    }

    ,
    phone:{
        type:String,
        unique:true
    
    email:{
        type:String,
        unique:true,
    }

    ,

    password:{
        type:String,
    }

    ,

    age:{
        type:Number,
    }
})

module.exports = mongoose.model("User",userSchema);
