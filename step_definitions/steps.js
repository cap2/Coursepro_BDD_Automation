const I = actor();
const generic_code = require('../Generic_Code/custom_steps.js');
const global = require('../node_modules/.bin/codecept.conf');

Given('Im on the login page for coursepro', () => {
    generic_code.home_page()
});

When('I successfully login', () => {
    generic_code.login_admin()
});

Then('I should see overview screen', () => {
    generic_code.overview_page()
});

Given('Im logged in', () => {
    generic_code.login_admin()
});

When('I click the logout button', () => {
    generic_code.logout()
});

Then('I should see the homepage', () => {
    I.waitForElement('#username', 3);
    I.wait(2);
    I.see('Please log in to continue');
});

When('I click the leisure centre button', () => {
    I.click('#userCentre');
    I.click('#centreList > ul > li:nth-child(2)');
});

Then('I should be able to switch leisure centres', () => {
    I.waitForElement('#userCentre', 3);
    I.wait(2);
    I.seeTextEquals('Castle Leisure Centre', '#userCentre');
});

Given('Im logged in as a none root user', () => {
    generic_code.login_default()
});

When('I click the leisure centre button for lead', () => {
    I.waitForElement('#userCentre', 3);
    I.click('#userCentre');
    I.see('Westminster Leisure Centre', '#centreList');
});

Then('I should not be able to switch leisure centres', () => {
    I.waitForElement('#userCentre', 3);
    I.click('#userCentre');
    I.dontSeeElement('#centreList > ul > li:nth-child(2)');
});

When('I go to a class', () => {
    I.wait(2);
    I.amOnPage(global.config.domain + '/classes/session/547/?assess=1');
});

Then('I should be able to assess a pupil', () => {
    I.waitForElement('#assessMember_20', 3);
    I.click('#assessMember_20');
    I.waitForElement('#percentage', 3);
    I.wait(2);
    I.amOnPage(global.config.domain + '/classes/session/547/?assess=1');
    I.waitForElement('#assessMember_20', 3);
    I.click('#assessMember_20');
    I.waitForElement('#percentage', 3);
    I.wait(2);
    let element_array = 1;
    while(element_array <= 13)
    {
        I.click('#assessCompetency_' + element_array +' > ul > li:nth-child(5)');
        I.wait(1);
        element_array ++;
    }
    I.click('#save');
    I.amOnPage(global.config.domain + '/classes/session/547/?assess=1');
    I.waitForElement('#assessMember_20', 3);
    I.click('#assessMember_20');
    I.wait(2);
    I.see('85%', '#percentage');
});