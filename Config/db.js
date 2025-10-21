const mongoose = require('mongoose')
const dotenv = require('dotenv').config()


const ConnectDB = async()=>{
    const conn = await mongoose.connect(process.env.DATABASE_URI)
    if(!conn){
        console.log("Database is not connected.")
    }
    else{
        console.log("Database is up.")
    }
}

module.exports = ConnectDB;