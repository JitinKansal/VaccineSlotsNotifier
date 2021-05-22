const mongoose = require('mongoose');
const User = require('./models/user');

const users =[
    {
        pincode:"203394",
        data :[
        // {
        //     name: "Jitin Kansal",
        //     mailId: "jkansal312@gmail.com",
        //     dateOfNotification: "00-00-0000",
        //     minage:"18",
        //     dose:"dose1",

        // },
        {
            name: "Chirag Kaushik",
            mailId: "Chiragkaushik517@gmail.com",
            dateOfNotification: "00-00-0000",
            minage:"18",
            dose:"dose1",

        },
        {
            name: "Heidi Kans",
            mailId: "heidikans123@gmail.com",
            dateOfNotification: "00-00-0000",
            minage:"45",
            dose:"dose2",
        },
        {
            name: "Love Agrawal",
            mailId: "Love Agrawal",
            dateOfNotification: "00-00-0000",
            minage:"18",
            dose:"dose1",
        },
        {
            name: "Nitish Agrawal",
            mailId: "nitish.ag1998@gmail.com",
            dateOfNotification: "00-00-0000",
            minage:"18",
            dose:"dose1",
        },
        ],
    },
    {
        pincode:"110096",
        data :[{
            name: "Neeraj Gupta",
            mailId: "Neeraj.neerajgupta26@gmail.com",
            dateOfNotification: "00-00-0000",
            minage:"18",
            dose:"dose1",
        },
        ],
    },
]

const seedDb = async ()=>{
    await User.insertMany(users);
    console.log("DB Seeded");
}


module.exports  = seedDb; 