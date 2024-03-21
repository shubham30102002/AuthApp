const bcrypt = require("bcrypt")
const User = require("../models/User");

//signup route handler
exports.signup = async(req,res) => {
    try{
        //get data
        const {name,email, password, role} = req.body;
        //check if user already exist
        const existingUser = await User.findOne({email});
        //if user exist return 
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        //hashing password
        let hashPassword;
        try{
            hashPassword = await bcrypt.hash(password , 10);
        }catch(err){
            return res.status(500).json({
                success: false,
                message: "Error in hashing password"
            });
        }
        
        //hw how to implement multiple try to hash password let say 3 times and then return error


        //create entry for user
        const user = await User.create({name, email,password:hashPassword, role})
        return res.status(200).json({
            success: true,
            message: "User created successfully"
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be register, please try again later"
        });
    }
}