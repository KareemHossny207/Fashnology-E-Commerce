import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context';
import axios from "axios"
import { toast } from "react-toastify"

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate } = useContext(Context);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetFields = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        if (!name || !email || !password || !confirmPassword) {
          toast.error("Please fill in all fields.");
          return;
        }
        if (password !== confirmPassword) {
          toast.error("Passwords do not match.");
          return;
        }
        const response = await axios.post("http://localhost:5777/api/user/Register", { name, email, password });
        if (response.data && response.data.success) {
          if (response.data.token) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("Registration successful!");
            navigate('/');
          } else {
            toast.success("Registration successful! Please login.");
            setCurrentState('Login');
            resetFields();
          }
        } else {
          toast.error(response.data?.message || "Registration failed.");
        }
      } else if (currentState === 'Login') {
        if (!email || !password) {
          toast.error("Please enter email and password.");
          return;
        }
        const response = await axios.post("http://localhost:5777/api/user/Login", { email, password });
        if (response.data && response.data.success && response.data.token) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("Login successful!");
          navigate('/');
        } else {
          toast.error(response.data?.message || "Login failed.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message || "An error occurred");
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  // Switch to Sign Up and clear fields
  const handleSwitchToSignUp = () => {
    setCurrentState('Sign Up');
    resetFields();
  };

  // Switch to Login and clear fields
  const handleSwitchToLogin = () => {
    setCurrentState('Login');
    resetFields();
  };

  return (
    <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14' onSubmit={submitHandler}>
      <div className='inline-flex gap-2 items-center mb-10 mt-10'>
        <p className='text-gray-700 text-5xl'>{currentState}</p>
        <p className='w-8 md:w-11 h-[2px] bg-gray-700'></p>
      </div>
      {currentState === 'Login' ? (
        <div className='w-full space-y-4'>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
            autoComplete="username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
            autoComplete="current-password"
          />
          <div className='flex justify-between'>
            <p
              className='cursor-pointer text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors duration-200'
              onClick={() => toast.info("Password reset not implemented yet.")}
            >
              Forgot your password?
            </p>
            <p
              className='cursor-pointer text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors duration-200'
              onClick={handleSwitchToSignUp}
            >
              Create Account?
            </p>
          </div>
          <button type="submit" className='w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors'>
            Login
          </button>
        </div>
      ) : (
        <div className='w-full space-y-4'>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
            autoComplete="name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
            autoComplete="username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
            autoComplete="new-password"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
            autoComplete="new-password"
          />
          <div className='flex justify-between'>
            <p
              className='cursor-pointer text-blue-500 hover:text-blue-700 text-sm text-end font-medium transition-colors duration-200'
              onClick={handleSwitchToLogin}
            >
              Already have an account?
            </p>
            <p
              className='cursor-pointer text-blue-500 hover:text-blue-700 text-sm text-end font-medium transition-colors duration-200'
              onClick={handleSwitchToLogin}
            >
              Login Here
            </p>
          </div>
          <button type="submit" className='w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors'>
            Sign Up
          </button>
        </div>
      )}
    </form>
  )
}

export default Login