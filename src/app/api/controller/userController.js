// var User = require('../models/user')
// var Food = require('../models/food')
// var Cart = require('../models/cart')
// var Order = require('../models/order')
// var Feedback = require('../models/feedback')
// exports.myProfile = (req, res) => {
//     User.findOne({ _id: req.userId }, (error, user) => {
//         if (error) {
//             console.log("something went wrong!!")
//             res.json({ errormsg: "something went wrong!!" });
//         }
//         else {
//             res.status(200).json({ user: user, msg: "all ok from myprofile" })
//         }
//     }).select("-password").select("-blocked").select("-role")
// }


// exports.editProfile = (req, res) => {
//     let emailchange;
//     if (req.email == req.body.email) {
//         emailchange = "no"
//     }
//     else {
//         emailchange = "yes"
//     }
//     User.updateOne({ _id: req.userId }, {
//         name: req.body.name,
//         email: req.body.email,
//         contact: req.body.contact
//     }, function (err, user) {
//         if (err) {
//             console.log("something went wrong!!")
//             res.json({ errormsg: "something went wrong!!" });
//         }
//         else {
//             console.log("edited profile");
//             res.status(201).json({ msg: "edited profile", emailchange: emailchange });
//         }
//     })
// }


// exports.getallFoodItem = (req, res) => {
//     Food.find({ foodavail: true }, (err, items) => {
//         if (err) {
//             console.log("some error while fethcing food userhome")
//             res.status(500).json({ errormsg: 'Somthing went wrong' })
//         }
//         res.status(200).json({ msg: items })
//     })
// }

// function decrementQuantity(req, res, id) {
//     Food.findOne({ _id: id }, (error, item) => {
//         if (error) {
//             console.log("something went wrong!!")
//             res.json({ errormsg: "something went wrong!!" });
//         }
//         else {
//             var avail = true;
//             let qty = item.foodqty;
//             if (qty - 1 == 0) {
//                 avail = false;
//             }
//             Food.updateOne({ _id: id }, {
//                 foodqty: qty - 1,
//                 foodavail: avail
//             }, function (err, data) {
//                 if (err) {
//                     console.log("something went wrong!!")
//                     res.json({ errormsg: "something went wrong!!" });
//                 }
//                 else {
//                     // **************************************************
//                     // const io = req.app.get('io');
//                     // io.emit("cart", "item added or removed from cart by user");
//                     // **************************************************
//                     console.log("edited(decrement) quantity");
//                 }
//             })
//         }
//     })
// }

// function intcrementQuantity(req, res, id) {
//     Food.findOne({ _id: id }, (error, item) => {
//         if (error) {
//             console.log("something went wrong!!")
//             res.json({ errormsg: "something went wrong!!" });
//         }
//         else {
//             let qty = item.foodqty;
//             qty += req.body.foodqty;
//             Food.updateOne({ _id: id }, {
//                 foodqty: qty,
//                 foodavail: true
//             }, function (err, data) {
//                 if (err) {
//                     console.log("something went wrong!!")
//                     res.json({ errormsg: "something went wrong!!" });
//                 }
//                 else {
//                     // **************************************************
//                     // const io = req.app.get('io');
//                     // io.emit("cart", "item added or removed from cart by user");
//                     // **************************************************
//                     console.log("edited(increment) quantity");
//                 }
//             })
//         }
//     })
// }

// exports.sendFeedback = (req, res) => {
//     var today = new Date();
//     var date = today.toJSON().slice(0, 10);
//     var fb = new Feedback({
//         userid: req.userId,
//         useremail: req.email,
//         name: req.body.name,
//         feedback: req.body.feedback,
//         date: date
//     })
//     fb.save(async (error, a) => {
//         if (error) {
//             console.log("something went wrong while sending feedback!!")
//             res.json({ errormsg: "something went wrong!!" });
//         }
//         else {
//             console.log("successfully send your feedback");
//             res.json({ msg: "successfully send your feedback" });
//         }
//     })
// }


// exports.qrCode = (req, res) => {
//     var id = req.body.id
//     Order.findOne({ _id: id }, (err, order) => {
//         if (err) {
//             console.log("error while scanning qr code of by user");
//             return res.json({ errormsg: 'Somthing went wrong' });
//         }
//         if (order.paymentstatus == "paid") {
//             if (order.status == "completed") {
//                 Order.updateOne({ _id: req.body.id }, { status: "picked up" }, (err, done) => {
//                     if (err) {
//                         console.log("error while scanning qr code and updating status of by user");
//                         return res.json({ errormsg: 'Somthing went wrong' });
//                     }
//                     else {
//                         console.log("order status is updated with qr code");
//                         const io = req.app.get('io');
//                         io.emit(req.body.email, "order status updated");
//                         io.emit("orderdelete", "order status updated");
//                         res.json({ msg: "successfully order confirmation done" });
//                     }
//                 })
//             }
//             else {
//                 console.log("your order is preparing");
//                 return res.json({ errormsg: 'your order is preparing' });
//             }
//         }
//         else {
//             console.log("your payment status must be paid");
//             return res.json({ errormsg: 'you need to pay first' });
//         }
//     })
// }



// exports.paymentDone = (req, res) => {
//     Order.updateOne({ _id: req.body.id }, { paymentstatus: "paid" }, (err, done) => {
//         if (err) {
//             console.log("error in paytm gateway by user");
//             return res.json({ errormsg: 'Somthing went wrong' });
//         }
//         else {
//             console.log("order payment status updated by paytm gateway");
//             const io = req.app.get('io');
//             io.emit(req.body.email, "payment status updated");
//             io.emit("orderdelete", "payment status updated");
//             res.json({ msg: "successfully updated payment status!" });
//         }
//     })
// }

// exports.paymentDoneWeb = (req, res) => {
//     Order.updateOne({ _id: req.body.id }, { paymentstatus: "paid" }, (err, done) => {
//         if (err) {
//             console.log("error in paytm gateway by user");
//             return res.json({ errormsg: 'Somthing went wrong' });
//         }
//         else {
//             console.log("order payment status updated by paytm gateway");
//             const io = req.app.get('io');
//             io.emit(req.body.email, "payment status updated");
//             io.emit("orderdelete", "payment status updated");
//             res.json({ msg: "successfully updated payment status!" });
//         }
//     })
// }
