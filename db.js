const mongoose = require('mongoose')
// require('dotenv').config();

//Mongodb URL
const mongourl = 'mongodb://127.0.0.1:27017/hotels'
// const mongourl = process.env.DB_URL;

//connection
mongoose.connect(mongourl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection

//define event listeners for database connection
db.on('connected', () => {
    console.log("Connected to server");
})
db.on('error', (err) => {
    console.log("Error to server",err);
})
db.on('disconnected', () => {
    console.log("disconnected to server");
})

//Export the database connection
module.exports = db