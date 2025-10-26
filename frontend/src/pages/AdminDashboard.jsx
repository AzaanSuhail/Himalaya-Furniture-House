import React, { useEffect, useState } from "react";
import ResponsiveContainer from "../components/ResponsiveContainer";

export default function CreateProduct() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
    });

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(null);

    // ✅ Fetch all products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/products/getAllProducts");
            const data = await res.json();
            setProducts(data.products || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // ✅ Handle input changes (including image)
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

    // ✅ Handle create / update
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editing
            ? `/api/products/${editing}`
            : "/api/products/createProduct";
        const method = editing ? "PUT" : "POST";

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        alert(data.message || (editing ? "Product updated ✅" : "Product created ✅"));

        // Reset form
        setFormData({ name: "", description: "", price: "", image: "", category: "" });
        setEditing(null);
        fetchProducts();
    };

    // ✅ Edit existing product
    const handleEdit = (p) => {
        setEditing(p._id);
        setFormData({
            name: p.name,
            description: p.description,
            price: p.price,
            category: p.category,
            image: p.image,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ✅ Delete product
    const handleDelete = async (id) => {
        if (!confirm("Delete this product?")) return;
        await fetch(`/api/products/deleteProduct/${id}`, { method: "DELETE" });
        fetchProducts();
    };

    return (
        <ResponsiveContainer>
            <div className="relative min-h-screen flex flex-col items-center justify-start p-6 pt-12">
                {/* 🌈 Gradient background */}
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
                        {editing ? "Update Product" : "Create Product"}
                    </h2>

                    {/* Name */}
                    <div className="mb-4">
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
                    <div className="mb-4">
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
                    <div className="mb-4">
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

                    {/* Category */}
                    <div className="mb-4">
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
                    <div className="mb-6">
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
                        {editing ? "Update Product" : "Create Product"}
                    </button>
                </form>

                {/* ✅ Products List Below */}
                <div className="mt-12 w-full max-w-4xl">
                    <h3 className="text-2xl font-semibold text-center text-[#0d1326] mb-4">
                        All Products
                    </h3>

                    {loading ? (
                        <p className="text-center text-gray-600">Loading...</p>
                    ) : products.length === 0 ? (
                        <p className="text-center text-gray-500">No products found.</p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {products.map((p) => (
                                <div
                                    key={p._id}
                                    className="bg-[#0d1326]/90 p-4 rounded-lg shadow-lg border border-[#24DEB9]/20 flex justify-between items-center"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="w-16 h-16 object-cover rounded-md border border-[#24DEB9]/40"
                                        />
                                        <div>
                                            <h4 className="text-[#24DEB9] font-semibold">{p.name}</h4>
                                            <p className="text-gray-400 text-sm">
                                                {p.category} • ₹{p.price}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(p)}
                                            className="px-3 py-1 bg-yellow-500 text-black rounded-md hover:bg-yellow-400"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-500"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ResponsiveContainer>
    );
}
