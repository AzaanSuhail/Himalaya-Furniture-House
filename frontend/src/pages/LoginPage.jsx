import React, { useState } from "react";
import { motion } from "framer-motion";
import ResponsiveContainer from '../components/ResponsiveContainer';

const LoginPage = () => {
    const [isDark, setIsDark] = useState(true);

    return (
        <ResponsiveContainer>
            <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
                {/* Background with #24DEB9 */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-white 
        [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#24DEB9_100%)]">
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
                    className={`w-full max-w-md p-8 rounded-2xl shadow-xl 
          ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
                >
                    <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

                    <form className="space-y-5">
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#24DEB9] outline-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#24DEB9] outline-none"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 rounded-lg font-semibold text-black  shadow-md hover:shadow-xl transition hover:text-white  "
                            style={{ backgroundColor: "#24DEB9" }}
                        >
                            Login
                        </motion.button>
                    </form>

                    <p className="mt-6 text-center text-sm">
                        Don’t have an account?{" "}
                        <a href="/signup" className="text-[#24DEB9] hover:underline hover:font-semibold ">
                            Sign Up
                        </a>
                    </p>
                </motion.div>
            </div>
        </ResponsiveContainer>
    );
};

export default LoginPage;
