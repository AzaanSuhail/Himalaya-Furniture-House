import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#020516] text-white py-10 px-6 mt-0"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Brand Section */}
                <div>
                    <h2 className="text-2xl font-normal font-roboto text-[#28ffd4] mb-3">
                        Himalaya Furniture House
                    </h2>
                    <p className="text-gray-300 text-sm">
                        Crafting comfort and elegance with premium furniture designs that
                        transform your space into timeless beauty.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-normal font-roboto text-[#28ffd4] mb-3">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                        <li>
                            <a href="#home" className="hover:text-[#28ffd4] transition">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#services" className="hover:text-[#28ffd4] transition">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:text-[#28ffd4] transition">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="#about" className="hover:text-[#28ffd4] transition">
                                About Us
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact & Social */}
                <div>
                    <h3 className="text-xl font-normal font-roboto text-[#28ffd4] mb-3">
                        Contact Us
                    </h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-center gap-2">
                            <Phone size={18} /> +91 98765 43210
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail size={18} /> info@himalayafurniture.com
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin size={18} /> Main Road, City, India
                        </li>
                    </ul>

                    {/* Social Media */}
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="hover:text-[#28ffd4] transition">
                            <Facebook size={24} />
                        </a>
                        <a href="#" className="hover:text-[#28ffd4] transition">
                            <Instagram size={24} />
                        </a>
                        <a href="#" className="hover:text-[#28ffd4] transition">
                            <Twitter size={24} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400 text-sm">
                © {new Date().getFullYear()} Himalaya Furniture House. All Rights Reserved.
            </div>
        </motion.footer>
    );
};

export default Footer;
