const express = require('express')

const router = express.Router()

const Room = require('../models/room')

router.get("/getallrooms", async(req, res)=>{
    try {
        const rooms = await Room.find({})
        return res.send(rooms)
    } catch (error) {
        return res.status(400).json({message: error});
    }
});

router.get('/', (req, res) => {
    res.send('The API is working');
});

router.post('/getroombyid', async(req, res)=>{
    const roomid = req.body.roomid
    try {
        const room = await Room.findOne({_id : roomid})
        return res.send(room);
    } catch (error) {
        return res.status(400).json({message: error})
    }
})

router.post('/addroom', async (req, res) => {
    try {
        console.log('new room ' ,req.body);
        const newroom = new Room(req.body);
        await newroom.save();
        res.json({ message: 'New room added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

