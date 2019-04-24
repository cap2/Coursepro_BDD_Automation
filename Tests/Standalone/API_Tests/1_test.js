Feature('API Testing');

Scenario('api test', async (I)  => {
    let sessionID = await I.sendGetRequest('/api/session/sessionId');
    I.say(sessionID);

});