const generic_code = require('../../../Generic_Code/custom_steps.js');

Feature('API Testing');

Scenario('api centre search test', async (I)  => {
    let centerSearch, nameofregion;

    centerSearch = await I.sendGetRequest('/booking/findLocation');
    if(centerSearch.status == 200)
    {
        nameofregion = centerSearch.data.value[1].name;
        if(nameofregion != 'London')
        {
            generic_code.failTest('api centre search test', 'Region was not "London"')
        }
        else{}
    }
    else{
        generic_code.failTest('api centre search test', 'Response was not 200');
    }
});