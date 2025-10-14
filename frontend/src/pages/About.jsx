// import React from "react";
// import { motion } from "framer-motion";
// import {
//     Users,
//     Hammer,
//     Smile,
//     Crown,
//     Palette,
//     Home,
//     Building2,
//     ThumbsUp,
//     Star,
// } from "lucide-react";

// const About = () => {
//     return (
//         <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-800 overflow-hidden">
//             {/* Hero Section */}
//             <section className="relative text-center py-20 overflow-hidden">
//                 <motion.img
//                     initial={{ scale: 1.2, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 0.2 }}
//                     transition={{ duration: 1.8 }}
//                     src="https://cdn.pixabay.com/photo/2017/05/23/22/36/living-room-2331921_1280.jpg"
//                     alt="Furniture Background"
//                     className="absolute inset-0 w-full h-full object-cover"
//                 />
//                 <div className="relative z-10">
//                     <motion.h1
//                         initial={{ opacity: 0, y: -30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                         className="text-5xl md:text-6xl font-bold text-gray-900"
//                     >
//                         About <span className="text-blue-600">Our Legacy</span>
//                     </motion.h1>
//                     <motion.p
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.3 }}
//                         className="mt-5 text-lg text-gray-700 max-w-2xl mx-auto"
//                     >
//                         Established in <span className="font-semibold">1965</span>, we’ve
//                         been crafting elegant furniture that brings warmth, comfort, and
//                         style to homes across generations.
//                     </motion.p>
//                 </div>
//             </section>

//             {/* Legacy Section */}
//             <section className="py-16 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
//                 <motion.div
//                     initial={{ opacity: 0, x: -80 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 1 }}
//                 >
//                     <img
//                         src="https://cdn.pixabay.com/photo/2014/07/31/22/50/living-room-407127_1280.jpg"
//                         alt="Showroom Furniture"
//                         className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
//                     />
//                 </motion.div>

//                 <motion.div
//                     initial={{ opacity: 0, x: 80 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 1 }}
//                 >
//                     <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
//                         A Family Legacy Since 1965
//                     </h2>
//                     <p className="text-gray-600 leading-relaxed mb-4">
//                         What started as a small furniture shop in 1965 has grown into one of
//                         the most trusted furniture showrooms — built on craftsmanship,
//                         trust, and customer satisfaction.
//                     </p>
//                     <p className="text-gray-600 leading-relaxed mb-4">
//                         Now proudly led by{" "}
//                         <span className="font-semibold text-gray-900">
//                             Mr. Tanveer Ahmad Khan & Sons
//                         </span>
//                         , our mission remains simple: to design quality furniture that makes
//                         every space beautiful and functional.
//                     </p>
//                     <p className="text-gray-600 leading-relaxed">
//                         Each design blends modern comfort with timeless craftsmanship —
//                         because true beauty never fades.
//                     </p>
//                 </motion.div>
//             </section>

//             {/* Image Gallery */}
//             <section className="py-16 bg-gradient-to-r from-gray-100 to-white">
//                 <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
//                     {[
//                         "https://cdn.pixabay.com/photo/2016/11/29/09/08/furniture-1868370_1280.jpg",
//                         "https://cdn.pixabay.com/photo/2015/03/26/09/39/living-room-690174_1280.jpg",
//                         "https://cdn.pixabay.com/photo/2017/03/28/12/11/sofa-2185531_1280.jpg",
//                     ].map((img, i) => (
//                         <motion.div
//                             key={i}
//                             whileHover={{ scale: 1.05 }}
//                             initial={{ opacity: 0, y: 50 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.7, delay: i * 0.2 }}
//                             className="rounded-3xl overflow-hidden shadow-lg"
//                         >
//                             <img
//                                 src={img}
//                                 alt={`Furniture ${i}`}
//                                 className="object-cover w-full h-72"
//                             />
//                         </motion.div>
//                     ))}
//                 </div>
//             </section>

//             {/* Features Section */}
//             <section className="py-20 px-6 bg-white">
//                 <motion.h3
//                     initial={{ opacity: 0, y: -20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                     className="text-4xl font-bold text-center text-gray-900 mb-14"
//                 >
//                     Why Customers Love Us
//                 </motion.h3>
//                 <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
//                     {[
//                         {
//                             icon: <Hammer className="w-12 h-12 mx-auto text-blue-600 mb-3" />,
//                             title: "Craftsmanship",
//                             desc: "Every piece is built with precision and care.",
//                         },
//                         {
//                             icon: <Users className="w-12 h-12 mx-auto text-blue-600 mb-3" />,
//                             title: "Family Values",
//                             desc: "A proud legacy led by Tanveer Ahmad Khan & Sons.",
//                         },
//                         {
//                             icon: <Palette className="w-12 h-12 mx-auto text-blue-600 mb-3" />,
//                             title: "Creative Designs",
//                             desc: "We blend tradition with modern aesthetics.",
//                         },
//                         {
//                             icon: <Smile className="w-12 h-12 mx-auto text-blue-600 mb-3" />,
//                             title: "Happy Customers",
//                             desc: "Thousands of satisfied clients since 1965.",
//                         },
//                         {
//                             icon: <Home className="w-12 h-12 mx-auto text-blue-600 mb-3" />,
//                             title: "Elegant Interiors",
//                             desc: "Transforming spaces into timeless homes.",
//                         },
//                         {
//                             icon: <Building2 className="w-12 h-12 mx-auto text-blue-600 mb-3" />,
//                             title: "Showroom Experience",
//                             desc: "A beautiful space to explore our collections.",
//                         },
//                         {
//                             icon: <ThumbsUp className="w-12 h-12 mx-auto text-blue-600 mb-3" />,
//                             title: "Trusted Quality",
//                             desc: "Premium materials ensure long-lasting durability.",
//                         },
//                         {
//                             icon: <Star className="w-12 h-12 mx-auto text-blue-600 mb-3" />,
//                             title: "Award-Winning Service",
//                             desc: "Recognized for excellence and customer care.",
//                         },
//                     ].map((feature, i) => (
//                         <motion.div
//                             key={i}
//                             whileHover={{ scale: 1.05, rotate: 1 }}
//                             initial={{ opacity: 0, y: 50 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.7, delay: i * 0.1 }}
//                             className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-xl transition"
//                         >
//                             {feature.icon}
//                             <h4 className="text-lg font-semibold text-gray-800 mb-2">
//                                 {feature.title}
//                             </h4>
//                             <p className="text-sm text-gray-600">{feature.desc}</p>
//                         </motion.div>
//                     ))}
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default About;


