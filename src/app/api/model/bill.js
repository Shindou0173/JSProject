const mongoose = require('mongoose');
const billSchema = new mongoose.Schema({
    bill_number: {
      type:String,
      required:true
    },
    product_id:{
          type:String,
          required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    price:{
      type: Number,
      required:true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    cart_id:{
        type: String,
        default: true
    }
});
const bill = mongoose.model('bill', billSchema);
module.exports = bill;
