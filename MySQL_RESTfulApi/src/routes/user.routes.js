const express = require('express');

const {getMe} = require('../controllers/user.controller');
const {updateUser} = require('../controllers/auth.controller');

const canAccess = require('../middleware/auth.middleware');

// new router
const userRoutes = express.Router();

// routes to retrieve or modify user 
userRoutes.get('/me', canAccess,getMe); // /api/user/me

userRoutes.put('/me/update', canAccess, updateUser); // /api/user/me/update

// exporting routes
module.exports = userRoutes;