require('dotenv').config();
require('./config/database').connect();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();

app.use(express.json());

const account = require('./controllers/accountController');
const todo = require('./controllers/todoController');

app.use('/account', account);
app.use('/todo', todo);


module.exports = app;