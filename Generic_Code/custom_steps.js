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
        I.waitForElement('#navigation',5);
        I.wait(2);
        I.seeTextEquals('Overview','#navigation_classes > a > span');
    },
};