const generic_code = require('../../../Generic_Code/custom_steps.js');

Feature('API Testing');

Scenario('api assign member to basket test', async (I) => {
    let username_ecoded, data_json, postlogin, sessionID, postbasket,  basketstring, starter_sessioin, postpatchmemberremovecall, member_json2, starter_sessioinID, postmembercall, postlogoutcall, basketID, member_json, postpatchmembercall, memberID;

    starter_sessioin = await I.sendGetRequest('/session');
    starter_sessioinID = starter_sessioin.data["sessionId"];
    username_ecoded = encodeURIComponent('coursepro+hp28@cap2.co.uk');//this changes the email to: coursepro%2Bhp28%40cap2.co.uk
    data_json = `username=${username_ecoded}&password=homeportal&in_kiosk_mode=`;
    postlogin = await I.sendPostRequest('/login', data_json, {
        "x-session-id": starter_sessioinID,
        "Content-Type": "application/x-www-form-urlencoded"
    });
    if (postlogin.status != 200) {
        generic_code.failTest('api assign member to basket test - login', 'Status was not 200')
    }
    else {
        sessionID = postlogin.data["session_id"];
    }
    basketstring = "courseId=1";
    postbasket = await I.sendPostRequest('/booking/basket/item/?' + basketstring, "", {"x-session-id": sessionID});
    if (postbasket.status != 200) {
        generic_code.failTest('api assign member to basket test - basket item', 'Status was not 200')
    }
    basketID = postbasket.data["id"];

    postmembercall = await I.sendGetRequest(`/booking/basket/item/${basketID}/members/`,{'x-session-id':sessionID});
    if(postmembercall.status == 200) {
        if(postmembercall.data[0]["firstName"] != "Abbie")
        {
            generic_code.failTest('api assign member to basket test - member name', 'Was not as expected')
        }
        memberID = postmembercall.data[0]["id"];
    }
    else{
        generic_code.failTest('api assign member to basket test - member for basket', 'Status was not 200')
    }

    member_json = {
        memberId: memberID,
        paymentPlanId: null
    };
    postpatchmembercall = await I.sendPatchRequest(`/booking/basket/item/${basketID}/`, member_json ,{'x-session-id':sessionID});
    if(postpatchmembercall.status != 200) {
        generic_code.failTest('api assign member to basket test - assign member to basket', 'Status was not 200 - (Probably because there in to many booking sessions)')
    }
    else {}

    member_json2 = {
        memberId: null,
        paymentPlanId: null
    };
    postpatchmemberremovecall = await I.sendPatchRequest(`/booking/basket/item/${basketID}/`, member_json2 ,{'x-session-id':sessionID});
    if (postpatchmemberremovecall.status != 200) {
        generic_code.failTest('api assign member to basket test - remove member from basket', 'Status was not 200')
    }
    else {}

    postlogoutcall = await I.sendGetRequest('/logout',{'x-session-id':sessionID});
    if (postlogoutcall.status != 200) {
        generic_code.failTest('api assign member to basket test - logout', 'Status was not 200')
    }
    else {}



});