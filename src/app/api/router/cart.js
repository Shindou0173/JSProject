var express = require("express");
var router = express.Router();

var Cart = require("../model/cart");

router.get("/list", async function (req, res){
  const cartList = await Cart.aggregate([
    {
      $match: {
        cartId: 'test2'
      },
    },
    {
      $lookup:{
        from: 'mon',
        foreignField: 'productId',
        localField: 'productId',
        as: 'mons'
      }
    },
    {
      $unwind: {
        path: '$mons',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        productId: '$mons.productId',
        productName: '$mons.name',
      }
    },
    {
      $project: {
        _id: 0,
        cartId: 1,
        price: 1,
        table: 1,
        quantity: 1,
        time: 1,
      }
    },
    {
      $sort: {
        time: 1
      }
    }
  ]);
  console.log(JSON.stringify(cartList))
  res.status(201).json(cartList);
});

router.post("/add", function (req, res){
  if(req.body){
    let cart = new Cart();
    cart.product_id = req.body.product_id;
    cart.price = req.body.price;
    cart.table = req.body.table;
    cart.quantity = req.body.quantity;
    cart.items = req.body;
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
      message: "edit product successfully.",
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
