import React, { useState } from "react";
import { motion } from "framer-motion";
import ResponsiveContainer from '../components/ResponsiveContainer';

export default function CreateProduct() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image" && files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/products/createProduct", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        alert(data.message || "Product created successfully ✅");

        // Reset form
        setFormData({
            name: "",
            description: "",
            price: "",
            image: "",
            category: "",
        });
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
                <div
                    className="absolute inset-0 -z-10 h-full w-full bg-white 
                [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#24DEB9_100%)]"
                ></div>

                {/* Product Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.2 }}
                    className="relative z-10 bg-[#0d1326]/95 shadow-xl rounded-2xl p-8 w-full max-w-lg border border-[#24DEB9]/30"
                >
                    <h2 className="text-3xl font-semibold text-center text-[#24DEB9] mb-6">
                        Create Product
                    </h2>

                    {/* Name */}
                    <motion.div
                        variants={leftVariant}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-4"
                    >
                        <label className="block text-gray-300 mb-2 font-medium">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter product name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-600 bg-[#1a2035] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#24DEB9] outline-none"
                            required
                        />
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        variants={rightVariant}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-4"
                    >
                        <label className="block text-gray-300 mb-2 font-medium">
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Enter product description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full p-3 rounded-lg border border-gray-600 bg-[#1a2035] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#24DEB9] outline-none"
                            required
                        />
                    </motion.div>

                    {/* Price */}
                    <motion.div
                        variants={leftVariant}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-4"
                    >
                        <label className="block text-gray-300 mb-2 font-medium">
                            Price (₹)
                        </label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Enter price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-600 bg-[#1a2035] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#24DEB9] outline-none"
                            required
                        />
                    </motion.div>

                    {/* Category */}
                    <motion.div
                        variants={rightVariant}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-4"
                    >
                        <label className="block text-gray-300 mb-2 font-medium">
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            placeholder="Enter category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-600 bg-[#1a2035] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#24DEB9] outline-none"
                            required
                        />
                    </motion.div>

                    {/* Image Upload */}
                    <motion.div
                        variants={leftVariant}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-6"
                    >
                        <label className="block text-gray-300 mb-2 font-medium">
                            Product Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-600 bg-[#1a2035] text-gray-400 focus:ring-2 focus:ring-[#24DEB9] outline-none"
                        />
                        {formData.image && (
                            <img
                                src={formData.image}
                                alt="Preview"
                                className="mt-3 w-32 h-32 object-cover rounded-lg border border-[#24DEB9]/40"
                            />
                        )}
                    </motion.div>

                    {/* Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-[#24DEB9] text-black py-3 rounded-lg font-semibold hover:font-semibold text-lg hover:bg-[#1ed1a3] transition-all duration-300"
                    >
                        Create Product
                    </motion.button>
                </motion.form>
            </div>
        </ResponsiveContainer>
    );
}
