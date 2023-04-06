const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sdt: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    note:{
      type: String,
      required: false
    }
});
const booking = mongoose.model('booking', bookingSchema);
module.exports = booking;
