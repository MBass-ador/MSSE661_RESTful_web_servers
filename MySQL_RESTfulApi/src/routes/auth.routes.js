const express = require('express');
const controller = require('../controllers/auth.controller');

// new router
const authRoutes = express.Router();

// routes for authentication
authRoutes.post('/register', controller.registerUser);
authRoutes.post('/login', controller.login);

// exporting routes
module.exports = authRoutes;