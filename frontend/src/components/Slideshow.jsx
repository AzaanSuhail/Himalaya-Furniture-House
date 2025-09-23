import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg",
  "/img5.jpg",
  "/img6.jpg",
  "/img7.jpg",
  "/img8.jpg",
];

export default function AutoSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // change image every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden shadow-lg">
      {images.map((img, index) => (
        <motion.img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1, x: 50 }} // start zoomed & shifted
          animate={
            index === currentIndex
              ? { opacity: 1, scale: 1, x: 0 }
              : { opacity: 0, scale: 1.1, x: -50 }
          }
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      ))}

      {/* Overlay text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-black/40"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3, ease: "easeOut", delay: 0.4 }}
      >
        <h1 className="text-white text-4xl md:text-4xl font-semibold font-dancing text-center px-4">
          Transforming Spaces with Timeless Furniture
        </h1>
      </motion.div>
    </div>
  );
}

