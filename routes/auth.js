const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
    const { name, email, password, age,phone } = req.body;



        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            phone
        });


        res.json({ msg: "User registered successfully", user: newUser });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

       res.json({
        success: true,
        msg: "Login successful",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            phone: user.phone
    }
});

});

module.exports = router;
