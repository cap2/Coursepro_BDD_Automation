'use strict';

let Helper = codecept_helper;
let I;
const assert = require('assert');
const global = require('../node_modules/.bin/codecept.conf');

class MyHelper extends Helper {

    // add custom methods here
    // If you need to access other helpers
    // use: this.helpers['helperName']

    _init() {
        I = actor();
    }

    fail_test(message) {
        assert.fail(message);
    }

    async match_string(element, match_string, regex_to_match){
        let match ='';
        const targetEls = await this.helpers['Puppeteer'].page.$$(element);
        I.say(targetEls);
        for(let target of targetEls)
        {
            const cell_content = await this.helpers['Puppeteer'].page.evaluate(el => el.innerHTML, target);
            let county = (cell_content.match(`/${match_string}/g`) || []).length;
            if(county === 2)
            {
                match = cell_content.match(`/${regex_to_match}/gi`).pop(); // to match url = http:\/\/(\w*)\.(\w*)\/(\w*)\/(\d*)
                break;
            }
        }
        return match;
    }

}

module.exports = MyHelper;