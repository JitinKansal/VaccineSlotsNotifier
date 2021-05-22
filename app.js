if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/user');

const checkSlots_Notify = require('./public/js/Notify_App');
const send_mails = require('./public/js/send_mails');
const verifyMailTemp = require('./public/js/Mail_Maker_API/verifyMailTemp');
const seedDb = require('./seed');

mongoose.connect(process.env.DB_URL,
    {
        useNewUrlParser: true, 
        useCreateIndex:  true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(()=>{
        console.log("DB Connected");
    })
    .catch((err)=>{
        console.log("Something went wrong");
        console.log(err);
    })

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.render('index');
})

app.get('/privacy', (req,res)=>{
    res.render('privacy');
})

app.post('/verifymail',async(req,res)=>{
    const search = await User.find({"data.mailId":req.body.user.mailId});
    if(search[0])
    {
        res.render('already_registered');
    }
    else{
        const content = verifyMailTemp(req.body.user.name,req.body.user.pincode,req.body.user.mailId,req.body.user.minage,req.body.user.dose);
        await send_mails(req.body.user.mailId,"Verify your mail!",content);
        res.render('sucess');
    }
});


app.get('/register',async(req,res)=>{
    const pin = req.query.pincode;
    const search = await User.find({pincode:pin});
    if(search.length>0){
        console.log("Pincode Already Exist");
        const obj={
            name:req.query.name,
            mailId:req.query.mailId,
            minage:req.query.minage,
            dose:req.query.dose,
            slotsnotified:0,
        }
        // console.log(search[0].data);
       search[0].data.push(obj);
       await search[0].save();
    }
    else{
        console.log("Pincode Is New Creating Entry");
        const obj = {
            pincode:pin,
            data:[{
                name:req.query.name,
                mailId:req.query.mailId,
                minage:req.query.minage,
                dose:req.query.dose,
                slotsnotified:0,
            }]
        }
        await User.create(obj);
    }
    res.render('mailverified');
});

app.get('/unsubscribe',async(req,res)=>{
    const searchUser = await User.find( { pincode:req.query.pincode})
    for(i=0;i<searchUser[0].data.length;i++)
    {
        if(searchUser[0].data[i].mailId === req.query.mailId)
        {
            obj = searchUser[0].data[i];
            searchUser[0].data.pull(obj);
            await searchUser[0].save();
            break;
        }
    }
    res.render('unsubscribed');
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

 async function main(){
     while(true){
        console.log("/////////////////////New call//////////////////////////");
        await checkSlots_Notify();
        await sleep(20000);
     }

 }


// seedDb();

 main();

app.listen(process.env.PORT || 3000,()=>{
    console.log(`server running at portal ${process.env.PORT} or at 3000.`);
})


