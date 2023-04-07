const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    product_id:{
        type:String,
        required:true
    },
    price:{
        type: String,
        required:true
    },
    table:{
        type: String,
        required:true
    },
    quantity:{
        type: String,
        required:true
    },
    time:{
        type: Date,
        default: Date.now()
    }
});
const cart = mongoose.model('cart', cartSchema);
module.exports = cart;
