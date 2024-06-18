const express = require('express');
const router = express.Router();
const restController = require('../controllers/restController');

// Route to get a user by ID
router.get('/:id', restController.getRestById);

// Route to get all restaurants
router.get('/', restController.getallRest);

// Route to create a new restaurant
router.post('/', restController.createRest);

module.exports = router;
