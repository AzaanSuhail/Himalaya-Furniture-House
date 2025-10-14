import React from 'react';
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook
import ResponsiveContainer from '../components/ResponsiveContainer';

// --- Reusable SVG Icon Components ---
const DesignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
  </svg>
);
const CustomizationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a2.25 2.25 0 012.4-2.245 4.5 4.5 0 00-8.4 2.245c0 .399.078.78.22 1.128zm0 0l-1.128-5.78a3 3 0 00-1.128-5.78 2.25 2.25 0 01-2.245-2.4 4.5 4.5 0 002.245-8.4c.399 0 .78.078 1.128.22z" />
  </svg>
);
const DeliveryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 003.375-3.375h1.5a1.125 1.125 0 011.125 1.125v-1.5a3.375 3.375 0 00-3.375-3.375H3.375" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-6m6 0a3.375 3.375 0 003.375-3.375V9.375m-16.5 0a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375-3.375 3.375 0 00-3.375-3.375H6.75A3.375 3.375 0 003.375 9.375v1.875" />
  </svg>
);

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function ServicesPage() {
  const navigate = useNavigate(); // 2. Initialize the navigate function

  const services = [
    {
      icon: <DesignIcon />,
      title: "Interior Design",
      description: "Our experts help you create harmonious spaces with personalized design consultations."
    },
    {
      icon: <CustomizationIcon />,
      title: "Bespoke Furniture",
      description: "Customize fabrics, finishes, and dimensions to create pieces that are uniquely yours."
    },
    {
      icon: <DeliveryIcon />,
      title: "White-Glove Delivery",
      description: "Enjoy seamless delivery, professional assembly, and packaging removal by our dedicated team."
    }
  ];

  return (
    <ResponsiveContainer>
      <div className="bg-white font-sans">
        {/* --- Hero Section --- */}
        <div className="relative h-[60vh] bg-gray-900">
          <img
            src="https://placehold.co/1800x800/222232/FFFFFF?text=Stunning+Showroom"
            alt="Stylishly decorated living room"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              More Than Furniture.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl max-w-2xl"
            >
              We provide complete home solutions, from personalized design consultations to bespoke creations and flawless delivery.
            </motion.p>
          </div>
        </div>

        {/* --- Core Services Grid --- */}
        <div className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
            >
              {services.map((service) => (
                <motion.div key={service.title} variants={fadeIn} className="flex flex-col items-center">
                  <div className="p-4 bg-blue-100 rounded-full mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-800">{service.title}</h3>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* --- Detailed Section 1: Interior Design --- */}
        <div className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <img src="https://placehold.co/600x400/E0E7FF/3730A3?text=Design+Consultation" alt="Interior designer consulting with a client" className="rounded-lg shadow-xl w-full" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl font-bold text-gray-800">Expert Space Planning</h2>
              <p className="mt-4 text-lg text-gray-600">
                Struggling to visualize your space? Our professional interior designers work with you to understand your lifestyle and aesthetic. We create functional, beautiful layouts and help you select the perfect pieces to bring your vision to life.
              </p>

              <a href="/contact">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-6 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all">
                  Book a Free Consultation
                </motion.button>
              </a>
            </motion.div>
          </div>
        </div>

        {/* --- Detailed Section 2: Custom Furniture --- */}
        <div className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="md:order-2">
              <img src="https://placehold.co/600x400/D1FAE5/065F46?text=Custom+Creations" alt="Craftsman working on a piece of custom furniture" className="rounded-lg shadow-xl w-full" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="md:order-1">
              <h2 className="text-3xl font-bold text-gray-800">Your Vision, Our Craftsmanship</h2>
              <p className="mt-4 text-lg text-gray-600">
                Don't settle for 'almost perfect'. With our bespoke service, you control the final product. Choose from a curated selection of premium fabrics, sustainable woods, and fine finishes to create furniture that is a true reflection of your personal style.
              </p>

            </motion.div>
          </div>
        </div>

        {/* --- Final CTA Section --- */}
        <div className="bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center py-20 px-6">
            <motion.h2 initial="hidden" whileInView="visible" variants={fadeIn} viewport={{ once: true }} className="text-4xl font-bold">
              Ready to build your dream space?
            </motion.h2>
            <motion.p initial="hidden" whileInView="visible" variants={fadeIn} viewport={{ once: true }} className="mt-4 text-lg text-blue-100">
              Our experts are ready to assist you at every step. Visit our showroom or contact us online to get started.
            </motion.p>
            <motion.button
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')} // 3. Add the onClick handler
              className="mt-8 bg-white text-blue-600 font-bold py-3 px-10 rounded-lg shadow-xl hover:bg-gray-100 transition-all">
              Contact Us
            </motion.button>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
}

