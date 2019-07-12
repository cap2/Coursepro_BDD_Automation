const I = actor();
const global = require('../node_modules/.bin/codecept.conf');
const DB_Connect = require('../Generic_Code/DB_Connection');
const helpers = require('../Custom_Helpers/Custom_Helper');

let target;
module.exports = {

    fields:{
        Standard_email: global.config.CoursePro_Username2,
        Standard_password: global.config.CoursePro_Password1,
        Admin_email: global.config.CoursePro_Username1,
        Admin_password: global.config.CoursePro_Password1,
        Domain: global.config.domain,
        HP2_Domain: global.config.HP2_Domain,
        HP2_User1: global.config.HomePortal_username1, // no class has homeportal account
        HP2_User2: global.config.HomePortal_username2, // has a con class and requires topup
        HP2_Password: global.config.HomePortal_passowrd,
        HP2_memberID: global.config.HomePortal_memberID,
        HP2_member_PostCode: global.config.HomePortal_member_PostCode,
        Sql_host: global.config.Sql_host,
        Sql_server_username: global.config.Sql_server_username,
        Sql_server_password: global.config.Sql_server_password,
        Sql_database_name: global.config.Sql_database_name,
    },



    failTest(test,error) {
        throw new Error('Failed Test: ' + test + ' Because: ' + error)
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

    hp2_page: async function () {
        // get member data.
        I.amOnPage(this.fields.Domain + '/');
        I.waitForElement('#username', 3);
        I.wait(2);
        I.see('Please log in to continue');
        I.waitForElement('#username', 3);
        I.fillField('#username', this.fields.Admin_email);
        I.fillField('#password', this.fields.Admin_password);
        I.click('#btnG');
        I.wait(2);
        I.amOnPage('https://default.coursepro/members/188/');
        I.wait(2);
        target = await I.match_string_for_member_DOB('#profile > div.box > div > div > div:nth-child(2)');

        // goto HP2 now
        I.amOnPage(this.fields.HP2_Domain + '/');
        I.waitForElement('#username', 3);
        I.wait(2);
    },

    login_HP2_User1 () {

        I.see('If you already have a HomePortal account, please login below:');
        I.waitForElement('#username',3);
        I.fillField('#username', this.fields.HomePortal_username1);
        I.fillField('#password', this.fields.HomePortal_passowrd);
        I.click('#login_button');
        I.wait(2);
    },

    login_HP2_User2 () {

        I.see('If you already have a HomePortal account, please login below:');
        I.waitForElement('#username',3);
        I.fillField('#username', this.fields.HomePortal_username2);
        I.fillField('#password', this.fields.HomePortal_passowrd);
        I.click('#login_button');
        I.wait(2);
    },

    logout () {
        I.wait(3);
        I.waitForElement('#userLogout',3);
        I.click('#userLogout');
        I.wait(5);
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
        I.amOnPage(this.fields.Domain + '/newreports/overview?params[%27centres.centre_id%27]=1');
        I.waitForElement('#report-container',6);
        I.wait(2);
    },

    async ipod_page () {
        let url = this.fields.Domain + '/i/?embedded=1#device';
        let url_replace = url.replace('http' , 'https');
        I.amOnPage(url_replace);
        I.wait(3);
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
        I.see('100%', '#percentage');
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
        I.wait(2);
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
        I.wait(2);
        I.waitForElement('#results',5);
        I.wait(2);
        I.click('#c57');
        I.wait(3);

    },

    pay_with_cash (){
        I.wait(3);
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
        I.wait(3);
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
        I.wait(3);
        I.waitForElement('#bookAllocations',5);
        I.click('#bookContinue');
        I.waitForElement('#paymentNumbers',6);
        I.click('#tillNumber_exact');
        I.wait(1);
        I.click('#method_cash');
        I.wait(1);
        I.click('#paymentContinue');
        I.wait(3);
        I.see('Your top up was successfully made.','#confirmation');
    },

    topup_with_dd (){
        I.wait(3);
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
        I.wait(3);
        I.waitForElement('#m4',6);
        I.click('#m4');
        I.wait(3);
    },

    topup_member_2 () {
        I.waitForElement('#member',6);
        I.fillField('#member', 'Katelin Luna');
        I.click('#search');
        I.wait(3);
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
        I.wait(2);
        I.waitForElement('#add',6);
        I.click('#add');
        I.waitForElement('#first_name',6);
        I.wait(1);
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
        I.wait(2);
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
        I.wait(2);
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

    overview_report () {
        I.wait(2);
        I.see('Overview','#body > header > h1');
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

    async X_Sessions_Remaining_email () {
        let sql_query = "SELECT * FROM dev_mail";
        let connection_String = (
            `mysql:///${this.fields.Sql_server_username}
            :${this.fields.Sql_server_password}
            @${this.fields.Sql_host}
            /${this.fields.Sql_database_name}`).toString();
        I.connect( "coursepro_default", connection_String);
        const database_results = await I.query("coursepro_default",sql_query);
        let values = Object.values(database_results);
        for(let i=0; i< values.length; i++)
        {
            const row = values[i];
            if(row['message'].match('sessions remaining in'))
            {
                I.say(row);
            }
            else
            {
                I.fail_test(`X Sessions Remaining Test Failed`);
            }
        }
        await I.removeConnection( "coursepro_default" ); // also disconnects
    },

    async ipod_login () {
        if(I.see('Enter Device ID','#login_explanation'))
        {
            I.click('#username');
            I.waitForElement('#username', 1);
            I.fillField(".//*[contains(@name, 'username')]", 'test');
            I.click('#deviceSelect');
            I.wait(3);
            I.waitForElement('#key_1',10);
            I.click('#key_1');
            I.click('#key_2');
            I.click('#key_3');
            I.click('#key_4');
            I.wait(4);
        }
        I.waitForElement('#teacherList',10);
        I.wait(3);
        I.see('Teachers','#home > div.toolbar > h1');
    },

    async ipod_mark_attendance () {
        I.click('#t');
        I.waitForElement('#classList', 15);
        I.wait(5);
        I.click('#classList > li:nth-child(2)');
        I.waitForElement('#class_buttons', 5);
        I.wait(3);
        I.click('#ic_register');
        I.waitForElement('#registerList', 5);
        I.wait(3);
        I.click('#cm_66 > span.touch.cross');
        I.wait(0.5);
        I.click('#cm_71 > span.touch.cross');
        I.wait(0.5);
        I.click('#cm_68 > span.touch.cross');
        I.wait(0.5);
        I.click('#cm_67 > span.touch.cross');
        I.wait(0.5);
        I.seeElement('#cm_66 > span.touch.tick');
        I.seeElement('#cm_71 > span.touch.tick');
        I.seeElement('#cm_68 > span.touch.tick');
        I.seeElement('#cm_67 > span.touch.tick');
    },

    async ipod_asses_by_pupil () {
        I.click('#t');
        I.waitForElement('#classList', 15);
        I.wait(8);
        I.click('#classList > li:nth-child(2)');
        I.waitForElement('#class_buttons', 5);
        I.wait(3);
        I.click('#ic_assesspupil');
        I.wait(2);
        let target = await I.match_string_for_assess_pupil('#assesspupilList'); // just need the element.
        let element_to_wait_for = '#' + target;
        I.waitForElement(element_to_wait_for ,5);
        I.click(element_to_wait_for);
        I.wait(0.5);
        I.waitForElement('#assesspupilgradesList',5);
        I.wait(2);
        I.click('#competency_1 > ul > li.touch.grade_2');
        I.wait(0.5);
        I.click('#competency_2 > ul > li.touch.grade_3');
        I.wait(0.5);
        I.click('#competency_3 > ul > li.touch.grade_4');
        I.wait(0.5);
        I.seeElement('#competency_1 > span.time_stamp');
        I.seeElement('#competency_2 > span.time_stamp');
        I.seeElement('#competency_3 > span.time_stamp');
    },

    async ipod_asses_by_competency () {
        I.click('#t');
        I.waitForElement('#classList', 15);
        I.wait(8);
        I.click('#classList > li:nth-child(2)');
        I.waitForElement('#class_buttons', 5);
        I.wait(3);
        I.click('#ic_assesscompetency');
        I.waitForElement('#assesscompetencyList',5);
        I.wait(3);
        I.click('#assessCompetencyGroupList-0-0 > li:nth-child(2)');
        I.waitForElement('#assesscompetencygradesList',5);
        I.wait(3);
        let target = await I.match_string_for_member_info('#assesscompetencygradesList');
        let member_1_click = '#' + target[0] + ' > span.competencyAssess > ul > li.touch.grade_3';
        let member_2_click = '#' + target[1] + ' > span.competencyAssess > ul > li.touch.grade_4';
        let member_1_time = '#' + target[0] + ' > span.time_stamp';
        let member_2_time = '#' + target[1] + ' > span.time_stamp';
        I.click(member_1_click);
        I.wait(0.5);
        I.click(member_2_click);
        I.wait(0.5);
        I.seeElement(member_1_time);
        I.seeElement(member_2_time);
    },

    async ipod_mark_member_to_move () {
        I.click('#t');
        I.waitForElement('#classList', 15);
        I.wait(8);
        I.click('#classList > li:nth-child(2)');
        I.waitForElement('#class_buttons', 5);
        I.wait(3);
        I.click('#ic_assesspupil');
        let target = await I.match_string_for_assess_pupil('#assesspupilList'); // just need the element.
        let element_to_wait_for = '#' + target;
        I.waitForElement(element_to_wait_for ,5);
        I.click(element_to_wait_for);
        I.wait(0.5);
        I.waitForElement('#assesspupilgradesList',5);
        I.wait(2);
        I.click('#assesspupilgrades > div > a.button.pop');
        I.waitForElement('#level',6);
        I.seeElement('#level');
    },

    async ipod_view_medical_and_payment_alerts () {
        I.click('#t');
        I.waitForElement('#classList', 15);
        I.wait(8);
        I.click('#classList > li:nth-child(2)');
        I.waitForElement('#class_buttons', 5);
        I.wait(3);
        I.click('#ic_alerts');
        I.wait(2);
        I.seeElement('#alerts');

    },

    async register_for_homeportal () {
        let dob = target[0];
        I.say(dob);
        I.wait(2);

    },

    async view_progress_on_homeportal () {

    },

    async quick_activation_on_homeportal () {

    },

    async homeportal_topup_continuous () {

    },

    async homeportal_topup_fixed () {

    },

    async homeportal_move_continuous () {

    },

    async homeportal_move_fixed () {

    },

};