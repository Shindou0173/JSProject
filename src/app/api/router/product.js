var express = require("express");
var router = express.Router();
var Mon = require("../model/mon");

//Get all
router.get("/list", async function (req, res) {
  let datas = [];
  await Mon.find().then((data) => {
    datas.push(data);
  });
  res.send(datas);
});

//Get Product By ID
router.get("/get/:id", async function (req, res) {
    const product = await Mon.findById(req.params.id);
    res.send(product);
});

//Get Product By Name
router.post("/name", async function (req, res) {
  const product = await Mon.findOne(req.params.name);
  res.send(product);
});

//Create
router.post("/add", function (req, res) {
  if (req.body) {
    let mon = new Mon();
    mon.name = req.body.name;
    mon.price = req.body.price;
    mon.desc = req.body.desc;
    mon.save();
    res.send({
      error: null,
      message: "Add product successfully.",
      resolved: true,
    });
  } else {
    res.json({
      error: 400,
      message: "Do not save record",
    });
  }
});

//api editproduct
router.put("/edit/:id", async function (req, res) {
  const { name , price , desc } = req.body
  const mon = await Mon.findByIdAndUpdate(req.params.id, {name , price , desc}, { new: true });
  if (mon) {
    res.send("Edit OK!");
  } else {
    res.json("Failed");
  }
});

//delete product
router.delete("/delete/:id", async function (req, res) {
  const mon = await Mon.findByIdAndDelete(req.params.id);
  if (mon) {
    res.send({
      error: null,
      message: "delete product successfully.",
      resolved: true,
    });
  } else {
    res.json({
      error: 400,
      message: "Do not save record",
    });
  }
});

module.exports = router;

