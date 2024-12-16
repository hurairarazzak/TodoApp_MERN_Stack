import React, { useState } from 'react';
import { Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });
      if (response.data.isSuccessful) {
        console.log('Logged in:', response.data);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('token', response.data.data.token);
        setEmail('');
        setPassword('');
        navigate('/todo');
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 rounded-md w-full"
          />
        </div>

        <div className="mb-6">
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded-md w-full"
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <Checkbox>Remember me</Checkbox>
          <a href="#" className="text-sm text-blue-500">
            Forgot Password?
          </a>
        </div>

        <Button
          type="primary"
          className="w-full py-3"
          onClick={handleLogin}
        >
          Login
        </Button>

        <div className="mt-6 text-center">
          <span>Don't have an account? </span>
          <a href="/signup" className="text-blue-500">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;