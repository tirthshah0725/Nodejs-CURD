const mongoose  = require("mongoose");

//define the person schema
const personschema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    age:
    {
        type: Number
    },
    work:
    {
        type: String,
        enum: ['chef','waiter','manager'],
        require: true
    },
    mobile:
    {
        type: String,
        require: true
    },
    email:
    {
        type: String,
        require: true,
        unique: true
    },
    address:
    {
        type: String
    },
    salary:
    {
        type: Number,
        require: true
    }
});

//create person model
const person = mongoose.model('Person',personschema);
module.exports = person
