const express = require('express');

const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const verifyToken    = require('../middleware/auth.middleware');

// new router
const userRoutes = express.Router();

// routes to retrieve or modify user 
userRoutes.get('/me', userController.getMe); // /api/user/me

userRoutes.post('/me/update', verifyToken, authController.updateUser); // /api/user/me/update

// exporting routes
module.exports = userRoutes;