import React from "react";
import { useNavigate } from "react-router-dom";
import Slideshow from "../components/Slideshow";
import Rooms from "../components/Rooms";
import BrandFeature from "../components/BrandFeature";
import ResponsiveContainer from "../components/ResponsiveContainer";

const Home = () => {
    const navigate = useNavigate();

    const roomData = [
        { title: "Living Room", image: "/livingroom.jpg" },
        { title: "Bedroom", image: "/bedroom.jpg" },
        { title: "Dining Room", image: "/diningroom.jpg" },
        { title: "Office Furniture", image: "/office.jpg" },
        { title: "Outdoor Furniture", image: "/outdoor.jpg" },
        { title: "Chairs", image: "/chairs.jpg" },
        { title: "Tables", image: "/tables.jpg" },
        { title: "Beds", image: "/beds.jpg" },
        { title: "Sofas", image: "/sofas.jpg" },
        { title: "Storage", image: "/storage.jpg" },
        { title: "Decor", image: "/decor.jpg" },
        { title: "Room Dividers", image: "/dividers.jpg" },
        { title: "Shoe Racks", image: "/shoe.jpg" },
        { title: "Coat Racks", image: "/coat.jpg" },
        { title: "Pet Furniture", image: "/pet.jpg" },
    ];

    // Handle click on a product
    const handleRoomClick = (title) => {
        const slug = title.toLowerCase().replace(/ /g, "-").replace(/,/g, "");
        navigate(`/${slug}`);
    };

    return (
        <ResponsiveContainer>
            <Slideshow />
            <h1
                className="text-center text-xl md:text-3xl font-semibold pt-6 pb-6 
             bg-[#1cb29947] rounded-lg text-black 
             transition-all duration-700 ease-in-out
             hover:underline hover:decoration-[#00bfa6]
             hover:scale-105 hover:shadow-[0_0_30px_rgba(0,191,166,0.4)]
             hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#00bfa6] hover:to-[#00796b]"
            >
                Our Products & Services
            </h1>


            <Rooms rooms={roomData} onRoomClick={handleRoomClick} />

            {/* Brand Feature Section */}
            <BrandFeature />
        </ResponsiveContainer>
    );
};

export default Home;

