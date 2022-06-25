require('dotenv').config();
require('./config/database').connect();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();

app.use(express.json());

//middlewares
const auth = require("./middleware/auth");


const User = require('./model/user');
app.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User already exist. Please login");
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
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
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
        res.status(400).send("Invalid credentials")
    } catch (err) {
        console.error(err);
    }
});

const Todo = require('./model/todo')

app.get('/', auth, async (req, res) => {
    const data = await Todo.find();
    res.json(data);
});

app.get('/:id', async (req, res) => {
    const data = await Todo.findById(req.params.id);
    res.json(data);
})

app.post('/', async (req, res) => {
    const data = await Todo.create(req.body);
    res.send(data);
});

app.put('/:id', async (req, res) => {
    const data = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(data);
});

app.delete('/:id', async (req, res) => {
    const data = await Todo.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
});

module.exports = app;