const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default:false },
});

const todoSchema = mongoose.model('Todo', TodoSchema);
module.exports = todoSchema;
