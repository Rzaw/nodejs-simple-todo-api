require('dotenv').config();
require('./config/database').connect();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const expressValidator = require('express-validator');


const app = express();

app.use(express.json());
app.use(expressValidator())

const account = require('./controllers/accountController');
const todo = require('./routes/todo');
const user = require('./routes/user');

app.use('/account', account);
app.use('/todo', todo);
app.use('/user', user);


// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    
    return;
  });


module.exports = app;