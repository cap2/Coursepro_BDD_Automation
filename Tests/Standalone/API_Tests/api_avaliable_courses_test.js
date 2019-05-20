const generic_code = require('../../../Generic_Code/custom_steps.js');

Feature('API Testing');

Scenario('api course search test', async (I)  => {
    let json_ecoded, jsonstring, courseSearch, name_of_course;

    json_ecoded = encodeURIComponent('{"region": 1, "courseGroupCategory": [1,2,3], "limit": 1}');
    jsonstring = `filter=${json_ecoded}`;
    courseSearch = await I.sendGetRequest('/booking/search?' + jsonstring);
    if(courseSearch.status == 200)
    {
        name_of_course = courseSearch.data.resultSet.results[0].name;
        if(name_of_course != 'Swim School (Continuous) - Stage 1')
        {
            generic_code.failTest('api course search test', 'Course Name was not "Swim School (Continuous) - Stage 1"')
        }
        else{}
    }
    else{
        generic_code.failTest('api course search test', 'Response was not 200');
    }
});