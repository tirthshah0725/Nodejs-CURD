const mongoose = require("mongoose");

const menuitemschema = new mongoose.Schema({
    name:
    {
        type: String,
        require: true
    },
    price:
    {
        type: Number,
        require: true
    },
    taste:
    {
        type: String,
        enum: ['sweet','spicy','sour'],
        require: true
    },
    isdrink:
    {
        type: Boolean,
        default: false
    },
    ingredients:
    {
        type: [String],
        default: []
    },
    numsales:
    {
        type: Number,
        default: 0
    }
})

const menu = mongoose.model('Menu',menuitemschema);
module.exports = menu;