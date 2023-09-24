const mongoose = require('mongoose');

var mongoURL = 'mongodb+srv://surabhiya2001:USewcCKN0kYFxFgf@cluster0.whcyyv2.mongodb.net/bookRooms'

mongoose.connect(mongoURL, {useUnifiedTopology : true, useNewUrlParser : true})

var connection = mongoose.connection

connection.on('error', ()=>{
    console.log('mongo db connection failed');
})

connection.on('connected', ()=>{
    console.log('mongo db connection successful');
})

module.exports = mongoose