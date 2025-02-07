// imports
const con = require('../db-config');
const queries = require('../queries/testing.queries');

// CRUD Operations

// Get All
exports.getAllTests = function (req, res) {
    con.query(queries.ALL_TESTS, function (err, result, fields) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

// Get One
exports.getTest = function (req, res) {
    con.query(queries.SINGLE_TEST, [req.params.id], function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

// Create
exports.createTest = function (req, res) {
    con.query(queries.INSERT_TEST, [req.body.name], function (err, result) {
        if (err) {
            res.send(err);
        }
        console.log(result);
        res.json({ message: '# of tests addeded: ' + result.affectedRows }   
        );
    });
};

// Update
exports.updateTest = function (req, res) {
    con.query(
        queries.UPDATE_TEST, 
        [req.body.name, req.body.status, req.params.id], 
        function (err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
        }
    );
}; 

// Delete
exports.deleteTest = function (req, res) {
    con.query(queries.DELETE_TEST, [req.params.id], function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Test Successfully Deleted.' });
    });
}; 