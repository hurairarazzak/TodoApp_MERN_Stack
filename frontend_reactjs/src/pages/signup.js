import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/auth/signup', {
        userName,
        email,
        password,
      });
      message.success('Signup successful! You can now log in.');
      setUsername('');
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Show user-friendly error message
        message.error(error.response.data.error);
      } else {
        message.error('Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <div className="mb-6">
          <Input
            placeholder="Username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-3 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded-md w-full"
          />
        </div>

        <Button
          type="primary"
          className="w-full py-3"
          onClick={handleSignup}
          loading={loading}
        >
          Sign Up
        </Button>

        <div className="mt-6 text-center">
          <span>Already have an account? </span>
          <a href="/login" className="text-blue-500">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
