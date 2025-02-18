// imports (using "mysql2" bug fix npm module)
const mysql = require('mysql2');

const connection = require('../db-config');

const {
    ALL_TESTS,
    SINGLE_TEST,
    INSERT_TEST,
    UPDATE_TEST,
    DELETE_TEST
} = require('../queries/testing.queries');

const query = require('../utils/query');

const { serverError } = require('../utils/handlers');


// CRUD Operations


// Get All
exports.getAllTests = async (req, res) => {
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });

    // query all tests
    const tests = await query(con, ALL_TESTS(req.user.user_id), []).catch(
        serverError(res));

    // check for tests
    if (!tests.length) {
        res.status(200).json({ message: "no tests recorded for this user"})
    }
    res.json(tests);
};


// Get One
exports.getTest = async (req, res) => {
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });

    // look for test
    const test = await query(
        con, 
        SINGLE_TEST(req.user.user_id, req.params.testId)
    ).catch(serverError(res));

    // check for only 1
    if (!test.length) {
        res
            .status(400)
            .json({ message: "no tests recorded for this user"})
    }
    res.json(test);
};


// Create
exports.createTest = async (req, res) => {
    // verify token
    const user = req.user;

    // act on middleware check
    if (user.id) {
        // conncetion
        const con = await connection().catch((err) => {
            throw err;
        });

        // test name from request body
        const testName = mysql.escape(req.body.testName);

        // insert query
        const result = await query(
            con, 
            INSERT_TEST(user.user_id, testName
        )).catch(serverError(res));

        // log it
        console.log(result);
        
        // check for only 1
        if (result.affectedRows !== 1) {
            res
                .status(500)
                .json({ message: `not able to add test: ${req.body.testName}` })
        }
        res.json({ message: 'test successfully added' });
    }
};


// build string of values
const _buildValuesString = (req) => {
    const body = req.body;
    const values = Object.keys(body).map(
        (key) => `${key} = ${mysql.escape(body[key])}`
    );
    values.push(`created_date = NOW()`);
    values.join(', ');
    return values;
};



// Update
exports.updateTest = async (req, res) => {
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });

    // build string of values with helper function
    const values = _buildValuesString(req);

    // update query
    const result = await query(
        con, 
        UPDATE_TEST(req.user.user_id, req.params.testId, values)
    ).catch(serverError(res));
    
    // check for only 1
    if (result.affectedRows !== 1) {
        res
            .status(500)
            .json({message: `not able to update test: '${req.body.testName}'`});
    }
    res.json(result);
}; 

// Delete
exports.deleteTest = async (req, res) => {
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });
    
    // delete query
    const result = await query(con, DELETE_TEST(req.user.user_id, req.params.testId)
    ).catch(serverError(res));
    
        // check for only 1
    if (result.affectedRows !== 1) {
        res
            .status(500)
            .json({ message: `not able to delete test: ${req.params.testId}`});
    }
    res.json({message: 'test successfully deleted'});
};