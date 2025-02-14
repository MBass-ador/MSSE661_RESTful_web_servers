// imports
const connection = require('../db-config');
const {
    ALL_TESTS,
    SINGLE_TEST,
    INSERT_TEST,
    UPDATE_TEST,
    DELETE_TEST
} = require('../queries/testing.queries');

const query = require('../utils/query');

// CRUD Operations

// Get All
exports.getAllTests = async (req, res) => {
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });

    // query all tests
    const tests = await query(con, ALL_TESTS).catch((err) => {
        res.send(err);
    });
    // check for only 1
    if (tests.length) {
        res.json(tests);
    }
};

// Get One
exports.getTest = async (req, res) => {
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });

    // look for test
    const test = await query(con, SINGLE_TEST, [req.params.id]).catch(
        (err) => {
            res.send({ msg: 'unable to retrieve test.' });
        }
    );

    // check for only 1
    if (test.length) {
        res.json(test);
    }
};

// Create
exports.createTest = async (req, res) => {
    // verify token
    const decoded = req.user;

    if (decoded.id) {
        // conncetion
        const con = await connection().catch((err) => {
            throw err;
        });

        // insert query
        const result = await query(con, INSERT_TEST, [req.body.name]).catch(
            (err) => {
                res.send(err);
            }
        );
        // log it
        console.log(result);
        
        // check for only 1
        if (result.affectedRows === 1) {
            res.json({ message: 'test successfully added' });
        }
    }
};

// Update
exports.updateTest = async (req, res) => {
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });

    // update query
    const result = await query(con, UPDATE_TEST, [
        req.body.name,
        req.body.status,
        req.params.id,
    ]).catch((err) => {
        res.send(err);
    });
    
    // check for only 1
    if (result.affectedRows === 1) {
        res.json({message: 'test successfully updated'});
    }
}; 

// Delete
exports.deleteTest = async (req, res) => {
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });
    
    // delete query
    const result = await query(con, DELETE_TEST, [req.params.id]).catch(
        (err) => {
            res.send({err});
        }
    );
    
        // check for only 1
    if (result.affectedRows === 1) {
        res.json({message: 'test successfully deleted'});
    }
}; 