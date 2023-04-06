const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    resID: {
      type: String,
      required: false
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        default: false
    },
    time: {
      type: String,
      default: false
  },
    note:{
      type: String,
      required: false
    },
    status:{
      type: Boolean,
      default: false
    },
    username:{
      type: String,
      required: false
    }
});
const booking = mongoose.model('booking', bookingSchema);
module.exports = booking;
