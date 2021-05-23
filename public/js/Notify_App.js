const mongoose = require('mongoose');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const User = require('../../models/user');

const send_mails = require('./send_mails');
const content_maker = require('./Mail_Maker_API/make_content');

function sendHttpRequest(method,url,data){
    const promise = new Promise((resolve,reject)=>{
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            resolve(myArr);
        }};
        xmlhttp.open(method, url, true);
        xmlhttp.send();
    });
    return promise;
}



// this is the main function
async function checkSlots_Notify() {
    const rawDate = new Date();
    const date = rawDate.getDate() + "-" + (rawDate.getMonth()+1) + "-" + rawDate.getFullYear();
    const currTimeHrs = rawDate.getHours();
    const currTimeMin = rawDate.getMinutes();

    if(currTimeHrs === 0 && currTimeMin > 10 && currTimeMin < 12)
    {
        await User.updateMany({},{$set:{"data.$[].slotsnotified":0}},{multi:true});
        console.log("Slotsnotified has been reset");
        return;
    }
    const Dbdata = await User.find({});

    Dbdata.forEach(async element => {
        let pincode = element.pincode; 
        const mailer_list = element.data;
        let url = process.env.COWIN_URL1+pincode+process.env.COWIN_URL2+date;

        var data = await sendHttpRequest('GET',url);

        var centers = data.centers;
        if(centers){
        for(let i=0;i<mailer_list.length;i++)
        {
            const {body,slots_available} = await content_maker(centers,mailer_list[i].dose,mailer_list[i].minage);
            if(slots_available>mailer_list[i].slotsnotified)
            {
                await User.updateOne({"data.mailId":mailer_list[i].mailId},{$set:{"data.$.slotsnotified":slots_available}});

                header = `<!DOCTYPE html>
                        <html>
                        <head>        </head>
                        <body style="font-family: Arial; font-size: 11px; line-height: 20px; width: 800px; margin: 0 auto; float: none; padding: 0px;color:#2e2e2e;">
                        <table class="font-family: Arial; border: 1px solid" align="center">
                        <tr class="width: 800px; border: 1px solid" align="center">
                        <td class="width: 800px; border: 1px solid" align="center">
                        <!--FIRST BRANCH -->
                        <table style="font-family: Arial !important; width: 800px; background: white; border-left: 1px darkgray solid; border-top: 1px darkgray solid; border-right: 1px darkgray solid; " align="center">
                        <tr style=" width:800px; background: white">
                        <td align="center">
                            <table>
                            <tr style="background:white;font-family: Arial !important;">
                                <td style="padding: 0px 80px 0px 51px; font-size: 11px;font-family: Arial !important;">
                                    <p style="font-family: Arial; font-size: 11px;width: 669px;height: 16px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: #2e2e2e; text-align: center;">THIS IS AN AUTO GENERATED MAIL. RESPONSES ARE NOT MONITORED. PLEASE DO NOT REPLY. </p>
                                    <p style="font-family: Arial; font-size: 11px;width: 147px;height: 12px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: #2e2e2e;">Dear ${mailer_list[i].name},</p>
                                </td>
                            </tr>
                            <tr style=" width:800px; background: white;">
                                <td style="padding: 0px 80px 0px 51px; font-size: 11px;font-family: Arial !important; padding-bottom: 20px; padding-top: 20px;">
                                    <table style="border-collapse: collapse;font-family: Arial !important; width: 100%; " align="center">
                                        <tr style="text-align: left;background-color: #ebeced;width: 669px;height: 30px;">
                                            <td colspan="4" style="padding: 6px 0px 6px 15px;font-weight: bold;border-radius: 4px;background-color: #cfcfcf;width: 98px;height: 18px;font-family: Arial;font-size: 11px; font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #2e2e2e; text-align:center">Covid-19 VaccineSlotsNotifier Alert.</td>
                                        </tr>
                                        <tr style="width: 669px;height: 30px;background-color: var(--white);">
                                            <td style="padding: 6px 0px 6px 15px;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;">  PIN:</td>
                                            <td style="padding: 6px 0px 6px 15px;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;">${pincode}</td>
                        `;

                footer = `
                <tr style="text-align: left;background-color: #ebeced;width: 669px;height: 30px;">
                <td colspan="4" style="padding: 6px 0px 6px 15px;font-weight: bold;border-radius: 4px;background-color: #cfcfcf;width: 98px;height: 18px;font-family: Arial;font-size: 11px; font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #2e2e2e; text-align:center">Register to get vaccinated now!</td>
                </tr>
                <tr style="width: 669px;height: 30px;background-color: var(--white);">
                <td style="padding: 6px 0px 6px 15px;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;">  Click here to register</td>
                <td style="padding: 6px 0px 6px 15px;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;"><a href="https://selfregistration.cowin.gov.in/">
                <button style="background-color: #0e3570; color: #ffffff;">Register</button>
                </a></td>
                <td style="padding: 6px 0px 6px 15px;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;">  Click here to unsubscribe</td>
                <td style="padding: 6px 0px 6px 15px;;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;">
                <a href="${process.env.MY_URL}unsubscribe?pincode=${pincode}&mailId=${mailer_list[i].mailId}">
                <button style="background-color: #0e3570; color: #ffffff;">Stop Alerts</button>
                </a></td>
                </tr>
                </table>
                </td>
                </tr>
                <tr style="background:white;font-family: Arial !important;">
                <td style="padding: 0px 80px 0px 51px; font-size: 11px;font-family: Arial !important;">
                <p style="margin:0;width: 669px;font-family: Arial;font-size: 13px;font-weight: bold;font-style: normal;font-stretch: normal;letter-spacing: normal;color: #2e2e2e;">Regards,</p>
                <p style="margin:0;padding-bottom:30px;width: 669px;font-family: Arial;font-size: 13px;font-weight: bold;font-style: normal;font-stretch: normal;letter-spacing: normal;color: #2e2e2e;">VaccineSlotsNotifier</p>
                </td>
                </tr>
                <tr>
                <td style="width:800px;height:38px;background-color: #0e3570;font-family: Arial;font-size: 11px;text-align: center;color: #ffffff;">Visit us at 
                <a style="color: #ffffff;" href="${process.env.MY_URL}">VaccineSlotsNotifier</a></td>
                </tr>
                </table>                                           
                </td>
                </tr>
                </table>
                </body>
                </HTML>`;

                contentToSend = header + body + footer ;
                console.log("sending mail to "+mailer_list[i].name);
                await send_mails(mailer_list[i].mailId,"VaccineSlotsNotifier Alert!",contentToSend);
            }
            else
            {   
                console.log("No new slots Available for "+mailer_list[i].name);                  
            }
        }
        }
    });
};

module.exports = checkSlots_Notify;