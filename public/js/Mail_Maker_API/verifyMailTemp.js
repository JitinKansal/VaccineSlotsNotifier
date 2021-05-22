
function VerifymailContent(name,pincode,mailId,minage,dose){
    
    content = `<!DOCTYPE html>
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
                <p style="font-family: Arial; font-size: 11px;width: 147px;height: 12px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: #2e2e2e;">Dear ${name},</p>
            </td>
        </tr>
        <tr style=" width:800px; background: white;">
            <td style="padding: 0px 80px 0px 51px; font-size: 11px;font-family: Arial !important; padding-bottom: 20px; padding-top: 20px;">
                <table style="border-collapse: collapse;font-family: Arial !important; width: 100%; " align="center">
                    <tr style="text-align: left;background-color: #ebeced;width: 669px;height: 30px;">
                        <td colspan="4" style="padding: 6px 0px 6px 15px;font-weight: bold;border-radius: 4px;background-color: #cfcfcf;width: 98px;height: 18px;font-family: Arial;font-size: 11px; font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #2e2e2e; text-align:center">VaccineSlotsNotifier Mail Verification.</td>
                    </tr>
                    <tr style="width: 669px;height: 30px;background-color: var(--white);">
                    <td style="padding: 6px 0px 6px 15px;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;">  Click here to verify your mail</td>
                    <td style="padding: 6px 0px 6px 15px;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;">  
                    <a href="${process.env.MY_URL}register?name=${name}&pincode=${pincode}&mailId=${mailId}&minage=${minage}&dose=${dose}">
                    <button style="background-color: #0e3570; color: #ffffff;">Verify mail</button>
                    </a></td>
                    <td style="padding: 6px 0px 6px 15px;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;"></td>
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

    return content;
}

module.exports = VerifymailContent;