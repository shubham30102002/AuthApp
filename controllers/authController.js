const bcrypt = require("bcrypt")
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup route handler
exports.signup = async (req, res) => {
    try {
        //get data
        const { name, email, password, role } = req.body;
        //check if user already exist
        const existingUser = await User.findOne({ email });
        //if user exist return 
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        //hashing password
        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password"
            });
        }

        //hw how to implement multiple try to hash password let say 3 times and then return error


        //create entry for user
        const user = await User.create({ name, email, password: hashPassword, role })
        return res.status(200).json({
            success: true,
            message: "User created successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be register, please try again later"
        });
    }
}



exports.login = async (req, res) => {
    try {
        //data fetch
        const { email, password } = req.body;
        //validation on email and password is empty or not
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully"
            })
        }

        //check if user is present in the database
        let user = await User.findOne({ email });
        //if not a register user
        if (!user) {
            return res.status(500).json({
                success: false,
                message: "User is not registered, please signup first."
            })
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };
        //verify password & generate JWT token
        if (await bcrypt.compare(password, user.password)) {
            //password is match
            let token = jwt.sign(payload, process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                });

            // console.log(typeof(user));
            user = user.toObject();//why we need this?
            user.token = token; //user ke andhar token banake usmein send kar diya
            user.password = undefined; // user ke object mein se password hata diya for security purpose

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //persent se 3 days cookie with stay   
                httpOnly: true, //cannot be accessed on client side

            }
            //cookie mein data pass kiya 
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully"
            })

            // res.status(200).json({
            //     success:true,
            //     token,
            //     user,
            //     message:'User Logged in successfully',
            // });

        } else {
            //password do not match
            return res.status(403).json({
                success: false,
                message: "Password incorrect!"
            })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login Failed!!"
        });
    }
}