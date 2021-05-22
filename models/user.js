const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    pincode:{
        type: String,
        required: true,
    },
    data :[{
        name:{
            type: String,
            required: true,

        },
        mailId:{
            type: String,
            required: true,
        },
        minage:{
            type: String,
            required: true,
        },
        dose:{
            type: String,
            required: true,
        },
        slotsnotified:{
            type: Number,
            required: true,
        },
    }],
});

const User = mongoose.model('User',userSchema);
module.exports = User;