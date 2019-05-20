const generic_code = require('../../../Generic_Code/custom_steps.js');

Feature('API Testing');

Scenario('api center search based on ID test', async (I)  => {
    let id1, centerSearch, name_of_center, id2, centerSearch2, name_of_center2, id3, centerSearch3, name_of_center3;

    id1 = "/1/?";
    centerSearch = await I.sendGetRequest('/centres' + id1);
    if(centerSearch.status == 200)
    {
        name_of_center = centerSearch.data.name;
        if(name_of_center != 'Westminster Leisure Centre')
        {
            generic_code.failTest('api course search test', 'Center Name was not "Westminster Leisure Centre"')
        }
        else{}
    }
    else{
        generic_code.failTest('api course search test', 'Response was not 200');
    }

    id2 = "/2/?";
    centerSearch2 = await I.sendGetRequest('/centres' + id2);
    if(centerSearch2.status == 200)
    {
        name_of_center2 = centerSearch2.data.name;
        if(name_of_center2 != 'Canary Wharf Leisure Centre')
        {
            generic_code.failTest('api course search test', 'Center Name was not "Canary Wharf Leisure Centre"')
        }
        else{}
    }
    else{
        generic_code.failTest('api course search test', 'Response was not 200');
    }
    id3 = "/3/?";
    centerSearch3 = await I.sendGetRequest('/centres' + id3);
    if(centerSearch3.status == 200)
    {
        name_of_center3 = centerSearch3.data.name;
        if(name_of_center3 != 'Castle Leisure Centre')
        {
            generic_code.failTest('api course search test', 'Center Name was not "Castle Leisure Centre"')
        }
        else{}
    }
    else{
        generic_code.failTest('api course search test', 'Response was not 200');
    }

});