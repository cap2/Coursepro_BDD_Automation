const { exec, spawn } = require('child_process');
const global = require('../node_modules/.bin/codecept.conf');



class Script_Run
{

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
            const process = spawn('php', ['cron.php'], {cwd: global.config.Cron_run_location});

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