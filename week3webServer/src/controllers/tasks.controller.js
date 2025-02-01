const con = require('../db-config');
const queries = require('../queries/tasks.queries');

// CRUD Operations

// Get All
exports.getAllTasks = function (req, res) {
    con.query(queries.All_Tasks, function (err, result, fields) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

// Get One
exports.getTask = function (req, res) {
    con.query(queries.SINGLE_TASKS, [req.params.taskId], function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

// Create
exports.createTask = function (req, res) {
    con.query(queries.INSERT_TASK, [req.body.name], function (err, result) {
        if (err) {
            res.send(err);
        }
        console.log(result);
        res.json({ message: '# of records addeded: ' + result.affectedRows }   
        );
    });
};

// Update
exports.updateTask = function (req, res) {
    con.query(
        queries.UPDATE_TASK, 
        [req.body.name, req.body.status, req.params.taksId], 
        function (err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
        }
    );
}; 

// Delete
exports.deleteTask = function (req, res) {
    con.query(queries.DELETE_TASK, [req.params.taskId], function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully Deleted.' });
    });
};