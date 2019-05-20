const generic_code = require('../../../Generic_Code/custom_steps.js');

Feature('API Testing');

Scenario('api delete item from basket test', async (I) => {
    let postbasket,  basketstring, starter_sessioin, starter_sessioinID, basketID, postdeleteitemcall, postgetbasketcall, postgetbasketcallll;

    starter_sessioin = await I.sendGetRequest('/session');
    starter_sessioinID = starter_sessioin.data["sessionId"];
    basketstring = "courseId=1";
    postbasket = await I.sendPostRequest('/booking/basket/item/?' + basketstring, "", {"x-session-id": starter_sessioinID});
    if (postbasket.status != 200) {
        generic_code.failTest('api delete item from basket test - add an item to the basket', 'Status was not 200')
    }
    basketID = postbasket.data["id"];

    postgetbasketcallll = await I.sendGetRequest('/booking/basket/',{'x-session-id':starter_sessioinID});
    if (postbasket.status != 200) {
        generic_code.failTest('api delete item from basket test - get basket before delete', 'Status was not 200')
    }

    postdeleteitemcall = await I.sendDeleteRequest(`/booking/basket/item/${basketID}/?`, {'accept': '*/*', 'x-session-id': starter_sessioinID});
    if(postdeleteitemcall.status != 200) {
        generic_code.failTest('api delete item from basket test - delete basket item', 'Status was not 200')
    }

    postgetbasketcall = await I.sendGetRequest('/booking/basket/',{'x-session-id':starter_sessioinID});
    if(postgetbasketcall.status != 200) {
        generic_code.failTest('api delete item from basket test - get basket after delete', 'Status was not 200')
    }



    if(postgetbasketcall.data["items"] == postgetbasketcallll.data["items"]){
        generic_code.failTest('api delete item from basket test - ', 'Basket item was not deleted when it should have been.')
    }

});