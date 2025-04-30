const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/register', userController.register);
router.get('/:id', userController.getProfile);
router.put('/:id', userController.updateProfile);

module.exports = router; 