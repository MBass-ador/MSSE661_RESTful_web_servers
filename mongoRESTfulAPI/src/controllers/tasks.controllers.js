// Database CRUD Functions

const Tasks = require('../models/tasks.model');

// get all
exports.getAllTasks = function(req, res) {
  Tasks.find({}, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

// get single by id
exports.getTask = function(req, res) {
  Tasks.findById(req.params.taskId, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

// create
exports.createTask = function(req, res) {
  const newTask = new Tasks({
    name: req.body.name
  });
  newTask.save(function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

// update
exports.updateTask = function(req, res) {
  Tasks.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    }
  );
};

// delete
exports.deleteTask = function(req, res) {
  Tasks.deleteOne({ _id: req.params.taskId }, function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ msg: 'Deleted successfully.' });
  });
};