import { useState, useEffect } from 'react'
import axios from 'axios'
import {toast}from "react-toastify"

const Login = ({ setToken }) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const onsubmithandler = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('https://backende-commerce-kappa.vercel.app/api/user/Admin', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "An error occurred");
      }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={onsubmithandler} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Admin Login</h2>
        <input
          type="email"
          placeholder="Enter The Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Enter The Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login