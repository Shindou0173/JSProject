const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false
    },
    sdt: {
        type: String,
        required: false
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
      type: String,
      default: false
    },
    username:{
      type: String,
      required: false
    }
});
const booking = mongoose.model('booking', bookingSchema);
module.exports = booking;
