const mongoose = require('mongoose');
const monSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
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