import React from "react";
import { motion } from "framer-motion";
import {
    Users,
    Hammer,
    Smile,
    Palette,
    Home,
    Building2,
    ThumbsUp,
    Star,
} from "lucide-react";

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-800 overflow-hidden">
            {/* Hero Section */}
            <section className="relative text-center py-20 overflow-hidden">
                <motion.img
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.25 }}
                    transition={{ duration: 1.8 }}
                    src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="Furniture Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl font-bold text-gray-900 drop-shadow-lg"
                    >
                        About <span className="text-blue-600">Our Legacy</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-5 text-lg text-gray-800 max-w-2xl mx-auto"
                    >
                        Since <span className="font-semibold">1965</span>, we’ve been
                        designing and building furniture that adds warmth, comfort, and
                        timeless beauty to every home.
                    </motion.p>
                </div>
            </section>

            {/* Legacy Section */}
            <section className="py-16 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <img
                        src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt="Showroom Furniture"
                        className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                        A Family Legacy Since 1965
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Founded in 1965, our showroom has stood as a symbol of trust and
                        excellence in furniture craftsmanship. Every product reflects our
                        decades of experience and dedication.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Today, under the guidance of{" "}
                        <span className="font-semibold text-gray-900">
                            Mr. Tanveer Ahmad Khan & Sons
                        </span>
                        , we continue to deliver custom furniture pieces that bring
                        character and comfort to your spaces.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Our legacy is built on quality, customer satisfaction, and timeless
                        design — values that continue to guide us every day.
                    </p>
                </motion.div>
            </section>

            {/* Image Gallery */}
            <section className="py-16 bg-gradient-to-r from-gray-100 to-white">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
                    {[
                        "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=1600",
                        "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1600",
                        "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1600",
                    ].map((img, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: i * 0.2 }}
                            className="rounded-3xl overflow-hidden shadow-lg"
                        >
                            <img
                                src={img}
                                alt={`Furniture ${i + 1}`}
                                className="object-cover w-full h-72"
                            />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-white">
                <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-bold text-center text-gray-900 mb-14"
                >
                    Why Customers Love Us
                </motion.h3>

                <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                    {[
                        {
                            icon: <Hammer className="w-12 h-12 mx-auto text-blue-600 mb-3" />,
                            title: "Expert Craftsmanship",
                            desc: "Every product is handcrafted by skilled artisans.",
                        },
                        {
                            icon: <Users className="w-12 h-12 mx-auto text-blue-600 mb-3" />,
                            title: "Family Values",
                            desc: "A trusted name led by Tanveer Ahmad Khan & Sons.",
                        },
                        {
                            icon: <Palette className="w-12 h-12 mx-auto text-blue-600 mb-3" />,
                            title: "Modern & Classic Designs",
                            desc: "Furniture that fits both tradition and trend.",
                        },
                        {
                            icon: <Smile className="w-12 h-12 mx-auto text-blue-600 mb-3" />,
                            title: "Happy Customers",
                            desc: "Thousands of satisfied families since 1965.",
                        },
                        {
                            icon: <Home className="w-12 h-12 mx-auto text-blue-600 mb-3" />,
                            title: "Elegant Interiors",
                            desc: "Transforming every house into a beautiful home.",
                        },
                        {
                            icon: <Building2 className="w-12 h-12 mx-auto text-blue-600 mb-3" />,
                            title: "Showroom Experience",
                            desc: "Experience luxury and comfort under one roof.",
                        },
                        {
                            icon: <ThumbsUp className="w-12 h-12 mx-auto text-blue-600 mb-3" />,
                            title: "Premium Quality",
                            desc: "Only the finest materials and finishes used.",
                        },
                        {
                            icon: <Star className="w-12 h-12 mx-auto text-blue-600 mb-3" />,
                            title: "Award-Winning Service",
                            desc: "Recognized for excellence and design innovation.",
                        },
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05, rotate: 1 }}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-xl transition"
                        >
                            {feature.icon}
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                {feature.title}
                            </h4>
                            <p className="text-sm text-gray-600">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
