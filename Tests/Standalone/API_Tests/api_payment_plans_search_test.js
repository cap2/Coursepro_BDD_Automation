const generic_code = require('../../../Generic_Code/custom_steps.js');

Feature('API Testing');

Scenario('api payment plan search for basket test', async (I) => {
    let username_ecoded, data_json, postlogin, sessionID, postbasket, basketstring, starter_sessioin, starter_sessioinID, basketID, postpaymentdetailcall;

    starter_sessioin = await I.sendGetRequest('/session');
    starter_sessioinID = starter_sessioin.data["sessionId"];
    username_ecoded = encodeURIComponent('coursepro+hp28@cap2.co.uk');//this changes the email to: coursepro%2Bhp28%40cap2.co.uk
    data_json = `username=${username_ecoded}&password=homeportal&in_kiosk_mode=`;
    postlogin = await I.sendPostRequest('/login', data_json, {
        "x-session-id": starter_sessioinID,
        "Content-Type": "application/x-www-form-urlencoded"
    });
    if (postlogin.status != 200) {
        generic_code.failTest('api payment plan search for basket test - login', 'Status was not 200')
    }
    else {
        sessionID = postlogin.data["session_id"];
    }
    basketstring = "courseId=1";
    postbasket = await I.sendPostRequest('/booking/basket/item/?' + basketstring, "", {"x-session-id": sessionID});
    if (postbasket.status != 200) {
        generic_code.failTest('api payment plan search for basket test - basket item', 'Status was not 200')
    }
    basketID = postbasket.data["id"];

    postpaymentdetailcall = await I.sendGetRequest(`/booking/basket/item/${basketID}/paymentplans`,{'x-session-id' : sessionID});
    if (postpaymentdetailcall.status != 200) {
        generic_code.failTest('api payment plan search for basket test - payment plans', 'Status was not 200')
    }
    else if(postpaymentdetailcall.data[0]["description"] != "Direct Debit")
    {
        generic_code.failTest('api payment plan search for basket test - payment plans description', 'Status was not 200')
    }
});