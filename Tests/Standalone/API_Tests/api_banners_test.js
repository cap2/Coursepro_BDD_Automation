const generic_code = require('../../../Generic_Code/custom_steps.js');

Feature('API Testing');

Scenario('api banners test', async (I)  => {
    let sessionID, bannerscall, sessioin  ;

    sessioin = await I.sendGetRequest('/session');
    sessionID = sessioin.data["sessionId"];
    bannerscall = await I.sendGetRequest('/banners?',{"x-session-id" : sessionID});
    if(bannerscall.status != 200)
    {
        generic_code.failTest('api basket test - basket call', 'Status was not 200')
    }
   else {}
});