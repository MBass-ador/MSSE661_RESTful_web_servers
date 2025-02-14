const express = require('express');

const {
    register,
    login,
    logout,
    token,
} = require('../controllers/auth.controller');

// new router
const authRoutes = express.Router();

// routes for authentication
authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/logout', logout);
authRoutes.get('/token', token);

// exporting routes
module.exports = authRoutes;