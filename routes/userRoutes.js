const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Make sure the User model path is correct

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const newUser = await User.create({ name, email, password, age });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
});

// Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
});

// Get user by ID
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user by ID
router.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.json({ message: "User updated successfully!", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Error updating user!" });
    }
});

// Delete user by ID
router.delete("/users/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user!" });
    }
});

module.exports = router;
