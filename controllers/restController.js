const Rest = require('../models/restModel');

// Function to get a restaurant by ID
async function getRestById(req, res) {
    const userId = req.params.id;
    try {
        const user = await Rest.findByPk(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error("Error fetching user: ", err);
        res.status(500).json({ error: "Error fetching user." });
    }
}

// Function to get all restaurants
async function getallRest(req, res) {
    try {
        const users = await Rest.findAll();
        res.json(users);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Error" });
    }
}

// Function to create a new restaurant
async function createRest(req, res) {
    const { user_id, restaurant_name, restaurant_address, restaurant_description, restaurant_telephone } = req.body;
    try {
        const newRest = await Rest.create({
            user_id,
            restaurant_name,
            restaurant_address,
            restaurant_description,
            restaurant_telephone
        });
        res.status(201).json(newRest);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Error" });
    }
}

module.exports = {
    getRestById,
    getallRest,
    createRest
};
