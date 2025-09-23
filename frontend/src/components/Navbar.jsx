// import React, { useState, useEffect } from "react";
// import { motion as Motion } from "framer-motion";
// import { Heart } from "lucide-react";
// import { Link, NavLink, useNavigate } from "react-router-dom";

// const Navbar = () => {
//     const isAdmin = true; // Simulating admin check
//     const [wishlistCount, setWishlistCount] = useState(0);
//     const [mobileOpen, setMobileOpen] = useState(false);
//     const navigate = useNavigate();

//     // ✅ Redirect to admin page if user is admin
//     useEffect(() => {
//         if (isAdmin) {
//             navigate("/admin");
//         }
//     }, [isAdmin, navigate]);

//     const handleAddToWishlist = () => {
//         setWishlistCount((prev) => prev + 1);
//     };

//     const getActiveClass = ({ isActive }) =>
//         isActive
//             ? "text-[#28ffd4] font-semibold underline"
//             : "text-white hover:underline hover:animate-pulse";

//     return (
//         <>
//             <Motion.nav
//                 initial={{ y: -80, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.7, ease: "easeOut" }}
//                 className="bg-[#020516] text-white shadow-md p-2"
//             >
//                 <div className="max-w-7xl mx-auto flex justify-between items-center">
//                     {/* Logo */}
//                     <Link to="/" className="flex items-center gap-3">
//                         <img
//                             src="/logo.png"
//                             alt="Himalaya Furniture House"
//                             className="w-14 object-contain"
//                         />
//                         <span className="hidden sm:inline-block font-normal text-3xl text-[#28ffd4] font-roboto">
//                             Himalaya Furniture House
//                         </span>
//                     </Link>

//                     {/* Desktop Menu */}
//                     <div className="hidden md:flex space-x-6 items-center text-lg">
//                         <Motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
//                             <NavLink to="/" className={getActiveClass}>
//                                 Home
//                             </NavLink>
//                         </Motion.div>
//                         <Motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
//                             <NavLink to="/about" className={getActiveClass}>
//                                 About
//                             </NavLink>
//                         </Motion.div>
//                         <Motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
//                             <NavLink to="/services" className={getActiveClass}>
//                                 Services
//                             </NavLink>
//                         </Motion.div>
//                         <Motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
//                             <NavLink to="/contact" className={getActiveClass}>
//                                 Contact
//                             </NavLink>
//                         </Motion.div>

//                         {/* Wishlist */}
//                         <div
//                             onClick={handleAddToWishlist}
//                             className="relative cursor-pointer group"
//                         >
//                             <Heart
//                                 className="w-7 h-7 text-[#28ffd4] hover:scale-110 transition-transform"
//                                 fill={wishlistCount > 0 ? "#28ffd4" : "transparent"}
//                             />
//                             {wishlistCount > 0 && (
//                                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                                     {wishlistCount}
//                                 </span>
//                             )}
//                             <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
//                                 Wishlist
//                             </span>
//                         </div>

//                         {/* Login & Signup */}
//                         <Motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
//                             <Link
//                                 to="/login"
//                                 className="px-4 py-2 rounded-lg bg-[#34495e] hover:bg-[#26ffd4] hover:text-black hover:font-semibold"
//                             >
//                                 Login
//                             </Link>
//                         </Motion.div>

//                         <Motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
//                             <Link
//                                 to="/signup"
//                                 className="px-4 py-2 rounded-lg bg-[#24deb9] hover:bg-[#26ffd4] text-black font-semibold"
//                             >
//                                 Signup
//                             </Link>
//                         </Motion.div>
//                     </div>

//                     {/* Mobile Topbar */}
//                     <div className="md:hidden flex items-center space-x-3">
//                         {/* Wishlist */}
//                         <div
//                             onClick={handleAddToWishlist}
//                             className="relative cursor-pointer group"
//                         >
//                             <Heart
//                                 className="w-7 h-7 text-[#28ffd4] hover:scale-110 transition-transform"
//                                 fill={wishlistCount > 0 ? "#28ffd4" : "transparent"}
//                             />
//                             {wishlistCount > 0 && (
//                                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                                     {wishlistCount}
//                                 </span>
//                             )}
//                         </div>

//                         {/* Login */}
//                         <Link
//                             to="/login"
//                             className="px-3 py-1 rounded-md bg-[#34495e] hover:bg-[#26ffd4] hover:text-black text-sm hover:font-semibold"
//                         >
//                             Login
//                         </Link>

//                         {/* Signup */}
//                         <Link
//                             to="/signup"
//                             className="px-3 py-1 rounded-md bg-[#24deb9] hover:bg-[#26ffd4] text-black hover:font-semibold text-sm"
//                         >
//                             Signup
//                         </Link>

//                         {/* Hamburger */}
//                         <button
//                             aria-label="Toggle menu"
//                             onClick={() => setMobileOpen((s) => !s)}
//                             className="p-2 rounded-md bg-transparent hover:bg-white/10"
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-6 w-6"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 {mobileOpen ? (
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M6 18L18 6M6 6l12 12"
//                                     />
//                                 ) : (
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M4 6h16M4 12h16M4 18h16"
//                                     />
//                                 )}
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             </Motion.nav>

