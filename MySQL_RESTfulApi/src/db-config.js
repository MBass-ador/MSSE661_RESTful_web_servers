// creating database connection object and exporting it

// imports
const mysql = require('mysql');
const queries = require('./queries/tasks.queries');

// host
const host = process.env.DB_HOST || 'localhost';

// user
const user = process.env.DB_USER || 'root';

// user password
const password = process.env.DB_PASSWORD || 'sesame';

// database name
const database = process.env.DB_NAME || 'toDoDB';

// create connection
const con = mysql.createConnection ({
    host,
    user,
    password,
    database
});


// connect to db
con.connect(function (err) {
    if (err) throw err;
    console.log('db connection established');
    
    con.query(queries.CREATE_TASKS_TABLE, function (err, result) {
        if (err) throw err;
        console.log('table created (or already exists)');
    });
});

// export connection as "con"
module.exports = con;