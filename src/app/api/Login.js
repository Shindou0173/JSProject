const express = require("express")
const app=express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser"); // Add body-parser for parsing FormData

// DB connect
mongoose.connect("mongodb://127.0.0.1:27017/resmandb",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> {
    console.log('Database connection successful');
})
.catch((err) => {
    console.error('Database connection error', err);
});

// Set CORS headers
var cors = require('cors')
app.use(cors());

// Schema
const sch = {
  username: String,
  password: String,
  authority: String
};
const monmodel = mongoose.model("Accounts", sch);

// FETCH
app.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  monmodel.findOne({ username: username, password: password }, function(err, val) {
      if (err) {
          console.log("Failed!");
      } else {
          if (!val) {
              res.send(username+' | '+password);
          } else {
              const auth = val.authority;
              res.json(auth);
          }
      }
  });
});

app.listen(3000, () => {
  console.log("On port 3000");
});
