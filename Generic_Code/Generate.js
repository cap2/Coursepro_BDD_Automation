exports.generate_coursepro = function () {

    const global = require('../node_modules/.bin/codecept.conf');
    const mysql_import = require('../node_modules/mysql-import');

    return new Promise((resolve, reject) => {
        (async () => {
            let importer = mysql_import.config({
                host: global.config.Sql_host,
                user: global.config.Sql_server_username,
                password: global.config.Sql_server_password,
                database: global.config.Sql_database_name,
                onerror: err=> console.log(err.message)
            });

            importer.import(global.config.Sql_File_Path)
                .then(()=> {console.log('Generation Complete');resolve();})
                .catch(()=>{console.log('Generation Failed');reject();});

        })();
    });
};