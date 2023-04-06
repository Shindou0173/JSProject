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

//edit table
router.put("/edit/:id", async function (req, res) {
  const { name, sdt, number, note} = req.body
  const booking = await Booking.findByIdAndUpdate(req.params.id, { name, sdt, number, note}, { new: true });
  if (booking) {
    res.send({
      error: null,
      message: "edit booking successfully.",
      resolved: true,
    });
  } else {
    res.json({
      error: 400,
      message: "Do not save record",
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
