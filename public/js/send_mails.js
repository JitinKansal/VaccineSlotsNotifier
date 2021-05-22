const nodemailer = require("nodemailer");
// const ejs = require('ejs');

async function Notify_through_mail(tosend,mailsubject,textToSend) {

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID, 
      pass: process.env.GMAIL_PASSWORD, 
    },
  });

  var options = {
    from: `"vaccineslotsnotifier"<${process.env.GMAIL_ID}>`, 
    to: tosend, 
    subject: mailsubject, 
    html: textToSend ,
  };


transporter.sendMail(options,function(error,info){
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log("Email sent" + info.response);
    }
});
};

module.exports = Notify_through_mail;
