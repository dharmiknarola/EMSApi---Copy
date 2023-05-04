const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://dharmik:dharmik@cluster0.razemee.mongodb.net/EMsystem');
mongoose.connection.on("connected", function(){
    console.log("Application is connected to Database");
})

