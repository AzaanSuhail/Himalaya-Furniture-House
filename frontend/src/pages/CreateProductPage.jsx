import React, { useState } from "react";
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



    return (
        <ResponsiveContainer>
            <div className="relative min-h-screen flex items-center justify-center p-6">
                {/* 🌈 Radial Gradient Background */}
                <div
                    className="absolute inset-0 -z-10 h-full w-full bg-white 
                [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#24DEB9_100%)]"
                ></div>

                {/* Product Form */}
                <form
                    onSubmit={handleSubmit}

                    className="relative z-10 bg-[#0d1326]/95 shadow-xl rounded-2xl p-8 w-full max-w-lg border border-[#24DEB9]/30"
                >
                    <h2 className="text-3xl font-semibold text-center text-[#24DEB9] mb-6">
                        Create Product
                    </h2>

                    {/* Name */}
                    <div

                        className="mb-4"
                    >
                        <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                            Product Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter product name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-600 bg-[#1a2035] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#24DEB9] outline-none"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div

                        className="mb-4"
                    >
                        <label htmlFor="description" className="block text-gray-300 mb-2 font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter product description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full p-3 rounded-lg border border-gray-600 bg-[#1a2035] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#24DEB9] outline-none"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div

                        className="mb-4"
                    >
                        <label htmlFor="price" className="block text-gray-300 mb-2 font-medium">
                            Price (₹)
                        </label>
                        <input
                            id="price"
                            type="number"
                            name="price"
                            placeholder="Enter price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-600 bg-[#1a2035] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#24DEB9] outline-none"
                            required
                        />
                    </div>

                    {/* Category (select from predefined options) */}
                    <div

                        className="mb-4"
                    >
                        <label htmlFor="category" className="block text-gray-300 mb-2 font-medium">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-600 bg-[#1a2035] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#24DEB9] outline-none"
                            required
                        >
                            <option value="" disabled>
                                -- Select category --
                            </option>
                            <option value="Living Room">Living Room</option>
                            <option value="Bedroom">Bedroom</option>
                            <option value="Dining Room">Dining Room</option>
                            <option value="Office Furniture">Office Furniture</option>
                            <option value="Outdoor Furniture">Outdoor Furniture</option>
                            <option value="Chairs">Chairs</option>
                            <option value="Tables">Tables</option>
                            <option value="Beds">Beds</option>
                            <option value="Sofas">Sofas</option>
                            <option value="Storage">Storage</option>
                            <option value="Decor">Decor</option>
                            <option value="Room Dividers">Room Dividers</option>
                            <option value="Shoe Racks">Shoe Racks</option>
                            <option value="Coat Racks">Coat Racks</option>
                            <option value="Pet Furniture">Pet Furniture</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div

                        className="mb-6"
                    >
                        <label htmlFor="image" className="block text-gray-300 mb-2 font-medium">
                            Product Image
                        </label>
                        <input
                            id="image"
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
                    </div>

                    {/* Button */}
                    <button

                        type="submit"
                        className="w-full bg-[#24DEB9] text-black py-3 rounded-lg font-semibold hover:font-semibold text-lg hover:bg-[#1ed1a3] transition-all duration-300"
                    >
                        Create Product
                    </button>
                </form>
            </div>
        </ResponsiveContainer>
    );
}
