/*require("dotenv").config()
const mongoose = require("mongoose")



function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log("server is connected to DB")
    })
    .catch(err =>{
        console.log("Error connecting to DB")
        process.exit(1)
    })
   
    mongoose.connect(process.env.MONGO_URI)

}
module.exports =connectToDB*/

require("dotenv").config()
const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log("server is connected to DB")
    })
    .catch(err =>{
        console.log("Error connecting to DB:", err.message)
        process.exit(1)
    })
   
    mongoose.connect(process.env.MONGO_URI)

}
module.exports = connectToDB