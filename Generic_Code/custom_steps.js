const I = actor();
const global = require('../node_modules/.bin/codecept.conf');

module.exports = {

    fields:{
        Standard_email: global.config.CoursePro_Username2,
        Standard_password: global.config.CoursePro_Password1,
        Admin_email: global.config.CoursePro_Username1,
        Admin_password: global.config.CoursePro_Password1,
        Domain: global.config.domain,
    },

    login_admin () {
        I.amOnPage(this.fields.Domain + '/');
        I.waitForElement('#username',3);
        I.wait(2);
        I.see('Please log in to continue');
        I.waitForElement('#username',3);
        I.fillField('#username', this.fields.Admin_email);
        I.fillField('#password', this.fields.Admin_password);
        I.click('#btnG');
        I.wait(2);
    },

    login_default () {
        I.amOnPage(this.fields.Domain + '/');
        I.waitForElement('#username',3);
        I.wait(2);
        I.see('Please log in to continue');
        I.waitForElement('#username',3);
        I.fillField('#username', this.fields.Standard_email);
        I.fillField('#password', this.fields.Standard_password);
        I.click('#btnG');
        I.wait(2);
    },

    logout () {
        I.waitForElement('#userLogout',3);
        I.click('#userLogout');
        I.wait(2);
    },

    home_page () {
        I.amOnPage(this.fields.Domain + '/');
        I.waitForElement('#username',3);
        I.wait(2);
        I.see('Please log in to continue');
    },

    overview_page (){
        I.amOnPage(this.fields.Domain + '/classes/');
        I.waitForElement('#navigation',10);
        I.wait(2);
        I.seeTextEquals('Overview','#navigation_classes > a > span');
        I.wait(2);
    },

    booking_page (){
        I.amOnPage(this.fields.Domain + '/book/');
        I.waitForElement('#course',3);
        I.wait(2);
    },

    member_page () {
        I.amOnPage(this.fields.Domain + '/members/');
        I.waitForElement('#member',3);
        I.wait(2);
    },

    settings_page () {
        I.amOnPage(this.fields.Domain + '/settings/');
        I.waitForElement('#mySettings',3);
        I.wait(2);
    },

    user_settings_page () {
        I.amOnPage(this.fields.Domain + '/settings/users/');
        I.waitForElement('#results',3);
        I.wait(2);
    },

    member_settings_page () {
        I.amOnPage(this.fields.Domain + '/settings/members/');
        I.waitForElement('#results',3);
        I.wait(2);
    },

    topup_page (){
        I.amOnPage(this.fields.Domain + '/book/topup');
        I.waitForElement('#member',3);
        I.wait(2);
    },

    waiting_list_page () {
        I.amOnPage(this.fields.Domain + '/waiting/');
        I.waitForElement('#add',3);
        I.wait(2);
    },

    reports_page () {
        I.amOnPage(this.fields.Domain + '/newreports/');
        I.waitForElement('#fields',6);
        I.wait(2);
    },

    asses_pupil () {
        I.waitForElement('#assessMember_20', 3);
        I.click('#assessMember_20');
        I.waitForElement('#percentage', 3);
        I.wait(2);
        I.amOnPage(this.fields.Domain + '/classes/session/547/?assess=1');
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
        I.amOnPage(this.fields.Domain + '/classes/session/547/?assess=1');
        I.waitForElement('#assessMember_20', 3);
        I.click('#assessMember_20');
        I.wait(2);
        I.see('85%', '#percentage');
    },

    cancel_class () {
        I.waitForElement('#cancelClasses', 4);
        I.click('#cancelClasses');
        I.waitForElement('#head0 > button.cancel.red',3);
        I.click('#head0 > button.cancel.red');
        I.wait(1);
        I.click('#doCancel');
        I.waitForElement('#cancelReason', 2);
        I.click('#cancelReason');
        I.waitForElement('#cancelReason-list', 2);
        I.click('#cancelReason-list > ul > li:nth-child(1)');
        I.waitForElement('#popupBoxOK', 2);
        I.click('#popupBoxOK');
        I.wait(2);
    },

    un_cancel_class () {
        I.waitForElement('#cancelClasses', 4);
        I.click('#cancelClasses');
        I.waitForElement('#head0 > button.cancel.red',3);
        I.click('#head0 > button.cancel.red');
        I.wait(1);
        I.click('#doCancel');
        I.wait(1);
    },

    async change_day () {
        let text_before;
        let text_after;

        I.waitForElement('#plus',4);
        await I.grabHTMLFrom('#dateDescription')
            .then(function(value){text_before = value.toString();})
            .catch();
        I.click('#plus');
        I.waitForElement('#dateDescription',2);
        I.wait(2);
        //     /week +(\d*)/gi
        await I.grabHTMLFrom('#dateDescription')
            .then(function(value){text_after = value.toString();})
            .catch();
        if(I.assertNotEqual(text_before, text_after) === false)
        {
            I.fail_test(`${text_before} matches ${text_after}`);
        }
    },

    book_continuous_class (){
        I.waitForElement('#level', 6);
        I.click('#level');
        I.waitForElement('#level-list > ul > li:nth-child(2)',6);
        I.click('#level-list > ul > li:nth-child(2)');
        I.waitForElement('#results',6);
        I.wait(2);
        I.click('#c8');
        I.wait(3);
    },

    book_fixed_class (){
        I.waitForElement('#course',6);
        I.click('#course');
        I.waitForElement('#course-list',6);
        I.wait(1);
        I.click('#course-list > ul > li:nth-child(2)');
        I.waitForElement('#level', 6);
        I.click('#level');
        I.waitForElement('#level-list',6);
        I.wait(1);
        I.click('#level-list > ul > li:nth-child(2)');
        I.waitForElement('#results',5);
        I.wait(2);
        I.click('#c57');
        I.wait(3);

    },

    pay_with_cash (){
        I.waitForElement('#bookAllocations',5);
        I.click('#bookContinue');
        I.waitForElement('#paymentNumbers',3);
        I.click('#tillNumber_exact');
        I.wait(1);
        I.click('#method_cash');
        I.wait(1);
        I.click('#paymentContinue');
        I.wait(3);
        I.see('Your booking was successfully made.','#confirmation');
    },

    pay_with_dd (){
        I.waitForElement('#bookAllocations',5);
        I.click('#bookContinue');
        I.waitForElement('#paymentNumbers',3);
        I.click('#tillNumber_exact');
        I.wait(1);
        I.click('#method_card');
        I.wait(1);
        I.click('#paymentContinue');
        I.wait(3);
        I.see('Your booking was successfully made.','#confirmation');
    },

    topup_with_cash (){
        I.waitForElement('#bookAllocations',5);
        I.click('#bookContinue');
        I.waitForElement('#paymentNumbers',3);
        I.click('#tillNumber_exact');
        I.wait(1);
        I.click('#method_cash');
        I.wait(1);
        I.click('#paymentContinue');
        I.wait(3);
        I.see('Your top up was successfully made.','#confirmation');
    },

    topup_with_dd (){
        I.waitForElement('#bookAllocations',5);
        I.click('#bookContinue');
        I.waitForElement('#paymentNumbers',5);
        I.click('#tillNumber_exact');
        I.wait(1);
        I.click('#method_card');
        I.wait(1);
        I.click('#paymentContinue');
        I.wait(3);
        I.see('Your top up was successfully made.','#confirmation');
    },

    booking_member_1 () {
        I.waitForElement('#member',6);
        I.fillField('#member', 'Camille Matthews');
        I.click('#search');
        I.wait(3);
        I.waitForElement('#m238',6);
        I.click('#m238');
        I.wait(3);
    },

    booking_member_2 () {
        I.waitForElement('#member',6);
        I.fillField('#member', 'Bianca Lindsey');
        I.click('#search');
        I.wait(3);
        I.waitForElement('#m187',6);
        I.click('#m187');
        I.wait(3);
    },

    topup_member_1 () {
        I.waitForElement('#member',6);
        I.fillField('#member', 'Marley Zimmerman');
        I.click('#search');
        I.waitForElement('#m4',6);
        I.click('#m4');
        I.wait(3);
    },

    topup_member_2 () {
        I.waitForElement('#member',6);
        I.fillField('#member', 'Katelin Luna');
        I.click('#search');
        I.waitForElement('#m114',6);
        I.click('#m114');
        I.wait(3);
    },

    member_search () {
        I.waitForElement('#member',6);
        I.fillField('#member', 'Aurora Daniels');
        I.click('#search');
        I.see('Aurora','#m234');
    },

    member_add () {
        I.amOnPage(this.fields.Domain + '/members/add/');
        I.waitForElement('#title',6);
        I.fillField('#first_name', 'Dan');
        I.wait(0.5);
        I.fillField('#last_name', 'Jakobson');
        I.wait(0.5);
        I.fillField('#address_1', '15 verbena');
        I.wait(0.5);
        I.fillField('#city', 'Melk');
        I.wait(0.5);
        I.fillField('#postcode', 'SN12 7GS');
        I.wait(0.5);
        I.fillField('#date_of_birth', '20-03-1992');
        I.wait(0.5);
        I.fillField('#email_address_0', 'qa@cap2.co.uk');
        I.wait(0.5);
        I.fillField('#contact_number_0', '07473195566');
        I.wait(0.5);
        I.click('#terms_consent');
        I.click('#submit');
        I.waitForElement('#profile',6);
        I.see('Dan Jakobson','#profile');

    },

    member_add_membership () {
        I.waitForElement('#member',6);
        I.fillField('#member', 'Dan Jakobson');
        I.click('#search');
        I.waitForElement('#results',6);
        I.wait(0.5);
        I.click('#lb301');
        I.waitForElement('#profile > a');
        I.wait(0.5);
        I.click('#profile > a');
        I.waitForElement('#addMembership');
        I.wait(0.5);
        I.click('#addMembership');
        I.waitForElement('#membershipSearchResults > ul > li:nth-child(2)');
        I.wait(0.5);
        I.click('#membershipSearchResults > ul > li:nth-child(2)');
        I.waitForElement('#popupBoxOK');
        I.wait(0.5);
        I.click('#popupBoxOK');
        I.wait(0.5);
        I.click('#submit');
        I.wait(0.5);
        I.see('Success: Your member was successfully saved','#messages');
    },

    member_view_fiancial_screen () {
        I.waitForElement('#member',6);
        I.fillField('#member', 'Dan Jakobson');
        I.click('#search');
        I.waitForElement('#results',6);
        I.wait(0.5);
        I.click('#lb301');
        I.waitForElement('#finance_mini');
        I.wait(0.5);
        I.click('#finance_mini > a.viewAll');
        I.wait(0.5);
        I.waitForElement('#financeSummary');
        I.see('Courses','#balance');
    },

    create_user () {
        I.waitForElement('#add',6);
        I.click('#add');
        I.waitForElement('#first_name',6);
        I.wait(0.5);
        I.fillField('#first_name','Dan');
        I.fillField('#last_name','Jakobson');
        I.fillField('#email','qa@cap2.co.uk');
        I.fillField('#username','danjak');
        I.click('#generatepassword');
        I.waitForElement('#password',6);
        I.fillField('#password','qwerty');
        I.fillField('#password_2','qwerty');
        I.click('#allCentres');
        I.click('#allCourses');
        I.click('#submit');
        I.waitForElement('#messages',3);
        I.wait(1);
        I.see('Success: Your user was successfully added','#messages');
    },

    create_contact_trigger () {
        I.amOnPage(this.fields.Domain + '/settings/members/triggers/');
        I.waitForElement('#add',3);
        I.wait(1);
        I.click('#add');
        I.waitForElement('#name',3);
        I.wait(1);
        I.fillField('#name', 'Test Trigger');
        I.wait(0.5);
        I.fillField('#variable', '5');
        I.wait(0.5);
        I.click('#everywhere');
        I.wait(0.5);
        I.click('#add_method');
        I.wait(0.5);
        I.waitForElement('#email_subject_0',3);
        I.wait(1);
        I.fillField('#email_subject_0', 'test_test');
        I.wait(0.5);
        I.click('#submit');
        I.waitForElement('#messages',6);
        I.wait(1);
        I.see('Success: Your trigger was successfully added','#messages');
    },

    add_to_existing_list () {
        I.waitForElement('#add',3);
        I.click('#add');
        I.waitForElement('#level_id',5);
        I.click('#level_id');
        I.waitForElement('#level_id-list',5);
        I.click('#level_id-list > ul > li:nth-child(2)');
        I.fillField('#member', 'Camille Matthews');
        I.wait(2);
        I.pressKey('Shift');
        I.pressKey('Enter');
        I.waitForElement('#memberResults',5);
        I.wait(1);
        I.click('#m_row_0');
        I.wait(0.5);
        I.click('#days_element_1_0');
        I.wait(0.5);
        I.click('#days_moveRight');
        I.wait(0.5);
        I.click('#submit');
        I.waitForElement('#results',5);
        I.wait(2);
        I.see('Camille Matthews','#results');
    },

    add_to_new_list () {
        I.waitForElement('#add',3);
        I.click('#add');
        I.waitForElement('#level_id',5);
        I.click('#level_id');
        I.waitForElement('#level_id-list',5);
        I.click('#level_id-list > ul > li:nth-child(7)');
        I.wait(0.5);
        I.fillField('#member', 'Camille Matthews');
        I.wait(2);
        I.pressKey('Shift');
        I.pressKey('Enter');
        I.waitForElement('#memberResults',5);
        I.wait(1);
        I.click('#m_row_0');
        I.wait(0.5);
        I.click('#days_element_1_0');
        I.wait(0.5);
        I.click('#days_moveRight');
        I.wait(0.5);
        I.click('#submit');
        I.waitForElement('#results',5);
        I.wait(2);
        I.see('Camille Matthews','#results');
    },

    class_member_report () {
        I.wait(2);
        I.amOnPage(this.fields.Domain + '/newreports/classmembers?norun=1');
        I.wait(2);
        I.click('#update');
        I.waitForElement('#total',4);
    },

    class_session_member_report () {
        I.wait(2);
        I.amOnPage(this.fields.Domain + '/newreports/classmembers?norun=1');
        I.wait(2);
        I.click('#update');
        I.waitForElement('#total',4);
    },

    classes_report () {
        I.wait(2);
        I.amOnPage(this.fields.Domain + '/newreports/classes?norun=1');
        I.wait(2);
        I.click('#update');
        I.waitForElement('#total',4);
        I.wait(2);
        I.see('100','#total');
    },

    member_report () {
        I.wait(2);
        I.amOnPage(this.fields.Domain + '/newreports/members?norun=1');
        I.wait(2);
        I.click('#update');
        I.waitForElement('#total',4);
        I.wait(2);
        I.see('301','#total');
    },

    transactions_report () {
        I.wait(2);
        I.amOnPage(this.fields.Domain + '/newreports/transactions?norun=1');
        I.wait(2);
        I.waitForElement('#from_date',4);
        I.fillField('#from_date', '01/01/2019');
        let date = new Date().getDate().toString();
        I.fillField('#to_date', date);
        I.wait(10);
        I.click('#update');
        I.waitForElement('#total',4);
    },

    transactions_credit_report () {
        I.wait(2);
        I.amOnPage(this.fields.Domain + '/newreports/transactions/credits?norun=1');
        I.wait(2);
        I.waitForElement('#from_date',4);
        I.fillField('#from_date', '01/01/2019');
        let date = new Date().getDate().toString();
        I.fillField('#to_date', date);
        I.wait(10);
        I.click('#update');
        I.waitForElement('#total',4);
    },

    transactions_refund_report () {
        I.wait(2);
        I.amOnPage(this.fields.Domain + '/newreports/transactions/refunds?norun=1');
        I.wait(2);
        I.waitForElement('#from_date',4);
        I.fillField('#from_date', '01/01/2019');
        let date = new Date().getDate().toString();
        I.fillField('#to_date', date);
        I.wait(10);
        I.click('#update');
        I.waitForElement('#total',4);
    },

    transactions_online_report () {
        I.wait(2);
        I.amOnPage(this.fields.Domain + '/newreports/transactions/online?norun=1');
        I.wait(2);
        I.waitForElement('#from_date',4);
        I.fillField('#from_date', '01/01/2019');
        let date = new Date().getDate().toString();
        I.fillField('#to_date', date);
        I.wait(10);
        I.click('#update');
        I.waitForElement('#total',4);
    },

    run_cron () {

    },

    X_Sessions_Remaining_email () {

    },


};