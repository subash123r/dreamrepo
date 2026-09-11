const mongoose = require("mongoose"); 

const connectDB= async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mondo db connection is succesfull")
    } catch (error) {
        console.log("data base connection is error:",error.message)
        process.exit(1);
    }

}

module.exports= connectDB