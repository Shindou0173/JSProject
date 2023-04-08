const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    product_id:{
        type:String,
        required:false
    },
    price:{
        type: String,
        required:false
    },
    table:{
        type: String,
        required:false
    },
    quantity:{
        type: String,
        required:false
    },
    time:{
        type: Date,
        default: Date.now()
    }
});
const cart = mongoose.model('cart', cartSchema);
module.exports = cart;
