var express = require("express")
var createError = require('http-errors');
var path = require('path');
var mongoose = require('./config/connectdb');
var app=express();
const cors = require('cors');
app.use(cors())
app.use(express.json());
app.use('/product', require('./router/product'));
app.use('/booking', require('./router/booking'));
app.use('/cart', require('./router/cart'));
app.use('/auth', require('./router/login'));
app.use('/bill', require('./router/bill'));
var http = require('http');
var port = Number(process.env.PORT) || 3000;
app.set('port', port);
var server = http.createServer(app);
const startServer = server.listen(port);
console.debug(`Good look to you! ${port}`);
