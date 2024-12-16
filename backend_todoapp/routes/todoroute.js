const express = require('express');
const Route = express.Router();
const Todo = require('../models/todoschema');

Route.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

Route.post('/todos', async (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
    });
    await newTodo.save();
    res.json(newTodo);
});

Route.put('/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(todo);
});

Route.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
});

module.exports = Route;