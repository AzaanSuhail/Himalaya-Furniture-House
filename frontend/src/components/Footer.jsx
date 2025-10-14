import React from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
    // Google Maps direction link
    const handleLocate = () => {
        // Store coordinates (latitude, longitude)
        const latitude = 28.352772;
        const longitude = 79.418644;

        // Construct Google Maps direction URL
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

        // Open in a new tab (securely)
        window.open(url, "_blank", "noopener,noreferrer");
    };


    return (
        <motion.footer
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-[#020516] text-white py-10 px-6"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 items-start text-center md:text-left">

                {/* Brand Section */}
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-[#28ffd4] tracking-wide">
                        Himalaya Furniture House
                    </h2>

                    <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                        Crafting comfort and elegance with premium furniture designs that transform
                        your space into timeless beauty.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        <button
                            onClick={handleLocate}
                            className="inline-block bg-[#28ffd4] text-black font-medium px-4 py-2 rounded-lg shadow-md hover:bg-[#22e3bb] transition w-full sm:w-auto"
                            aria-label="Locate Store on Google Maps"
                        >
                            Locate Store
                        </button>

                        <a
                            href="tel:+918433416841"
                            className="inline-flex items-center gap-2 text-gray-200 hover:text-[#28ffd4] transition text-sm"
                            aria-label="Call Himalaya Furniture House"
                        >
                            <Phone className="w-4 h-4 text-[#28ffd4]" />
                            <span className="text-sm">+91-84334 16841</span>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <nav className="flex flex-col items-center md:items-start">
                    <h3 className="text-xl font-semibold text-[#28ffd4] mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li>
                            <a href="/" className="hover:text-[#28ffd4] transition">Home</a>
                        </li>
                        <li>
                            <a href="/services" className="hover:text-[#28ffd4] transition">Services</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-[#28ffd4] transition">Contact</a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-[#28ffd4] transition">About Us</a>
                        </li>
                    </ul>
                </nav>

                {/* Contact & Social */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-xl font-semibold text-[#28ffd4] mb-3">Contact Us</h3>

                    <div className="space-y-3 text-gray-300 text-sm w-full md:w-auto">
                        <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-[#28ffd4] flex-shrink-0 mt-0.5" />
                            <a href="tel:+918433416841" className="hover:text-[#28ffd4] transition">
                                +91-84334 16841
                            </a>
                        </div>

                        <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-[#28ffd4] flex-shrink-0 mt-0.5" />
                            <a
                                href="mailto:himalayafurniturehouse99@gmail.com"
                                className="break-words hover:text-[#28ffd4] transition"
                            >
                                himalayafurniturehouse99@gmail.com
                            </a>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-[#28ffd4] flex-shrink-0 mt-0.5" onClick={handleLocate} />
                            <p className="text-gray-300 text-sm break-words max-w-xs md:max-w-sm">
                                106 Civil Lines, Bareilly, Near Hind Talkies, Opposite Hero Showroom
                            </p>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center justify-center md:justify-start space-x-4 mt-4">
                        <a
                            href="https://www.facebook.com/share/1YGK84X2B9/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Himalaya Furniture House on Facebook"
                            className="p-2 rounded-md bg-transparent hover:bg-white/10 transition"
                        >
                            {/* Inline Facebook SVG to avoid deprecated icon import */}
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2V12h2.2V9.8c0-2.2 1.3-3.5 3.3-3.5.95 0 1.95.17 1.95.17v2.15h-1.1c-1.08 0-1.42.67-1.42 1.36V12h2.42l-.39 2.9h-2.03v7A10 10 0 0022 12z" />
                            </svg>
                        </a>

                        <a
                            href="https://www.instagram.com/himalaya_furniture_house?igsh=MjN2c2x4Mm1mbHM4"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Himalaya Furniture House on Instagram"
                            className="p-2 rounded-md bg-transparent hover:bg-white/10 transition"
                        >
                            {/* Inline Instagram SVG */}
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.4A4.6 4.6 0 1016.6 13 4.6 4.6 0 0012 8.4zM18.5 6.1a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-8 pt-4">
                <div className="max-w-7xl mx-auto px-0 flex flex-col md:flex-row items-center md:justify-between gap-2 text-center md:text-left">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Himalaya Furniture House. All Rights Reserved.
                    </p>
                    <p className="text-gray-500 text-xs">Designed & Managed by Himalaya Furniture House</p>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
