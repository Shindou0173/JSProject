const mongoose = require('mongoose');
const accountShema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  authority: {
    type: String,
    required: true,
  }
});

const account = mongoose.model("account", accountShema);

module.exports = account;
