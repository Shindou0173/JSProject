var express = require("express");
var router = express.Router();
const bcrypt = require('bcrypt');
//DB connect
var Account = require("../model/account");

//POST
router.post("/RegisterClient", async (req, res) => {
  let data = new Account();
  //console.log(req.body);
    data.username= req.body.username;
    data.password=req.body.password;
    data.authority= "2";

if (data !==null) {
  await data.save();
  res.json({success: true})
}
});

//Register Admin
router.post("/RegisterAdmin", async (req, res) => {
  const data = new Account({
    username: req.body.username,
    password: req.body.password,
    authority: "1",
  });

  const val = await data.save().then(() => {
    res.status(201).json({ message: "Register successful", errorCode: 201 });
  });
});


//FETCH
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Account.findOne({ username });
  //Check User
  if (!user) {
    return res.status(401).json({ message: 'Login failed acc' });
  }else{
    //Check Password
    if(password != user.password){
      return res.status(401).json({ message: 'Login failed pass' });
    }else{
      res.json(user.authority);
    }
  }
});
module.exports = router;
