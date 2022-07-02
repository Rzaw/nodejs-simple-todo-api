const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    todo: String,
    isCompleted: Boolean,
    userId: String
});

module.exports = mongoose.model('Todo', todoSchema);