const generic_code = require('../../../Generic_Code/custom_steps.js');

Feature('API Testing');

Scenario('api filter options test', async (I)  => {
    let json_ecoded_include, json_ecoded_filter, jsonstring, filteroptions;
    let name1, name2, name3, name4, name5, name6, name7, name8, name9, name10, name11;

    json_ecoded_include = encodeURIComponent('["courseGroupCategoryType","courseGroupCategory","levelGroup","level","dayOfWeek","timeOfDay","region","centre","postcode","geolocation","distance","courseType"]');
    json_ecoded_filter = encodeURIComponent('{"courseGroupCategoryType": 1,"courseGroupCategory": [1,2],"levelGroup": [1,4],"level": [1],"dayOfWeek": 2,"timeOfDay": 1,"region": 1,"centre": 1,"postcode": "BA2 4ET","geolocation": {"latitude":51.382154,"longitude":-2.354059},"distance": 5,"courseType": 1}');
    jsonstring = `include=${json_ecoded_include}&filter${json_ecoded_filter}`;
    filteroptions = await I.sendGetRequest('/booking/centres/search/filter?' + jsonstring);
    if(filteroptions.status == 200)
    {
        name1 = filteroptions.data[0].name; //distance
        name2 = filteroptions.data[1].name; //courseGroupCategoryType
        name3 = filteroptions.data[2].name; //courseType
        name4 = filteroptions.data[3].name; //levelGroup
        name5 = filteroptions.data[4].name; //level
        name6 = filteroptions.data[5].name; //dayOfWeek
        name7 = filteroptions.data[6].name; //region
        name8 = filteroptions.data[7].name; //centre
        name9 = filteroptions.data[8].name; //postcode
        name10 = filteroptions.data[9].name; //courseGroupCategory
        name11 = filteroptions.data[10].name; //geolocation
        if(name1 != "distance" &&
            name2 != "courseGroupCategoryType" &&
            name3 != "courseType" &&
            name4 != "levelGroup" &&
            name5 != "level" &&
            name6 != "dayOfWeek" &&
            name7 != "region" &&
            name8 != "centre" &&
            name9 != "postcode" &&
            name10 != "courseGroupCategory" &&
            name11 != "geolocation")
        {
            generic_code.failTest('api filter options test', 'filter Options were not in the correct order')
        }
        else{}
    }
    else{
        generic_code.failTest('api filter options test', 'Response was not 200');
    }
});