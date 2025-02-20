import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../reduxStore/auth/authSlice';
import server from '../constant';
import axiosInstance from '../../../utils/axiosInstance';

const Login = () => {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const serverUrl =server;

 
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading when the request begins
    setMessage("");  // Reset message
  
    // Basic form validation
    if (!username || !password) {
      setMessage("Username and Password are required!");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axiosInstance.post(`/admin/login`, {
        username,
        password,
      }, { withCredentials: true });
  
     
      if (response.data.status === 'true') {
        setMessage("Login successful");
        window.location.href = "http://localhost:3000/admin/dashboard"; 
      } else {
        setMessage(response.data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Error logging in');
    } finally {
      setLoading(false);  // End loading when the request finishes
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/background/adminBackground.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative w-full max-w-md p-10 space-y-8 bg-white bg-opacity-20 shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Sign In</h2>
        <form className="space-y-8" onSubmit={handleLogin}>
          <div className="relative">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="peer w-full border-b-2 border-transparent bg-transparent text-white font-bold focus:outline-none focus:ring-0 focus:border-white placeholder-transparent py-3 px-4"
              placeholder="Username"
            />
            <label htmlFor="username" className="absolute left-4 top-[-10px] text-white text-sm font-bold px-1 rounded-md">
              Username
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full border-b-2 border-transparent bg-transparent text-white font-bold focus:outline-none focus:ring-0 focus:border-white placeholder-transparent py-3 px-4"
              placeholder="Password"
            />
            <label htmlFor="password" className="absolute left-4 top-[-10px] text-white text-sm font-bold px-1 rounded-md">
              Password
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-4 mt-6 font-bold bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-white"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        {message && <div className="text-center text-white mt-4">{message}</div>}
      </div>
    </div>
  );
};

export default Login;
