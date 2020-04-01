var mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    id: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

});

var ProductModel = mongoose.model('Product', ProductSchema)
module.exports = ProductModel