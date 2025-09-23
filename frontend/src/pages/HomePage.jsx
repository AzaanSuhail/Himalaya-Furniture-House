import React from 'react'
import Slideshow from '../components/Slideshow'
import Rooms from "../components/Rooms";
import BrandFeature from '../components/BrandFeature';
import ResponsiveContainer from '../components/ResponsiveContainer';

const Home = () => {
    const roomData = [
        { title: "Living Room", image: "/livingroom.jpg" },
        { title: "Bedroom", image: "/bedroom.jpg" },
        { title: "Dining Room", image: "/diningroom.jpg" },
        { title: "Office Furniture", image: "/office.jpg" },
        { title: "Outdoor Furniture", image: "/outdoor.jpg" },
        { title: "Chairs", image: "/chairs.jpg" },
        { title: "Tables", image: "/tables.jpg" },
        { title: "Beds", image: "/beds.jpg" },
        { title: 'Sofas', image: '/sofas.jpg' },
        { title: 'Storage', image: '/storage.jpg' },
        { title: 'Decor', image: '/decor.jpg' },
        { title: 'Room Dividers,', image: '/dividers.jpg' },
        { title: 'Shoe Racks', image: '/shoe.jpg' },
        { title: 'Coat Racks', image: '/coat.jpg' },
        { title: 'Pet Furniture', image: "/pet.jpg" }
    ];

    return (
        <ResponsiveContainer>
            <Slideshow />
            <Rooms rooms={roomData} />
            <BrandFeature></BrandFeature>
        </ResponsiveContainer>
    )
}

export default Home


