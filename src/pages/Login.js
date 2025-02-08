import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(""); // For success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setSuccess(""); // Reset success message

    try {
      // Fetch API call to backend
      const response = await fetch("https://fifpi-api.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
      }

      const data = await response.json();
      setSuccess("Login Success, redirecting to dashboard...");
      onLogin(data.token); // Pass token to parent component

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message || "Login failed. Please try again.");
    }
  };

  return (

    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-300">
      {/* Logo Section */}
      <img
        src="/image.png"
        alt="Fashion Interiors Logo"
        className="w-96 mb-8"
      />
      <div className="bg-white p-8 rounded-lg shadow-lg shadow-red-500 border-lg border-red-400 w-96">
        
        <h1 className="text-2xl font-bold text-center uppercase mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="bg-gray-300 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-300 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="bg-red-500 text-white py-2 rounded hover:bg-red-800 transition"
          >
            Login
          </button>
        </form>
        {/* Display error or success message */}
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mt-2 text-center">{success}</p>
        )}
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/create-user" className="text-red-500 hover:underline">
            Create User
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;