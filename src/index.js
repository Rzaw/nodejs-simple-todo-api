const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
require('dotenv').config();

const _PORT = 5000;


// Mongo schema & model
const todoSchema = mongoose.Schema({
    todo: String
});
const Todo = mongoose.model('Todo', todoSchema);

app.get('/', async (req, res) => {
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

const start = () => {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        app.listen(_PORT, () => {
            console.log(`App is listening on port ${_PORT}`);
        })
    ).catch((err) => {
        console.log(`Error ${err}`);
    });
}

start();