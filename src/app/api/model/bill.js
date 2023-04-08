const mongoose = require('mongoose');
const billSchema = new mongoose.Schema({
    product_id:{
          type:String,
          required:false
    },
    quantity:{
        type: String,
        required:false
    },
    price:{
      type: String,
      required:false
    },
    date:{
        type: String,
        default: Date.now()
    },
    cart_id:{
        type: String,
        default: false
    }
});
const bill = mongoose.model('bill', billSchema);
module.exports = bill;
