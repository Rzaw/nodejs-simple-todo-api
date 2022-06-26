
const express = require('express');
let router = express.Router();

const User = require('../model/user');
router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        if (!(email && password && first_name && last_name)) {
            res.status(400).json({ "error": "All input is required" });
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).json({ "error": "User already exist. Please login" });
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({"internalError": "Something went wrong, please report this incident"});
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).json({ "error": "All input is required" });
        }

        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({
                user_id: user._id, email
            }, process.env.TOKEN_KEY, {
                expiresIn: "2h"
            });

            user.token = token;

            res.status(200).json(user);
        }
        res.status(400).json({"error": "Invalid credentials"});
    } catch (err) {
        console.error(err);
        res.status(500).json({"internalError": "Something went wrong, please report this incident"});
    }
});

module.exports = router;