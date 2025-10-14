
import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { Heart, MapPin } from "lucide-react"; // Imported MapPin
import { Link, NavLink } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

// PascalCase aliases for motion components
const MotionNav = Motion.nav;
const MotionDiv = Motion.div;

const Navbar = () => {
    const { user, logout } = useAuth();
    const isAuthenticated = !!user;
    const isAdmin = user?.role === 'admin';
    const [wishlistCount, setWishlistCount] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLocate = () => {
        // Store coordinates (latitude, longitude)
        const latitude = 28.352772;
        const longitude = 79.418644;

        // Construct Google Maps direction URL
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

        // Open in a new tab (securely)
        window.open(url, "_blank", "noopener,noreferrer");
    };

    useEffect(() => {
        // fetch wishlist to get count
        fetch('/api/products/wishlist', { credentials: 'include' })
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => { setWishlistCount(d?.wishlist?.length || 0); })
            .catch(() => { });

        // listen for wishlist updates from other pages
        const onUpdate = (e) => {
            if (e?.detail?.count != null) setWishlistCount(e.detail.count); else {
                // fallback: refetch
                fetch('/api/products/wishlist', { credentials: 'include' }).then(r => r.ok ? r.json() : null).then(d => { setWishlistCount(d?.wishlist?.length || 0) }).catch(() => { });
            }
        };
        window.addEventListener('wishlistUpdated', onUpdate);
        return () => window.removeEventListener('wishlistUpdated', onUpdate);
    }, []);

    const handleLogout = async () => {
        await logout();
        setWishlistCount(0);
        window.location.href = '/';
    };

    const getActiveClass = ({ isActive }) =>
        isActive ? "text-[#28ffd4] font-semibold underline" : "text-white hover:underline hover:animate-pulse";

    return (
        <>
            <MotionNav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-[#020516] text-white shadow-md p-2"
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/logo.png" alt="Himalaya Furniture House" className="w-14 object-contain" />
                        <span className="hidden sm:inline-block font-normal text-3xl text-[#28ffd4] font-roboto">Himalaya Furniture House</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center text-lg">
                        <MotionDiv whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                            <NavLink to="/" className={getActiveClass}>Home</NavLink>
                        </MotionDiv>
                        <MotionDiv whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                            <NavLink to="/about" className={getActiveClass}>About</NavLink>
                        </MotionDiv>
                        <MotionDiv whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                            <NavLink to="/services" className={getActiveClass}>Services</NavLink>
                        </MotionDiv>
                        <MotionDiv whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                            <NavLink to="/contact" className={getActiveClass}>Contact</NavLink>
                        </MotionDiv>

                        <Link
                            to="#"
                            onClick={handleLocate}
                            className="relative cursor-pointer group"
                        >
                            <MapPin
                                className="w-7 h-7 text-[#28ffd4] hover:scale-110 transition-transform"
                                strokeWidth={1}
                            />
                            {/* Tooltip */}
                            <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                Location
                            </span>
                        </Link>

                        {/* Auth Buttons */}
                        {!isAuthenticated ? (
                            <>
                                <MotionDiv whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                    <Link to="/login" className="px-4 py-2 rounded-lg bg-[#34495e] hover:bg-[#26ffd4] hover:text-black hover:font-semibold">Login</Link>
                                </MotionDiv>
                                <MotionDiv whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                    <Link to="/signup" className="px-4 py-2 rounded-lg bg-[#24deb9] hover:bg-[#26ffd4] text-black font-semibold">Signup</Link>
                                </MotionDiv>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                {isAdmin && (
                                    <MotionDiv whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                        <Link to="/admin/products" className="px-3 py-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-400 font-semibold">Dashboard</Link>
                                    </MotionDiv>
                                )}
                                <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-red-600 text-white">Logout</button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Topbar */}
                    <div className="md:hidden flex items-center space-x-4">
                        {/* --- Location Icon Added Here --- */}
                        <Link to="#" onClick={handleLocate}>
                            <MapPin className="w-7 h-7 text-[#28ffd4]" strokeWidth={1} />
                        </Link>

                        {/* --- Wishlist Icon was removed from here --- */}

                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="px-3 py-1 rounded-md bg-[#34495e] hover:bg-[#26ffd4] hover:text-black text-sm hover:font-semibold">Login</Link>
                                <Link to="/signup" className="px-3 py-1 rounded-md bg-[#24deb9] hover:bg-[#26ffd4] text-black hover:font-semibold text-sm">Signup</Link>
                            </>
                        ) : (
                            isAdmin && (
                                <Link to="/admin/products" className="px-3 py-1 rounded-md bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-semibold">Admin</Link>
                            )
                        )}

                        <button aria-label="Toggle menu" onClick={() => setMobileOpen((s) => !s)} className="p-2 rounded-md bg-transparent hover:bg-white/10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </MotionNav>

            {mobileOpen && (
                <MotionDiv initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="md:hidden bg-[#020516] text-white shadow-lg overflow-hidden">
                    <div className="px-6 py-6 flex flex-col items-center gap-5 text-lg font-medium">
                        <NavLink to="/" onClick={() => setMobileOpen(false)} className={getActiveClass}>Home</NavLink>
                        <NavLink to="/about" onClick={() => setMobileOpen(false)} className={getActiveClass}>About</NavLink>
                        <NavLink to="/services" onClick={() => setMobileOpen(false)} className={getActiveClass}>Services</NavLink>
                        <NavLink to="/contact" onClick={() => setMobileOpen(false)} className={getActiveClass}>Contact</NavLink>
                    </div>
                </MotionDiv>
            )}
        </>
    );
};

export default Navbar;