const generic_code = require('../../../Generic_Code/custom_steps.js');

Feature('API Testing');

Scenario('api login test', async (I)  => {
    let username_ecoded, data_json, postlogin;

    username_ecoded = encodeURIComponent('coursepro+hp28@cap2.co.uk');//this changes the email to: coursepro%2Bhp28%40cap2.co.uk
    data_json = `username=${username_ecoded}&password=homeportal&in_kiosk_mode=`;
    postlogin = await I.sendPostRequest('/login', data_json, {"Content-Type": "application/x-www-form-urlencoded"});
    if(postlogin.status != 200)
    {
        generic_code.failTest('api login test', 'Status was not 200')
    }
    else{}
});