const nodemailer = require("nodemailer");

const {google} = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECTED_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECTED_URI);
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});

async function Notify_through_mail(tosend,mailsubject,textToSend) {
  try{

      const ACESS_TOKEN = await oAuth2Client.getAccessToken();
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: 'OAuth2',
          user: process.env.GMAIL_ID, 
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          acessToken: ACESS_TOKEN,
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
  }
  catch(err){
    console.log(err);
  }
};

module.exports = Notify_through_mail;
