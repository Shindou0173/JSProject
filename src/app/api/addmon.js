const express = require("express")
var createError = require('http-errors');
var path = require('path');
const app=express();
app.use(express.json());



//connect db
var mongoose = require('./config/connectdb');

app.use('/product', require('./router/product'));

app.listen(3000,()=>{
    console.log("On port 3000")
})
module.exports = app;