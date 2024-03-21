const express = require("express");
const router = express.Router();

//import controller
const {login, signup} = require("../controllers/authController");

//mapping routes with controller
// router.post("/login", login);`
router.post("/signup", signup);


//exporting
module.exports = router;