// Defing SQL queries for mysql database: "testing"

// create a table "tests" 
// with id(pk), name, created_date, and status columns
exports.CREATE_TESTING_TABLE = `CREATE TABLE IF NOT EXISTS testing (
    testId int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    testName varchar(255) NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
    status varchar(10) DEFAULT 'pending',
    PRIMARY KEY (testId)
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)`;

// retrieve all tests
exports.ALL_TESTS = `SELECT * FROM testing`;

// retrieve a single test
exports.SINGLE_TEST = `SELECT * FROM testing WHERE id = ?`;

// add a test (to table)
exports.INSERT_TEST = `INSERT INTO testing (name) VALUES (?)`;

// update a test's details
exports.UPDATE_TEST = `UPDATE testing SET name = ?, status = ? WHERE id = ?`;

// delete a test (from table)
exports.DELETE_TEST = `DELETE FROM testing WHERE id = ?`;