const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB Connection Successfull"))
    .catch((error) => {
        console.log("Error Recieved in db connection");
        console.error(error);
        process.exit(1);
    });
}

module.exports = dbConnect;