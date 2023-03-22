const mongoose = require('mongoose');
const monSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required: false
    },
    desc: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    }
});
const mon = mongoose.model('mon', monSchema);
module.exports = mon;