//             {/* Mobile Menu Panel */}
//             {mobileOpen && (
//                 <Motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.4, ease: "easeInOut" }}
//                     className="md:hidden bg-[#020516] text-white shadow-lg overflow-hidden"
//                 >
//                     <div className="px-6 py-6 flex flex-col items-center gap-5 text-lg font-medium">
//                         <NavLink
//                             to="/"
//                             onClick={() => setMobileOpen(false)}
//                             className={getActiveClass}
//                         >
//                             Home
//                         </NavLink>
//                         <NavLink
//                             to="/about"
//                             onClick={() => setMobileOpen(false)}
//                             className={getActiveClass}
//                         >
//                             About
//                         </NavLink>
//                         <NavLink
//                             to="/services"
//                             onClick={() => setMobileOpen(false)}
//                             className={getActiveClass}
//                         >
//                             Services
//                         </NavLink>
//                         <NavLink
//                             to="/contact"
//                             onClick={() => setMobileOpen(false)}
//                             className={getActiveClass}
//                         >
//                             Contact
//                         </NavLink>
//                     </div>
//                 </Motion.div>
//             )}
//         </>
//     );
// };

// export default Navbar;

import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const isAdmin = false; // ✅ Set true if admin is logged in
    const isAuthenticated = false; // ✅ Set true if any user is logged in (admin or client)

    const [wishlistCount, setWishlistCount] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleAddToWishlist = () => {
        setWishlistCount((prev) => prev + 1);
    };

    const getActiveClass = ({ isActive }) =>
        isActive
            ? "text-[#28ffd4] font-semibold underline"
            : "text-white hover:underline hover:animate-pulse";

    return (
        <>
            <Motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-[#020516] text-white shadow-md p-2"
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="Himalaya Furniture House"
                            className="w-14 object-contain"
                        />
                        <span className="hidden sm:inline-block font-normal text-3xl text-[#28ffd4] font-roboto">
                            Himalaya Furniture House
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center text-lg">
                        {/* Navigation links */}
                        <Motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                            <NavLink to="/" className={getActiveClass}>Home</NavLink>
                        </Motion.div>
                        <Motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                            <NavLink to="/about" className={getActiveClass}>About</NavLink>
                        </Motion.div>
                        <Motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                            <NavLink to="/services" className={getActiveClass}>Services</NavLink>
                        </Motion.div>
                        <Motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                            <NavLink to="/contact" className={getActiveClass}>Contact</NavLink>
                        </Motion.div>

                        {/* Wishlist */}
                        <div onClick={handleAddToWishlist} className="relative cursor-pointer group">
                            <Heart
                                className="w-7 h-7 text-[#28ffd4] hover:scale-110 transition-transform"
                                fill={wishlistCount > 0 ? "#28ffd4" : "transparent"}
                            />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {wishlistCount}
                                </span>
                            )}
                            <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                Wishlist
                            </span>
                        </div>

                        {/* Auth Buttons */}
                        {!isAuthenticated ? (
                            <>
                                {/* Login */}
                                <Motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 rounded-lg bg-[#34495e] hover:bg-[#26ffd4] hover:text-black hover:font-semibold"
                                    >
                                        Login
                                    </Link>
                                </Motion.div>

                                {/* Signup */}
                                <Motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                    <Link
                                        to="/signup"
                                        className="px-4 py-2 rounded-lg bg-[#24deb9] hover:bg-[#26ffd4] text-black font-semibold"
                                    >
                                        Signup
                                    </Link>
                                </Motion.div>
                            </>
                        ) : (
                            isAdmin && (
                                <Motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                    <Link
                                        to="/admin"
                                        className="px-4 py-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-400 font-semibold"
                                    >
                                        Admin
                                    </Link>
                                </Motion.div>
                            )
                        )}
                    </div>

                    {/* Mobile Topbar */}
                    <div className="md:hidden flex items-center space-x-3">
                        {/* Wishlist */}
                        <div onClick={handleAddToWishlist} className="relative cursor-pointer group">
                            <Heart
                                className="w-7 h-7 text-[#28ffd4] hover:scale-110 transition-transform"
                                fill={wishlistCount > 0 ? "#28ffd4" : "transparent"}
                            />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {wishlistCount}
                                </span>
                            )}
                        </div>

                        {/* Auth Buttons - MOBILE */}
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    className="px-3 py-1 rounded-md bg-[#34495e] hover:bg-[#26ffd4] hover:text-black text-sm hover:font-semibold"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-3 py-1 rounded-md bg-[#24deb9] hover:bg-[#26ffd4] text-black hover:font-semibold text-sm"
                                >
                                    Signup
                                </Link>
                            </>
                        ) : (
                            isAdmin && (
                                <Link
                                    to="/admin"
                                    className="px-3 py-1 rounded-md bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-semibold"
                                >
                                    Admin
                                </Link>
                            )
                        )}

                        {/* Hamburger */}
                        <button
                            aria-label="Toggle menu"
                            onClick={() => setMobileOpen((s) => !s)}
                            className="p-2 rounded-md bg-transparent hover:bg-white/10"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </Motion.nav>

            {/* Mobile Menu Panel */}
            {mobileOpen && (
                <Motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="md:hidden bg-[#020516] text-white shadow-lg overflow-hidden"
                >
                    <div className="px-6 py-6 flex flex-col items-center gap-5 text-lg font-medium">
                        <NavLink to="/" onClick={() => setMobileOpen(false)} className={getActiveClass}>Home</NavLink>
                        <NavLink to="/about" onClick={() => setMobileOpen(false)} className={getActiveClass}>About</NavLink>
                        <NavLink to="/services" onClick={() => setMobileOpen(false)} className={getActiveClass}>Services</NavLink>
                        <NavLink to="/contact" onClick={() => setMobileOpen(false)} className={getActiveClass}>Contact</NavLink>
                    </div>
                </Motion.div>
            )}
        </>
    );
};

export default Navbar;
