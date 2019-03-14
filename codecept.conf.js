exports.config = {
    output: '../../Output',
    helpers: {
        Puppeteer: {
            waitForNavigation: "networkidle0",
            waitForTimeout: "60000",
            show: true
        }
    },
    include: {},
    mocha: {
        reporterOptions: {
            'codeceptjs-cli-reporter': {
                stdout: "-",
                options: {
                    steps: true,
                    verbose: false,
                    debug: false
                }
            },
            'mochawesome': {
                stdout: "../../Output/console.log",
                options: {
                    reportDir: "../../Output/HTML_Output",
                    reportFilename: "report",
                    autoOpen: true
                }
            }
        },
    },

    bootstrap: function(done) {
        const gen = require('./Generic_Code/Generate.js');
        gen.generate_coursepro()
            .then(function (value) {console.log(value[0]); done();})
            .catch(function (error){console.log(error[0]); done();});
    },

    teardown: null,
    hooks: [],
    gherkin: {
        features: '../../Tests/*/*/*.feature',
        steps: ['../../step_definitions/steps.js']
    },
    plugins: {
        screenshotOnFail: {
            enabled: false
        }
    },
    tests: '../../Tests/*_test.js',
    domain: 'http://default.coursepro',
    HP2_Domain: 'http://default.homeportal',
    Sql_File_Path: '../../Default.Coursepro.Dump.sql',
    Sql_host: 'localhost',
    Sql_server_username: 'root',
    Sql_server_password: '',
    Sql_database_name: 'coursepro_default',
    Cron_run_location: 'C:\\wamp64\\www\\coursepro\\web',
    CoursePro_Username1: 'root',
    CoursePro_Username2: 'lead',
    CoursePro_Password1: 'coursepro',
    name: '.bin'
};