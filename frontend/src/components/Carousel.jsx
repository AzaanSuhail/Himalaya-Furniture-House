"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ProductCarousel = () => {
    const [products, setProducts] = useState([]);

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products/getAllProducts"); // change to your backend endpoint
                const data = await res.json();
                // backend returns { products: [...] }
                setProducts(data.products || data || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="relative overflow-hidden bg-[#121212] py-8">
            {/* Large screens: subtle auto-scroll; Small screens: horizontal scroll with snap */}
            <motion.div
                className="hidden lg:flex gap-8 px-6"
                animate={{ x: ["0%", "-100%"] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
                {[...products, ...products].map((product, index) => (
                    <div
                        key={index}
                        className="min-w-[250px] bg-[#1e1e1e] text-white rounded-2xl shadow-lg p-4"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-xl"
                        />
                        <h2 className="mt-2 text-lg font-bold">{product.name}</h2>
                        <p className="text-sm text-gray-400">{product.description}</p>
                        <p className="mt-2 text-[#1abc9c] font-semibold">₹{product.price}</p>
                    </div>
                ))}
            </motion.div>

            <div className="lg:hidden overflow-x-auto px-4 py-6 scroll-pl-4 snap-x snap-mandatory flex gap-4">
                {products.map((product, index) => (
                    <div key={index} className="min-w-[220px] snap-start bg-[#1e1e1e] text-white rounded-2xl shadow-lg p-4">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-xl" />
                        <h2 className="mt-2 text-lg font-bold">{product.name}</h2>
                        <p className="text-sm text-gray-400">{product.description}</p>
                        <p className="mt-2 text-[#1abc9c] font-semibold">₹{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel;


