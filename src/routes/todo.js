const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');
const auth = require("../middleware/authentification");


router.get('/', auth, todoController.getAll);

router.get('/:id', auth, todoController.validate('getById'), todoController.getById);

router.post('/', auth, todoController.validate('create'), todoController.create);

router.put('/:id', auth, todoController.validate('update'), todoController.update);

router.delete('/:id', auth, todoController.validate('remove'), todoController.remove);