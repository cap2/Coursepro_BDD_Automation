const sql = require('../node_modules/mysql');
const global = require('../node_modules/.bin/codecept.conf');
const I = actor();

module.exports =
    {
        fields:{
            Sql_host: global.config.Sql_host,
            Sql_server_username: global.config.Sql_server_username,
            Sql_server_password: global.config.Sql_server_password,
            Sql_database_name: global.config.Sql_database_name,
            Cron_run_location: global.config.Cron_run_location,
        },

        connect_to_db: async function (sql_query)
        {
            return new Promise((resolve, reject) => {
                (async () => {
                    let con = sql.createConnection({
                        host: this.fields.Sql_host,
                        user: this.fields.Sql_server_username,
                        password: this.fields.Sql_server_password,
                        database: this.fields.Sql_database_name
                    });

                    await con.connect((err) => {
                        if (err) {
                            reject(err.message);
                            return err.message;
                        }
                    }).then(function () {
                        con.query(sql_query, (err, result) => {
                        if (err) throw err;
                        I.say(result);
                        resolve(result);
                        return result;
                    });});

                    con.end();

                })();
            });
        }
    };
