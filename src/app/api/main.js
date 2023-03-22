var express = require("express")
var createError = require('http-errors');
var path = require('path');
var mongoose = require('./config/connectdb');
var app=express();
app.use(express.json());
app.use('/product', require('./router/product'));
var http = require('http');
var port = Number(process.env.PORT) || 3000;
app.set('port', port);
var server = http.createServer(app);
const startServer = server.listen(port);
console.debug(`Good look to you! ${port}`);
