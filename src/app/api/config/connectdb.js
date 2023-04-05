var mongoose = require('mongoose');
mongoose.connect(process.env.DBCONECT || `mongodb://127.0.0.1:27017/${process.env.DBNAME || 'resmandb'}`);
console.log('Connect mongodb resolved.');
