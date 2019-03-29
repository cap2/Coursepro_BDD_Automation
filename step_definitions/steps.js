const I = actor();
const generic_code = require('../Generic_Code/custom_steps.js');

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
    I.wait(2);
});

Then('I should be able to assess a pupil', () => {
    generic_code.asses_pupil();
});

Then('I should be able to mark a pupil', () => {
    I.amOnPage(global.config.domain + '/classes/session/547/');
    I.waitForElement('#present_49', 3);
    I.click('#present_49');
});

When('I on the overview page', () => {
    generic_code.overview_page();
});

Then('I should be able to cancel a class', () => {
    generic_code.cancel_class();
});

Then('un-cancel a class', () => {
    generic_code.un_cancel_class();
});

Then('I should be able to change the day', () => {
    generic_code.change_day();
});

When('I go to the booking page', () => {
    generic_code.booking_page();
});

When('I go to the topup page', () => {
    generic_code.topup_page();
});

Then('I should be able to book a continuous class', () => {
    generic_code.book_continuous_class();
});

Then('I should be able to book a fixed class', () => {
    generic_code.book_fixed_class();
});

Then('I pay with cash', () => {
    generic_code.pay_with_cash();
});

Then('I pay with dd', () => {
    generic_code.pay_with_dd();
});

Then('I topup with cash', () => {
    generic_code.topup_with_cash();
});

Then('I topup with dd', () => {
    generic_code.topup_with_dd();
});

When('I use booking member 1', () =>{
    generic_code.booking_member_1();
});

When('I use booking member 2', () =>{
    generic_code.booking_member_2();
});

When('I use topup member 1', () =>{
    generic_code.topup_member_1();
});

When('I use topup member 2', () =>{
    generic_code.topup_member_2();
});

When('I go to the member page', () =>{
    generic_code.member_page();
});

Then('I should be able to search for a member', () =>{
    generic_code.member_search();
});

Then('I should be able to add a member', () =>{
    generic_code.member_add();
});

Then('I should be able to add a membership', () =>{
    generic_code.member_add_membership();
});

Then('I should be able to view a financial screen', () =>{
    generic_code.member_view_fiancial_screen();
});