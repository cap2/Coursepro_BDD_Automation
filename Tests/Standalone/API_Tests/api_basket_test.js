const generic_code = require('../../../Generic_Code/custom_steps.js');

Feature('API Testing');

Scenario('api basket test', async (I)  => {
    let username_ecoded, data_json, postlogin, sessionID, basketcall, postbasket, basketID, basketstring,starter_sessioin,  starter_sessioinID;

    starter_sessioin = await I.sendGetRequest('/session');
    starter_sessioinID = starter_sessioin.data["sessionId"];
    username_ecoded = encodeURIComponent('coursepro+hp28@cap2.co.uk');//this changes the email to: coursepro%2Bhp28%40cap2.co.uk
    data_json = `username=${username_ecoded}&password=homeportal&in_kiosk_mode=`;
    postlogin = await I.sendPostRequest('/login', data_json, {"x-session-id": starter_sessioinID, "Content-Type": "application/x-www-form-urlencoded"});
    if(postlogin.status != 200)
    {
        generic_code.failTest('api basket test - login', 'Status was not 200')
    }
    else{
        sessionID = postlogin.data["session_id"];
    }
    basketstring = "courseId=1";
    postbasket = await I.sendPostRequest('/booking/basket/item/?'+ basketstring,"",{"x-session-id": sessionID});
    if(postbasket.status != 200)
    {
        generic_code.failTest('api basket test - basket item', 'Status was not 200')
    }
    basketcall = await I.sendGetRequest(`/booking/basket/?`,{"x-session-id" : sessionID});
    if(basketcall.status != 200)
    {
        generic_code.failTest('api basket test - basket call', 'Status was not 200')
    }
    else if(basketcall.data["state"] != "open")
    {
        generic_code.failTest('api basket test - basket calls state', 'was not "open"')
    }
});