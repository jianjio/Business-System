import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error messages
    setSuccess("");

    try {
      const response = await fetch(
        "https://fifpi-api.onrender.com/api/create-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user.");
      }

      const data = await response.json();
      setSuccess("User created successfully!");
      alert(data.message);

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Create user error:", error.message);
      setError(error.message || "Failed to create user. Please try again.");
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
        <h1 className="text-2xl font-bold text-center uppercase mb-4">Create User</h1>
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
            Create User
          </button>
        </form>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mt-2 text-center">{success}</p>
        )}
        <p className="text-center mt-4">
        Already have an account? {" "}
          <a href="/login" className="text-red-500 hover:underline">
            Login
          </a>
        </p>
        
      </div>
    </div>
  );
}

export default CreateUser;