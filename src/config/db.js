const mongoose = require("mongoose");
const {mongoUri} = require("./env");

const connectDb =  async() => {
    try{
    const conn = await mongoose.connect(mongoUri);
    console.log(`Database connected successfully : ${conn.connection.host}`);
    }
    catch (err){
    console.error("Database connection failed:" ,err.message);
    process.exit(1);
    }
};
module.exports = connectDb;
