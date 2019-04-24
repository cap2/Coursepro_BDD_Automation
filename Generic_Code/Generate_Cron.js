exports.generate_cron = function () {

    const global = require('../node_modules/.bin/codecept.conf');
    const mysql_import = require('../node_modules/mysql-import');

    return new Promise((resolve, reject) => {
        (async () => {
            let importer = mysql_import.config({
                host: global.config.Sql_host,
                user: global.config.Sql_server_username,
                password: global.config.Sql_server_password,
                database: global.config.Sql_database_name
            });

            importer.import(global.config.Sql_Cron_File_Path)
                .then(()=> {resolve(['Cron Generation Complete']);})
                .catch((err)=> {reject(['Cron Generation Failed', err.message]);})
        })();
    });
};