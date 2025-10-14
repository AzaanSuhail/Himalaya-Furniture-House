import React, { useState } from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import ResponsiveContainer from '../components/ResponsiveContainer';
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';

const SignUpPage = () => {
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("User signed up successfully!");
        navigate("/login");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error in signup:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <ResponsiveContainer>
      <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
        {/* Background with #24DEB9 */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white 
        [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#24DEB9_100%)] ">
        </div>

        {/* Toggle Theme */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-gray-800 text-white shadow-md hover:scale-105 transition"
        >
          {isDark ? "Light Mode 🌞" : "Dark Mode 🌙"}
        </button>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`w-full max-w-md p-8  mt-8 mb-12 rounded-2xl shadow-xl 
          ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
        >
          <h2 className="text-3xl font-semibold text-center mb-6 text-[#59f7d8]">Sign Up</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label htmlFor="signup-name" className="block mb-1 font-medium text-[#59f7d8]">Full Name</label>
              <input
                id="signup-name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#24DEB9] outline-none ${isDark ? 'text-white bg-gray-800 placeholder-gray-400' : 'text-black bg-white placeholder-gray-500'}`}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="signup-email" className="block mb-1 font-medium text-[#59f7d8]">Email</label>
              <input
                id="signup-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#24DEB9] outline-none ${isDark ? 'text-white bg-gray-800 placeholder-gray-400' : 'text-black bg-white placeholder-gray-500'}`}
                required
              />
            </div>

            {/* Contact */}
            <div>
              <label htmlFor="signup-contact" className="block mb-1 font-medium  text-[#59f7d8]">Contact</label>
              <input
                id="signup-contact"
                type="text"
                name="contact"
                placeholder="Enter your contact number"
                value={formData.contact}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#24DEB9] outline-none ${isDark ? 'text-white bg-gray-800 placeholder-gray-400' : 'text-black bg-white placeholder-gray-500'}`}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="signup-password" className="block mb-1 font-medium  text-[#59f7d8]">Password</label>
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#24DEB9] outline-none ${isDark ? 'text-white bg-gray-800 placeholder-gray-400' : 'text-black bg-white placeholder-gray-500'}`}
                required
              />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-2 top-8 p-1 text-gray-400">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-black shadow-md hover:shadow-xl transition ease-in-out duration-300"
              style={{ backgroundColor: "#24DEB9" }}
            >
              Sign Up
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-[#59f7d8] hover:underline hover:font-semibold">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </ResponsiveContainer>
  );
};

export default SignUpPage;
