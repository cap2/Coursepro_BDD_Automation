const generic_code = require('../../../Generic_Code/custom_steps.js');

Feature('API Testing');

Scenario('api postcode search test', async (I)  => {
    let json_ecoded, jsonstring, postcode_Search;

    json_ecoded = encodeURIComponent('E1 7AA');
    jsonstring = `search=${json_ecoded}`;
    postcode_Search = await I.sendGetRequest('/booking/findLocation?' + jsonstring);
    if(postcode_Search.status == 200)
    {
        let postcode_info = postcode_Search.data.value[1].name;
        if(postcode_info != 'Westminster Leisure Centre')
        {
            generic_code.failTest('api postcode search test', 'Course Name was not "Swim School (Continuous) - Stage 1"')
        }
        else{}
    }
    else{
        generic_code.failTest('api postcode search test', 'Response was not 200');
    }
});