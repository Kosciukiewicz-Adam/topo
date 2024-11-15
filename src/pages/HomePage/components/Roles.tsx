import React, { useState } from "react";
import { isMobile } from "../../../utils"
import { PolaroidCard } from "../../../sharedComponents";
import "../../../styles/Roles.scss";
import {
    climbingPartner,
    rolesBgMobile,
    guidebook,
    creating,
    rolesBg,
    arrow,
    topo,
} from "../../../assets"

interface Role {
    description: string;
    name: string;
    imgSrc: any;
}

enum SlideChangeDir {
    PREV = "prev",
    NEXT = "next",
}

const Roles: React.FC<{ scrollTop: number }> = ({ scrollTop }): JSX.Element => {
    const [carouselSlide, setCarouselSlide] = useState<number>(0);
    const backgroundImage = isMobile() ? rolesBgMobile : rolesBg;

    const roles: Role[] = [
        {
            name: "Find climbing partners",
            description: "Find people to climb with anywhere around the wourld using our social media features",
            imgSrc: climbingPartner
        },
        {
            name: "Check topo",
            description: "Get access to thousends of routes, sectors and crags. You can also get many insidefull information about your projects, learn route hostory or learn new beta",
            imgSrc: creating
        },
        {
            name: "Log ascends",
            description: "Log ascends of each route you were able to send, check ascends of other climbers.",
            imgSrc: guidebook
        },
        {
            name: "Build our community",
            description: "Add routes bolted or discovered by you and share them with the rest of the climbing wourld",
            imgSrc: topo
        },
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
                roles.slice(0, 4).map((role, index) => (
                    <PolaroidCard {...role} key={role.name} index={index} scrollTop={scrollTop} />
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
                <h2 className="title">More than just a topo service</h2>
                {isMobile() ? getMobileContent() : getDesktopContent()}
            </div>
        </div>
    )
}

export default Roles;