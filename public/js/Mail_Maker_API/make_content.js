
function content_maker(centers,dose ,minage){
    var slots_available = 0;
    var total_centers = 0;
    for(let i=0;i<centers.length;i++)
    {
        sessions = centers[i].sessions
        total_sessions = 0;
        for(let j=0;j<sessions.length;j++)
        {
            if(minage == sessions[j].min_age_limit)
            {
                if(dose === "dose1")
                {
                    total_sessions++;
                    slots_available += sessions[j].available_capacity_dose1;
                }
                else{
                    total_sessions++;
                    slots_available += sessions[j].available_capacity_dose2;
                }
            }
        }
        if(total_sessions > 0 )
        {
            total_centers++;
        }
    }

    body = `<td style="padding: 6px 0px 6px 15px;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;">  Slots available:</td>
               <td style="padding: 6px 0px 6px 15px;;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;">${slots_available}</td>
                </tr>
                <tr style="width: 669px;height: 30px;background-color: #efefef;">
                    <td style="padding: 6px 0px 6px 15px;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;">Age group:</td>
                    <td style="padding: 6px 0px 6px 15px;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;">${minage}+  </td>
                    <td style="padding: 6px 0px 6px 15px;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;">Date:  </td>
                    <td style="padding: 6px 0px 6px 15px;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;word-break: break-word; width: 144px;">${centers[0].sessions[0].date} onwards</td>
                </tr>
                <tr style="width: 669px;height: 30px;background-color: var(--white);">
                <td style="padding: 6px 0px 6px 15px;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;">  Centers Available</td>
                <td style="padding: 6px 0px 6px 15px;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;">${total_centers}</td>
                <td style="padding: 6px 0px 6px 15px;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;">  Dose</td>
                <td style="padding: 6px 0px 6px 15px;;height: 18px;opacity: 0.8;font-family: Arial;font-size: 11px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.64;letter-spacing: normal;color: #000000;">${dose}</td>
                </tr>`;

    return {body,slots_available};
}

module.exports = content_maker;