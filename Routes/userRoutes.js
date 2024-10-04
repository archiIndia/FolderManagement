const express = require('express');
const { createUser, userLogIn,  } = require('../Controllers/userController');
const router = express.Router();

// Create a new user
router.post('/signup', createUser);
// User Log In
router.post('/signin', userLogIn);

module.exports = router;
