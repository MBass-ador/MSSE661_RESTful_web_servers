// creating database connection object and exporting it

// imports
const mysql = require('mysql2'); // using mysql2 (bug fix) npm client
const { CREATE_TESTING_TABLE } = require('./queries/testing.queries');
const { CREATE_USERS_TABLE } = require('./queries/auth.queries');
const query = require('./utils/query');

// host
const host = process.env.DB_HOST || 'localhost';
// user
const user = process.env.DB_USER || 'root';
// user password
const password = process.env.DB_PASS || 'sesame';
// database name
const database = process.env.DB_DATABASE || 'testDB';

// create connection and wrap in a promise
const connection = async () => 
    // wrap connection in promise
    new Promise((resolve, reject) => {
        // make connection
        const con = mysql.createConnection ({
            host,
            user,
            password,
            database
        });

        con.connect((err) => {
            if (err) {
                reject(err);
                return;
            } 
        });
        
        resolve(con);
    });
    // make connection
    (async () => {
        const _con = await connection().catch((err) => {
            throw err;
        });

    // create users table if doesn't exist
    const userTableCreated = await query(_con, CREATE_USERS_TABLE).catch(
        (err) => {
            console.log(err);
        }
    );

    // create testing table if doesn't exist
    const testingTableCreated = await query(_con, CREATE_TESTING_TABLE).catch(
        (err) => {
            console.log(err);
        }
    );

    // make sure tables exist
    if (!!userTableCreated && !!testingTableCreated) {
        console.log('user and testing tables ready to use');
    }
})();

// export connection
module.exports = connection;