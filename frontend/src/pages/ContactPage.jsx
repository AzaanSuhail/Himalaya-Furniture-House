import React, { useState } from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import ResponsiveContainer from '../components/ResponsiveContainer';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        address: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const response = await fetch("/api/send-mail/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "Failed to send email.");
            } else {
                setSuccess(data.message || "Message sent!");
                setFormData({ name: "", contact: "", address: "", email: "" });
            }
        } catch (error) {
            console.error('Contact form submit error:', error);
            setError(error?.message || "Network error. Please try again later.");
            return; // handled - exit early
        } finally {
            setLoading(false);
        }
    };

    const leftVariant = {
        hidden: { x: -80, opacity: 0 },
        visible: { x: 0, opacity: 1 },
    };

    const rightVariant = {
        hidden: { x: 80, opacity: 0 },
        visible: { x: 0, opacity: 1 },
    };

    return (
        <ResponsiveContainer>
            <div className="relative min-h-screen flex items-center justify-center p-6">
                {/* 🌈 Radial Gradient Background */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-white 
                [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#24DEB9_100%)]">
                </div>

                {/* Contact Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.2 }}
                    className="relative z-10 bg-[#0d1326]/95 shadow-xl rounded-2xl mt-8 mb-6 p-8 w-full max-w-lg border border-[#24DEB9]/30"
                >
                    {error && (
                        <div className="mb-4 text-red-400 font-semibold text-center">{error}</div>
                    )}
                    {success && (
                        <div className="mb-4 text-green-400 font-semibold text-center">{success}</div>
                    )}
                    <h2 className="text-3xl font-bold font-roboto text-center text-[#24DEB9] mb-6">
                        Contact Us
                    </h2>

                    {/* Name */}
                    <motion.div variants={leftVariant} transition={{ duration: 0.6, ease: "easeOut" }} className="mb-4">
                        <label htmlFor="contact-name" className="block text-gray-300 mb-2 font-medium">Full Name</label>
                        <input
                            type="text"
                            id="contact-name"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-600 bg-[#1a2035] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#24DEB9] outline-none"
                            required
                        />
                    </motion.div>

                    {/* Contact */}
                    <motion.div variants={rightVariant} transition={{ duration: 0.6, ease: "easeOut" }} className="mb-4">
                        <label htmlFor="contact-number" className="block text-gray-300 mb-2 font-medium">Contact Number</label>
                        <input
                            type="text"
                            id="contact-number"
                            name="contact"
                            placeholder="Enter your contact number"
                            value={formData.contact}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-600 bg-[#1a2035] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#24DEB9] outline-none"
                            required
                        />
                    </motion.div>

                    {/* Address */}
                    <motion.div variants={leftVariant} transition={{ duration: 0.6, ease: "easeOut" }} className="mb-4">
                        <label htmlFor="contact-address" className="block text-gray-300 mb-2 font-medium">Address</label>
                        <input
                            type="text"
                            id="contact-address"
                            name="address"
                            placeholder="Enter your address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-600 bg-[#1a2035] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#24DEB9] outline-none"
                            required
                        />
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={rightVariant} transition={{ duration: 0.6, ease: "easeOut" }} className="mb-6">
                        <label htmlFor="contact-email" className="block text-gray-300 mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            id="contact-email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-600 bg-[#1a2035] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#24DEB9] outline-none"
                            required
                        />
                    </motion.div>

                    {/* Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-[#24DEB9] text-black py-3 rounded-lg font-bold text-lg hover:bg-[#1ed1a3] transition-all duration-300"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </motion.button>
                </motion.form>
            </div>
        </ResponsiveContainer>
    );
}
