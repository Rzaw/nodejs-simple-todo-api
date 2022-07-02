const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Gets current user (requires authentification)
router.get('/');

// Updates basic user info, ex. first and last name (requires auth)
router.put('/')

// Authentificates user for new token (requires email, password)
router.post('/token');

// Registers new user
router.post('/register', userController.validate('createUser'), userController.createUser);

// changes password for logged in user (requires oldPassword, newPassword)
// as a safety precausion, will require OLD password
router.post('/changePassword');




module.exports = router;