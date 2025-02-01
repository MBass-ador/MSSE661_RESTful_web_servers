// establishing routes for tasks

const controllers = require('../controllers/tasks.controller');
const express = require('express'); 

// express routes for tasks
const tasksRoutes = express.Router();

// routes for all tasks. `/tasks/`
tasksRoutes.get('/', controllers.getAllTasks).post('/', controllers.createTask);

// routes by taskId.  `/tasks/:taskId`
tasksRoutes
    .get('/:id', controllers.getTask)
    .put('/:id', controllers.updateTask)
    .delete('/:id', controllers.deleteTask);

// exporting routes
module.exports = tasksRoutes; 