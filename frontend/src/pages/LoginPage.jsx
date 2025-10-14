import { motion } from "framer-motion";
import React, { useState } from "react";
// motion not needed in this file
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from 'lucide-react';
import ResponsiveContainer from '../components/ResponsiveContainer';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isDark, setIsDark] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                // Throw an error to be caught by the catch block
                throw new Error(data.message || "Invalid email or password");
            }

            // --- Successful Login ---
            // In a real app, you would save the user data to a global state (Context, Redux)
            // For now, we just redirect.
            console.log("Login successful:", data);
            toast.success("Login successful!");
            // Let other parts of the app (Navbar) know auth changed
            window.dispatchEvent(new CustomEvent('authChanged', { detail: { user: data } }));
            navigate("/"); // Redirect to the homepage or a dashboard

        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <ResponsiveContainer>
            <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
                {/* Background with #24DEB9 */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#24DEB9_100%)]">
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
                    className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
                >
                    <h2 className="text-3xl font-semibold text-center text-[#59f7d8] mb-6">Login</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="login-email" className="block mb-1 font-medium text-[#59f7d8]">Email</label>
                            <input
                                id="login-email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#24DEB9] outline-none ${isDark ? 'text-white bg-gray-800 placeholder-gray-400' : 'text-black bg-white placeholder-gray-500'}`}
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="login-password" className="block mb-1 font-medium text-[#59f7d8]">Password</label>
                            <input
                                id="login-password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#24DEB9] outline-none ${isDark ? 'text-white bg-gray-800 placeholder-gray-400' : 'text-black bg-white placeholder-gray-500'}`}
                            />
                            <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-2 top-8 p-1 text-gray-400">
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.05 }}
                            whileTap={{ scale: loading ? 1 : 0.95 }}
                            className="w-full py-3 rounded-lg font-semibold text-black shadow-md hover:shadow-xl transition flex items-center justify-center disabled:opacity-60"
                            style={{ backgroundColor: "#24DEB9" }}
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
                            ) : (
                                "Login"
                            )}
                        </motion.button>
                    </form>

                    <p className="mt-6 text-center text-sm">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-[#59f7d8] hover:underline hover:font-semibold ">
                            Sign Up
                        </Link>
                    </p>
                </motion.div>
            </div>
        </ResponsiveContainer>
    );
};

export default LoginPage;
