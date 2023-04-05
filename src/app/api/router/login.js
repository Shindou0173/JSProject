var express = require("express");
var router = express.Router();
//DB connect
var Account = require("../model/account");

//POST
router.post("/RegisterClient", async (req, res) => {
  let data = new Account();
  //console.log(req.body);
    data.username= req.body.username;
    data.password=req.body.password;
    data.authority= "0";

if (data !==null) {
  await data.save();
  res.json({success: true})
}
});

//POST
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
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Account.findOne({
    select: ['authority'],
    where: { username: username, password: password },
  });
  if (user) {
    res.status(200).json({ authority: user.authority });
  } else {
    res.status(401).send("failed");
  }
});
module.exports = router;
