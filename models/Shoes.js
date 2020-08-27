const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const ShoesShema = new mongoose.Schema({

    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },

    price: {
        type: mongoose.Schema.Types.Number,
        required: true,
        min: 0
    },

    imageUrl: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    description: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    brand: {
        type: mongoose.Schema.Types.String
    },

    createdAt: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    creator: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    buyers : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

});

module.exports = new mongoose.model('Shoes', ShoesShema);