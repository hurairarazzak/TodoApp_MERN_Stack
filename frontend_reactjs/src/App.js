import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Todo from './pages/Todo';
import Login from './pages/login';
import Signup from './pages/signup';

const App = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:5000')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log('Error fetching data:', err);
      });
  }, []);

  return (
    <div>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
