import React from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

// --- Updated Variants with Permanent Aqua Shadow ---
const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        boxShadow: "0px 10px 25px rgba(40, 255, 212, 0.4), 0px 8px 24px rgba(0,0,0,0.2)"
    },
    hover: { scale: 1.05 },
};

const Rooms = ({ rooms }) => {
    const navigate = useNavigate();

    const handleClick = (title) => {
        const slug = title.toLowerCase().replace(/ /g, "-").replace(/,/g, "");
        navigate(`/${slug}`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
            {rooms.map((room) => (
                <motion.div
                    key={room.title || room.image}
                    className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    transition={{ duration: 0.5 }}
                    onClick={() => handleClick(room.title)}
                >
                    <img
                        src={room.image}
                        alt={room.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0">
                        <h2 className="text-white text-2xl tracking-wide text-center">
                            {room.title}
                        </h2>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

Rooms.propTypes = {
    rooms: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, image: PropTypes.string })).isRequired,
};

export default Rooms;
