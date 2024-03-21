//server instantiate
const express = require("express")
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000

//middleware
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json()) //to get the data from the body

//Db connection
const dbConnect = require("./config/database");
dbConnect();

//routes
const user = require("./routes/user")
app.use("/api/v1" ,user);

//server started
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
});

