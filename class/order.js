var mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },
    
    name_order: {
        type: String,
        required: true
    },
    
    price_order: {
        type: Number,
        required: true,
    },

    ship_address: {
        type: String,
        required: true
    },

    billing_address: {
        type: String,
        required: true
    }

});

var OrderModel = mongoose.model('Order', OrderSchema)
module.exports = OrderModel