// creating database connection object and exporting it

// imports
const mysql = require('mysql2'); // using mysql2 (bug fix) npm client
const TestQueries = require('./queries/testing.queries');
const authQueries = require('./queries/auth.queries');

// host
const host = process.env.DB_HOST || 'localhost';

// user
const user = process.env.DB_USER || 'root';

// user password
const password = process.env.DB_PASSWORD || 'sesame';

// database name
const database = process.env.DB_NAME || 'testDB';

// create connection
const con = mysql.createConnection ({
    host,
    user,
    password,
    database
});


// connect to testing db
con.connect(function (err) {
    if (err) throw err;
    console.log('db connection established');
    
    con.query(TestQueries.CREATE_TESTING_TABLE, function (err, result) {
        if (err) throw err;
        console.log('testing table created (or already exists)');
    });
});

// connect to authorization db
con.connect(function (err) {
    if (err) throw err;
    console.log('db connection established');
    
    con.query(authQueries.CREATE_USERS_TABLE, function (err, result) {
        if (err) throw err;
        console.log('users table created (or already exists)');
    });
});

// export connection as "con"
module.exports = con;