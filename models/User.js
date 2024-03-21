const mongoose = require("mongoose");


const userSchema = new mongoose.Schema( {
    name:{
        type:String,
        required: true,
        trim:true,
    },
    email:{
        type:String,
        required: true,
        trim:true,
    },
    password:{
        type:String,
        required: true,
    },
    role:{
        type:String,
        enum: ["Admin","Student","Visitor"] //role will be from these 3 values only
    }
})

module.exports = mongoose.model("user", userSchema);
