var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=203394&date=14-05-2021';

const req = new XMLHttpRequest();

req.onload = function () {
    console.log(this.responseText);
}

req.onerror = function(){
    console.log(err);
}

req.open('GET', url);
req.send();
