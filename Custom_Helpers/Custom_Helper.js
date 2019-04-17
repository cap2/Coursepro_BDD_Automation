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



}

module.exports = MyHelper;