const express = require('express');
const { createUser, getUserById } = require('../Controllers/userController');
const router = express.Router();

// Create a new user
router.post('/', createUser);

// Get user by ID
router.get('/:id', getUserById);

module.exports = router;
