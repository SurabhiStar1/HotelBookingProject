const express = require('express')

const router = express.Router()
const path = require("path");

const cors = require("cors");
require('dotenv').config()

const shortid = require("shortid");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.use(cors());
const moment = require('moment')

const Booking = require('../models/booking')
const Room = require('../models/room')

router.post('/bookroom', async (req, res) => {
  const {
    room,
    userid,
    fromdate,
    todate,
    totalamount,
    totaldays,
    token
  } = req.body

  const payment_capture = 1;
  const options = {
    amount: totalamount * 100,
    currency: 'INR',
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log("response",response);
    console.log("helooooooooooooo");
    if (response) {
      // try {
        const newbooking = new Booking({
          room: room.name,
          roomid: room._id,
          userid,
          fromdate,
          todate,
          totalamount,
          totaldays,
          transacctionId: '1234'
        })
        const booking = await newbooking.save()
        const roomtemp = await Room.findOne({ _id: room._id })
        roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: fromdate, todate: todate, userid: userid, status: booking.status });
        await roomtemp.save()
    } 
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log('payment gateway unsuccessful',error);
  }

})

router.post('/getbookingsbyuserid', async(req,res)=>{
  const userid = req.body.userid
  try {
    const bookings = await Booking.find({userid:userid})
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({message: error});  }
})

router.post('/cancelbooking', async(req,res)=>{
  const {bookingid, roomid} = req.body
  try {
    const bookingItem = await Booking.findOne({_id:bookingid});
    bookingItem.status = 'cancelled';
    await bookingItem.save()
    const room = await Room.findOne({_id:roomid})
    const bookings = room.currentbookings
    const temp = bookings.filter(booking=> booking.bookingid.toString()!== bookingid)
    room.currentbookings = temp
    await room.save()

    res.send('Your booking Cancelled successfully')
  } catch (error) {
    return res.status(400).json({message: error});
  }
})

router.get('/getallbookings', async(req,res)=>{
    try {
      const bookings = await Booking.find()
      res.send(bookings)
    } catch (error) {
      return res.status(400).json({message: error});
    }
})
module.exports = router