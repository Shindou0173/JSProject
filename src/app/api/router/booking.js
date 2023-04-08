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
    booking.email = req.body.email;
    booking.date = req.body.date;
    booking.time = req.body.time;
    booking.note = req.body.note;
    booking.status = false;
    booking.username = req.body.username;
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

//Apply table
router.put("/apply/:id", async function (req, res) {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'true' }, { new: true });
    if (booking) {
      res.send({
        error: null,
        message: "Booking status updated successfully.",
        resolved: true,
      });
    } else {
      res.json({
        error: 400,
        message: "Record not found.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      error: 500,
      message: "Internal server error.",
    });
  }
});

//delete table
router.delete("/delete/:id", async function (req, res) {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (booking) {
    res.send({
      error: null,
      message: "delete booking successfully.",
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
