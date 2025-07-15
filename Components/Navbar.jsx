"use client";
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("signup"); // or 'login'
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.isLoggedIn) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAuth = () => {
    if (authMode === "signup") {
      // Save new user
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, isLoggedIn: true })
      );
      setIsLoggedIn(true);
      alert("Signup successful!");
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        storedUser &&
        storedUser.email === user.email &&
        storedUser.password === user.password
      ) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...storedUser, isLoggedIn: true })
        );
        setIsLoggedIn(true);
        toast.success("Login successful!");
      } else {
        toast.error("Invalid credentials");
      }
    }
    setShowAuthModal(false);
  };

  const logout = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem(
      "user",
      JSON.stringify({ ...storedUser, isLoggedIn: false })
    );
    setIsLoggedIn(false);
    setUser({ name: "", email: "", password: "" });
    toast.success("Logout Successfully!")
  };

  return (
    <div className="flex justify-end items-center py-4 px-6 bg-white border-b border-gray-200 shadow-sm">
      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Hello, {user.name}</span>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded hover:cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={() => {
              setAuthMode("login");
              setShowAuthModal(true);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded hover:cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setAuthMode("signup");
              setShowAuthModal(true);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded hover:cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      )}

      {/* Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-80 shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {authMode === "signup" ? "Sign Up" : "Sign In"}
            </h2>
            {authMode === "signup" && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                className="mb-3 w-full p-2 border rounded"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="mb-3 w-full p-2 border rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="mb-3 w-full p-2 border rounded"
            />
            <button
              onClick={handleAuth}
              className="w-full bg-black text-white py-2 rounded hover:opacity-90 hover:cursor-pointer"
            >
              {authMode === "signup" ? "Sign Up" : "Sign In"}
            </button>
            <button
              onClick={() => setShowAuthModal(false)}
              className="w-full mt-2 text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
