const express = require("express");
const router = express.Router();

//import controller
const {login, signup} = require("../controllers/authController");
//import middleware
const {auth, isStudent, isAdmin} = require("../middleware/authMiddleware");

//mapping routes with controller
router.post("/login", login);
router.post("/signup", signup);


//testing protected route for single middleware
router.get("/test", auth , (req,res) => {
    res.json({
        success:"true",
        message:"Welcome to the protected route for tests"
    })
})

//Protected Routes
router.get("/student", auth,isStudent , (req,res) => {
    res.json({
        success:"true",
        message:"Welcome to the protected route for student"
    })
})

router.get("/admin" , auth,isAdmin, (req,res) => {
    res.json({
        success:"true",
        message:"Welcome to the protected route for admin"
    })
});

//exporting
module.exports = router;