const controllers = require('../controllers/tasks.controller');
const express = require('express');


const tasksRoutes = express.Router();


 //Express Routes for Tasks.



 // routes for all tasks.  `/tasks/`
tasksRoutes.get('/', controllers.getAllTasks).post('/', controllers.createTask);


 // routes for task by id. `/tasks/:taskId`
tasksRoutes
    .get('/:taskId', controllers.getTask)
    .post('/:taskId', controllers.updateTask)
    .delete('/:taskId', controllers.deleteTask);

// publish routes
module.exports = tasksRoutes;