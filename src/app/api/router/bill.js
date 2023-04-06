var express = require("express");
var router = express.Router();
var Booking = require("../model/bill");

//GET
router.get("/list", async function (req, res){
  await Booking.find().then((data) =>{
    res.send(data);
  });
});

//ADD
router.post("/add", function (req, res){
  if(req.body){
    let bill = new bill();
    bill.bill_number = req.body.bill_number;
    bill.product_id = req.body.product_id;
    bill.quantity = req.body.quantity;
    bill.price = req.body.price;
    bill.date = Date.now();
    bill.cart_id = req.body.cart_id;
    bill.save();
    res.send({
      error: null,
      message: "Create bill successfully.",
      resolved: true,
    });
  } else {
    res.send({
      error: 400,
      message:" Do not save record",
    });
}
});

//UPDATE
router.put("/edit/:id", async function (req, res) {
  const { product_id, quantity, price, cart_id} = req.body
  const booking = await Booking.findByIdAndUpdate(req.params.id, { product_id, quantity, price, cart_id}, { new: true });
  if (bill) {
    res.send({
      error: null,
      message: "Edit bill OK!.",
      resolved: true,
    });
  } else {
    res.json({
      error: 400,
      message: "Do not save record",
    });
  }
});

//DELETE
router.delete("/delete/:id", async function (req, res) {
  const bill = await bill.findByIdAndDelete(req.params.id);
  if (bill) {
    res.send({
      error: null,
      message: "Delete bill OK!.",
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
