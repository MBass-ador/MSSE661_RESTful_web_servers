// establishing routes for tests

const controllers = require('../controllers/testing.controller');
const express = require('express'); 

// express routes for tests
const testRoutes = express.Router();

// routes for all tests. `/tests/`
testRoutes.get('/', controllers.getAllTests).post('/', controllers.createTest);

// routes by testID.  `/tests/:testID`
testRoutes
    .get('/:id', controllers.getTest)
    .put('/:id', controllers.updateTest)
    .delete('/:id', controllers.deleteTest);

// exporting routes
module.exports = testRoutes;