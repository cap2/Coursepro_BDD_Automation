const { exec, spawn } = require('child_process');
const global = require('../node_modules/.bin/codecept.conf');

class Script_Run
{
    fields:{
        Standard_email: global.config.CoursePro_Username2,
        Standard_password: global.config.CoursePro_Password1,
        Admin_email: global.config.CoursePro_Username1,
        Admin_password: global.config.CoursePro_Password1,
        Domain: global.config.domain,
        Sql_host: global.config.Sql_host,
        Sql_server_username: global.config.Sql_server_username,
        Sql_server_password: global.config.Sql_server_password,
        Sql_database_name: global.config.Sql_database_name,
        Cron_run_location: global.config.Cron_run_location,
    }
    static cmd_run_HP2()
    {
        return new Promise((resolve, reject) => {
            let output = '';
            const process = spawn(' ng build', ['--prod'], {cwd: '{C:\\wamp64\\www\\homeportal2'});

            process.on('error', function(err) {
                reject(err);
            });

            process.stdout.on('data', function(chunk) {
                output += chunk + "\n";
            });

            process.on('close', function(code){
                resolve(output);
            });
        });
    }
    static cmd_run_Cron()
    {
        return new Promise((resolve, reject) => {
            let output = '';
            const process = spawn('php', ['cron.php'], {cwd: config.Cron_run_location});

            process.on('error', function(err) {
                reject(err);
            });

            process.stdout.on('data', function(chunk) {
                output += chunk + "\n";
            });

            process.on('close', function(code){
                resolve(output);
            });
        });
    }
}
module.exports = Script_Run;