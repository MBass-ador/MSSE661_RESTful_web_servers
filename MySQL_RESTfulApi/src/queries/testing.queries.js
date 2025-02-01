// Definng SQL queries for mysql database

// create a table "tests" 
// with testID(pk), name, created_date, and status columns
exports.CREATE_TESTING_TABLE = `CREATE TABLE IF NOT EXISTS testing (
    testID int Not Null AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status varchar(10) DEFAULT 'pending',
    PRIMARY KEY (testID);
)`;

// retrieve all tests
exports.ALL_TESTS = `SELECT * FROM testing`;

// retrieve a single test
exports.SINGLE_TEST = `SELECT * FROM testing WHERE testID = ?`;

// add a test (to table)
exports.INSERT_TEST = `INSERT INTO testing (name) VALUES (?)`;

// update a test's details
exports.UPDATE_TEST = `UPDATE testing SET name = ?, status = ? WHERE testID = ?`;

// delete a test (from table)
exports.DELETE_TEST = `DELETE FROM testing WHERE testID = ?`;