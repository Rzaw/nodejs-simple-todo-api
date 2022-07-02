const { query, body, validationResult } = require('express-validator/check')
const Todo = require('../model/todo');

async function getAll(req, res, next) {
    const data = await Todo.find({ userId: req.user._id});
    res.json(data);
}

async function getById(req, res, next) {
    const data = await Todo.findById(req.params.id);
    res.json(data);
}

async function create(req, res, next) {
    const data = await Todo.create(req.body);
    res.send(data);
}

async function update(req, res, next) {
    const data = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(data);
}

async function remove(req, res, next) {
    const data = await Todo.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
}

async function validate(method){
    switch (method){
        case 'getAll': {
            
        };
        case 'getById': {
            return [
                query('id', 'Todo ID is required').exists().isMongoId()
            ];
        };
        case 'create': {
            return [
                body('todo', 'Todo title is required').exists().isString(),
                body('isCompleted').optional()
            ];
        };
        case 'update': {
            return [
                query('id', 'Todo ID is required').exists().isMongoId(),
                body('todo').optional(),
                body('isCompleted').optional()
            ];
        };
        case 'remove': {
            return [
                query('id', 'Todo ID is required').exists().isMongoId()
            ];
        }
    }
}



module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    validate
}