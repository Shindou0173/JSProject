var express = require("express");
var router = express.Router();

var Booking = require("../model/booking");

router.get("/list", async function (req, res){
  await Booking.find().then((data) =>{
    res.send(data);
  });
});

router.post("/add", function (req, res){
  if(req.body){
    let booking = new Booking();
    booking.name = req.body.name;
    booking.sdt = req.body.sdt;
    booking.date = req.body.date;
    booking.time = req.body.time;
    booking.number = req.body.number;
    booking.note = req.body.note;
    booking.save();
    res.send({
      error: null,
      message: "Add Booking successfully.",
      resolved: true,
    });
  } else {
    res.send({
      error: 400,
      message:" Do not save record",
    });
}
});

module.exports = router;
