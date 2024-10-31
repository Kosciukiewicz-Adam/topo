import React, { useState } from "react";
import "../../../styles/Roles.scss";
import { isMobile } from "../../../consts/index.ts";
import PolaroidCard from "../../../sharedComponents/PolaroidCard.tsx";

import backgroundMobile from "../../../assets/rolesBg.jpg";
import backgroundDesktop from "../../../assets/larambla.jpg";
import img1 from "../../../assets/climbingPartner.jpg";
import arrow from "../../../assets/icons/arrow.svg";
import img2 from "../../../assets/creating.webp";
import img3 from "../../../assets/guidebook.jpg";
import img4 from "../../../assets/topo.jpg";

interface Role {
    name: string;
    description: string;
    imgSrc: any;
}

enum SlideChangeDir {
    PREV = " prev",
    NEXT = "next",
}

const Roles: React.FC = (): JSX.Element => {
    const [carouselSlide, setCarouselSlide] = useState<number>(0);
    const backgroundImage = isMobile() ? backgroundMobile : backgroundDesktop;

    const mockDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

    const roles: Role[] = [
        { name: "Find climbing partners", description: mockDescription, imgSrc: img1 },
        { name: "Check topo", description: mockDescription, imgSrc: img2 },
        { name: "Log ascends", description: mockDescription, imgSrc: img3 },
        { name: "Add routes to topo", description: mockDescription, imgSrc: img4 },
    ];

    const changeSlide = (dir: SlideChangeDir) => {
        const valueToAdd = dir === SlideChangeDir.NEXT ? 1 : -1;

        if (carouselSlide + valueToAdd > roles.length - 1) {
            setCarouselSlide(0);
            return;
        } else if (carouselSlide + valueToAdd < 0) {
            setCarouselSlide(roles.length - 1);
            return;
        }

        setCarouselSlide(prev => prev + valueToAdd)
    }

    const getDesktopContent = (): JSX.Element => (
        <div className="cardsWrapper">
            {
                roles.map(role => (
                    <PolaroidCard {...role} key={role.name} />
                ))
            }
        </div>
    )
    const getMobileContent = (): JSX.Element => (
        <div className="carousel">
            <img
                onClick={() => changeSlide(SlideChangeDir.PREV)}
                className="controllButton"
                src={arrow}
                alt=""
            />
            <PolaroidCard {...roles[carouselSlide]} />
            <img
                onClick={() => changeSlide(SlideChangeDir.NEXT)}
                className="controllButton"
                src={arrow}
                alt=""
            />
        </div>
    )

    return (
        <div className="Roles">
            <img src={backgroundImage} alt="" className="bgImage" />
            <div className="contentWrapper">
                <h2 className="title">Get to know all the possibilities of our service</h2>
                {isMobile() ? getMobileContent() : getDesktopContent()}
            </div>
        </div>
    )
}

export default Roles;