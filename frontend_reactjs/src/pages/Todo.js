import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, List, Typography, Divider, Modal, Checkbox } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [newTitle, setNewTitle] = useState('');

    // Fetch todos from backend
    useEffect(() => {
        axios.get('http://localhost:5000/todo/todos')
            .then(res => setTodos(res.data));
    }, []);

    // Add a new todo
    const addTodo = () => {
        if (title.trim()) {
            axios.post('http://localhost:5000/todo/todos', { title })
                .then(res => setTodos([...todos, res.data]));
            setTitle('');
        }
    };

    // Delete a todo
    const deleteTodo = (id) => {
        axios.delete(`http://localhost:5000/todo/todos/${id}`)
            .then(() => setTodos(todos.filter(todo => todo._id !== id)));
    };

    // Edit todo
    const startEdit = (todo) => {
        setIsEditing(true);
        setCurrentTodo(todo);
        setNewTitle(todo.title);
    };

    // Save the edited todo
    const saveEdit = () => {
        if (newTitle.trim()) {
            axios.put(`http://localhost:5000/todo/todos/${currentTodo._id}`, { title: newTitle })
                .then(res => {
                    setTodos(todos.map(todo => todo._id === currentTodo._id ? res.data : todo));
                    setIsEditing(false);
                    setNewTitle('');
                });
        }
    };

    // Toggle the completed status of a todo
    const toggleComplete = (id) => {
        const updatedTodo = todos.find(todo => todo._id === id);
        axios.put(`http://localhost:5000/todo/todos/${id}`, { completed: !updatedTodo.completed })
            .then(res => {
                setTodos(todos.map(todo => todo._id === id ? res.data : todo));
            });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 shadow-lg rounded-lg bg-white">
            <Typography.Title level={2} className="text-center">Todo App</Typography.Title>
            
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new todo"
                className="mb-4"
                size="large"
            />

            <Button
                type="primary"
                size="large"
                block
                onClick={addTodo}
                className="mb-4"
            >
                Add Todo
            </Button>

            <Divider />

            <List
                bordered
                dataSource={todos}
                renderItem={todo => (
                    <List.Item
                        key={todo._id}
                        className={`flex justify-between items-center ${todo.completed ? 'bg-gray-100' : ''}`}
                    >
                        <div className="flex items-center">
                            <Checkbox
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo._id)}
                                className="mr-4"
                            />
                            <Typography.Text
                                className={`text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`}
                            >
                                {todo.title}
                            </Typography.Text>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                type="default"
                                icon={<EditOutlined />}
                                onClick={() => startEdit(todo)}
                            />
                            <Button
                                type="danger"
                                icon={<DeleteOutlined />}
                                onClick={() => deleteTodo(todo._id)}
                            />
                        </div>
                    </List.Item>
                )}
            />

            {/* Edit Modal */}
            <Modal
                title="Edit Todo"
                visible={isEditing}
                onCancel={() => setIsEditing(false)}
                onOk={saveEdit}
            >
                <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Edit your todo"
                    size="large"
                />
            </Modal>
        </div>
    );
}

export default App;
