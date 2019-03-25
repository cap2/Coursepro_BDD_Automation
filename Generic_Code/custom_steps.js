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
        I.amOnPage(global.config.domain + '/');
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
    },

    asses_pupil () {
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
            I.say(`${text_before} matches ${text_after}`);
        }
    },

    book_continuous_class (){
        I.waitForElement('#level', 3);
        I.click('#level');
        I.waitForElement('#level-list > ul > li:nth-child(2)',2);
        I.click('#level-list > ul > li:nth-child(2)');
        I.waitForElement('#results');


    },

    book_fixed_class (){
        I.amOnPage(this.fields.Domain + '/classes/');

    },

    topup_continuous_class (){
        I.amOnPage(this.fields.Domain + '/classes/');

    },

    topup_fixed_class (){
        I.amOnPage(this.fields.Domain + '/classes/');

    },

    pay_with_cash (){
        I.amOnPage(this.fields.Domain + '/classes/');

    },

    pay_with_dd (){
        I.amOnPage(this.fields.Domain + '/classes/');

    },


};