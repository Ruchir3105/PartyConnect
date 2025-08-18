import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    console.log(e.target.password.value);

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8080/profile/signin", {
        email: email,
        password: password
      },{
        withCredentials: true
      })
      console.log(res);

      const data = res.data;
      console.log(res.status);

      if (res.status == 400) {
        console.log("Already exists");
        alert("User with this email already exists");
      }
      if (res.status == 200) {
        alert("User logged in succesfully xyzzz");
        navigate("/");
      }
    } catch (error) {
      console.error("Error is: ", error);
    }

    setLoading(true);
    setError("");

  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-neutral-900 p-8 rounded-xl shadow-xl max-w-sm w-full">
        <h2 className="text-2xl text-white font-semibold mb-6">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-200 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:border-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-200 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:border-purple-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <a href="/signup" className="text-purple-400 hover:text-purple-600">Sign Up</a>
          </p>
          <p className="text-gray-400 mt-2">
            <a href="/forgot-password" className="text-purple-400 hover:text-purple-600">Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
