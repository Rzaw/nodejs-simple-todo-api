const express = require('express');
var router = express.Router();

const Todo = require('../model/todo');
const auth = require("../middleware/authentification");

router.get('/', auth, async (req, res) => {
    const data = await Todo.find();
    res.json(data);
});

router.get('/:id', async (req, res) => {
    const data = await Todo.findById(req.params.id);
    res.json(data);
})

router.post('/', async (req, res) => {
    const data = await Todo.create(req.body);
    res.send(data);
});

router.put('/:id', async (req, res) => {
    const data = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(data);
});

router.delete('/:id', async (req, res) => {
    const data = await Todo.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
});

module.exports = router;