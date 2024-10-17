const mongoose = require("mongoose")

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        // console.log("Connected to DB");
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB

// user name : pankajkumar48132
//  password : PankajJiet123