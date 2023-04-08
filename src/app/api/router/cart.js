var express = require("express");
var router = express.Router();

var Cart = require("../model/cart");

//get cart by table
router.get("/get/:table", async (req, res) => {
  try {
    const carts = await Cart.find({ table: req.params.table });
    if (!carts || carts.length === 0) {
      return res.status(404).send({ error: "No carts found for this table" });
    }
    res.send(carts);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

//add
router.post("/add", function (req, res){
  if(req.body){
    let cart = new Cart();
    cart.product_id = req.body.product_id;
    cart.price = req.body.price;
    cart.table = req.body.table;
    cart.quantity = req.body.quantity;
    cart.time = Date.now();
    cart.save();
    res.send({
      error: null,
      message: "Add cart successfully.",
      resolved: true,
    });
  } else {
    res.send({
      error: 400,
      message:" Do not save record",
    });
}
});

//api editproduct
router.put("/edit/:id", async function (req, res) {
  const { product_id , price, table, quantity, time} = req.body
  const cart = await Cart.findByIdAndUpdate(req.params.id, { product_id , price, table, quantity}, { new: true });
  if (cart) {
    res.send({
      error: null,
      message: "edit cart successfully.",
      resolved: true,
    });
  } else {
    res.json({
      error: 400,
      message: "Do not save record",
    });
  }
});

//delete product
router.delete("/delete/:id", async function (req, res) {
  const cart = await Cart.findByIdAndDelete(req.params.id);
  if (cart) {
    res.send({
      error: null,
      message: "delete cart successfully.",
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
