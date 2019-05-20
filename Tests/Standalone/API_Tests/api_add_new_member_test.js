const generic_code = require('../../../Generic_Code/custom_steps.js');

Feature('API Testing');

Scenario('api add new member test', async (I)  => {
    let sessioncall, sessionID, jsonObj, add_new_member_call;

    sessioncall = await I.sendGetRequest('/session');
    sessionID = sessioncall.headers['x-session-id'];
    jsonObj = {
        "memberDetails":{
            "title":"Mr",
            "firstName":"Dan",
            "lastName":"Jakobson",
            "dateOfBirth":"2000-01-01",
            "genderId":1,
            "address1": "15 verbena sdlknn",
            "address2": "sdlknn",
            "city": "Melksham",
            "county": "Wilshire",
            "postcode": "SN12 7GS",
            "phoneNumber": "7473195556",
            "disabilityId":4,
            "medicalConditionIds":[],
            "ethnicityId":null,
            "concessionaryId":0,
            "marketingSourceId":13,
            "acceptMarketing":false,
            "acceptTerms":true,
            "allowContactEmail":false,
            "allowContactSms":false,
            "allowContactPhone":false,
            "allowContactMail":false},
        "accountDetails":{
            "emailAddress": "qa@cap2.co.uk",
            "password": "Qwerty1!"
        }
    };

    add_new_member_call = await I.sendPostRequest('/account/register/newMember', jsonObj,{"x-session-id": sessionID, "Content-Type": "application/json"});
    if(add_new_member_call.status == 200)
    {
        //Passes
    }
    else if(add_new_member_call.status == 400)
    {
        if(add_new_member_call.data.message == "That email address is already in use")
        {
            generic_code.failTest('api add new member test', 'Email already in use');
        }
    }
    else{
        generic_code.failTest('api add new member test', 'Response was not 200');
    }
});

