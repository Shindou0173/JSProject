const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    product_id:{
        type:String,
        required:true
    },
    cartId: {
      type:String,
      required:true
    },
    price:{
        type: Number,
        required:true
    },
    table:{
        type: Number,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    time:{
        type: Date,
        default: Date.now()
    }
});
const cart = mongoose.model('cart', cartSchema);
module.exports = cart;
