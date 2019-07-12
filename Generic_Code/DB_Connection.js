const sql = require('../node_modules/mysql');
const global = require('../node_modules/.bin/codecept.conf');
const I = actor();

module.exports =
    {
        // old way of doing it.
        connect_to_db: async function (sql_query)
        {
            return new Promise((resolve, reject) => {
                (async () => {
                    let con = sql.createConnection({
                        host: global.config.Sql_host,
                        user: global.config.Sql_server_username,
                        password: global.config.Sql_server_password,
                        database: global.config.Sql_database_name
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
        },

        // DbHelper way of doing it.
        connect_to_db2: async function (query, datapassed)
        {
            await I.connect("coursepro_default", "mysql:///test:testpassword@localhost:3306/coursepro_default");
            const result = await I.run( "coursepro_default", query , datapassed );
            I.say(result[0], 'blue');

            await I.removeConnection( "coursepro_default" );
        }

    };
