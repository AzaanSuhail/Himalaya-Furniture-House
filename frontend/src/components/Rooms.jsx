import React from "react";
import { motion } from "framer-motion";

// --- Updated Variants with Permanent Aqua Shadow ---
const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        // Use the enhanced shadow as the permanent, default state
        boxShadow: "0px 10px 25px rgba(40, 255, 212, 0.4), 0px 8px 24px rgba(0,0,0,0.2)"
    },
    hover: {
        scale: 1.05,
        // The shadow is now permanent, so we only need to manage the scale on hover.
        // The boxShadow from the 'visible' state will persist automatically.
    },
};

const Rooms = ({ rooms }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
            {rooms.map((room, index) => (
                <motion.div
                    key={index}
                    // The main container for the shadow is this motion.div
                    className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                    {/* Room Image */}
                    <img
                        src={room.image}
                        alt={room.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay - This will now fade out on hover */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0">
                        <h2 className="text-white text-2xl  tracking-wide text-center">
                            {room.title}
                        </h2>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Rooms;
