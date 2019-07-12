const I = actor();
const generic_code = require('../Generic_Code/custom_steps.js');
const global = require('../node_modules/.bin/codecept.conf.js');
const db_run = require('../Generic_Code/DB_Connection');

//Given //
Given('Im on the login page for coursepro', () => {
    generic_code.home_page()
});
Given('Im logged in', () => {
    generic_code.login_admin()
});
Given('Im logged in as a none root user', () => {
    generic_code.login_default()
});
Given('Im on the HomePortal Page after getting member data', () => {
    generic_code.hp2_page()
});


//When //
When('I successfully login', () => {
    generic_code.login_admin()
});
When('I click the logout button', () => {
    generic_code.logout()
});
When('I click the leisure centre button', () => {
    I.wait(3);
    I.click('#userCentre');
    I.click('#centreList > ul > li:nth-child(2)');
    I.wait(2);
});
When('I click the leisure centre button for lead', () => {
    I.wait(3);
    I.waitForElement('#userCentre', 3);
    I.click('#userCentre');
    I.see('Westminster Leisure Centre', '#centreList');
    I.wait(2);
});
When('I go to a class', () => {
    I.wait(2);
    I.amOnPage(global.config.domain + '/classes/session/547/?assess=1');
    I.wait(2);
});
When('I on the overview page', () => {
    generic_code.overview_page();
});
When('I go to the booking page', () => {
    generic_code.booking_page();
});
When('I go to the topup page', () => {
    generic_code.topup_page();
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
When('I go to the settings page', () =>{
    generic_code.settings_page();
});
When('I click the user settings page', () =>{
    generic_code.user_settings_page();
});
When('I click the member settings page', () =>{
    generic_code.member_settings_page();
});
When('I click the waiting list page', () =>{
    generic_code.waiting_list_page();
});
When('I go to the reports page', () => {
generic_code.reports_page()
});
When('I go to the ipod device', ()=> {
generic_code.ipod_page();
});
When('I login to HomePortal with User 1', ()=> {
    generic_code.login_HP2_User1();
});



//Then //
Then('I should see overview screen', () => {
    generic_code.overview_page()
});
Then('I should see the homepage', () => {
    I.wait(2);
    I.waitForElement('#username', 3);
    I.wait(2);
    I.see('Please log in to continue');
});
Then('I should be able to switch leisure centres', () => {
    I.wait(2);
    I.waitForElement('#userCentre', 6);
    I.wait(2);
    I.seeTextEquals('Castle Leisure Centre', '#userCentre');
});
Then('I should not be able to switch leisure centres', () => {
    I.wait(2);
    I.waitForElement('#userCentre', 6);
    I.click('#userCentre');
    I.wait(2);
    I.dontSeeElement('#centreList > ul > li:nth-child(2)');
});
Then('I should be able to assess a pupil', () => {
    generic_code.asses_pupil();
});
Then('I should be able to mark a pupil', () => {
    I.amOnPage(global.config.domain + '/classes/session/547/');
    I.wait(2);
    I.waitForElement('#present_49', 3);
    I.click('#present_49');
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
Then('I should be able to create a new user', () =>{
    generic_code.create_user();
});
Then('I should be able to create a new contact trigger', () =>{
    generic_code.create_contact_trigger();
});
Then('I should be able to add to an existing list', () =>{
    generic_code.add_to_existing_list();
});
Then('I should be able to add to a new list', () =>{
    generic_code.add_to_new_list();
});
Then('I should see overview report', () => {
generic_code.overview_report()
});
Then('I should see class member report', () => {
generic_code.class_member_report()
});
Then('I should see class session member report', () => {
generic_code.class_session_member_report()
});
Then('I should see classes report', () => {
generic_code.classes_report()
});
Then('I should see members report', () => {
generic_code.member_report()
});
Then('I should see transactions report', () => {
generic_code.transactions_report()
});
Then('I should see transactions credit report', () => {
generic_code.transactions_credit_report()
});
Then('I should see transactions refunds report', () => {
generic_code.transactions_refund_report()
});
Then('I should see transactions online report', () => {
generic_code.transactions_online_report()
});
Then('I should be able to login to device', () => {
    generic_code.ipod_login();
});
Then('I should be able to mark attendance', () => {
    generic_code.ipod_mark_attendance();
});
Then('I should be able to assess by pupil', () => {
    generic_code.ipod_asses_by_pupil();
});
Then('I should be able to assess by competency', () => {
    generic_code.ipod_asses_by_competency();
});
Then('I should be mark a member as ready to move', () => {
    generic_code.ipod_mark_member_to_move();
});
Then('I should be able to view medical and payment alerts', () => {
    generic_code.ipod_view_medical_and_payment_alerts();
});
Then('I should be able to Register for HomePortal', () => {
    generic_code.register_for_homeportal();
});
Then('I should be able to View Progress on HomePortal', () => {
    generic_code.view_progress_on_homeportal();
});
Then('I should be able to use Quick Activation on HomePortal', () => {
    generic_code.quick_activation_on_homeportal();
});
Then('I should be able to Topup - Continuous', () => {
    generic_code.homeportal_topup_continuous();
});
Then('I should be able to Topup - Fixed', () => {
    generic_code.homeportal_topup_fixed();
});
Then('I should be able to move - Continuous', () => {
    generic_code.homeportal_move_continuous();
});
Then('I should be able to move - Fixed', () => {
    generic_code.homeportal_move_fixed();
});