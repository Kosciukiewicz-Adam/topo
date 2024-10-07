import React from "react";
import imgSrc from "../assets/larambla.jpg";
import img1 from "../assets/climbingPartner.jpg";
import img2 from "../assets/creating.webp";
import img3 from "../assets/guidebook.jpg";
import img4 from "../assets/topo.jpg";

import PolaroidCard from "../elements/PolaroidCard.tsx";
import "../styles/Roles.scss";

interface Role {
    name: string;
    description: string;
    imgSrc: any;
}

const Roles: React.FC = () => {
    const mockDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

    const roles: Role[] = [
        { name: "Find climbing partners", description: mockDescription, imgSrc: img1 },
        { name: "Check topo", description: mockDescription, imgSrc: img2 },
        { name: "Log ascends", description: mockDescription, imgSrc: img3 },
        { name: "Add routes to topo", description: mockDescription, imgSrc: img4 },
    ]

    return (
        <div className="Roles">
            <img src={imgSrc} alt="" className="bgImage"></img>
            <div className="contentWrapper">
                <h2 className="title">Get to know all the possibilities of our service</h2>
                <div className="cardsWrapper">
                    {
                        roles.map(role => (
                            <PolaroidCard {...role} key={role.name} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Roles;