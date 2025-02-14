// establishing routes for tests
const express = require('express');

const {
    getAllTests,
    getTest,
    createTest,
    updateTest,
    deleteTest,
} = require('../controllers/testing.controller');

 const canAccess = require('../middleware/auth.middleware');

// express routes for tests
const testRoutes = express.Router();

// routes for all tests. `/tests/`
testRoutes
    .get('/', canAccess, getAllTests)
    .post('/', canAccess, createTest);

// routes by testID.  `/tests/:testID`
testRoutes
    .get('/:id', canAccess, getTest)
    .put('/:id', canAccess, updateTest)
    .delete('/:id', canAccess, deleteTest);

// exporting routes
module.exports = testRoutes;