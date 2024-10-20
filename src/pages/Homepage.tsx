import React, { useEffect, useRef, useState } from "react";
import mainBackgroundDesktop from "../assets/bg5.jpg";
import mainBackgroundMobile from "../assets/bg.avif";
import logo from "../assets/logo.png";
import "../styles/Homepage.scss"
import CragPreview from "../components/CragPreview.tsx";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Roles from "../components/Roles.tsx";
import Footer from "../components/Footer.tsx";
import ParallaxDivider from "../elements/ParalaxDivider.tsx";
import Menu from "../components/Menu.tsx";
import ServiceStats from "../components/ServiceStats.tsx";
import { isMobile } from "../consts/isMobile.ts";
import imgSrc from "../assets/tommy_caldwell.avif";
import imgSrcMobile from "../assets/tommy.avif";

const Homepage: React.FC = () => {
    const parallaxRef = useRef<any>(null);
    const [scrollTop, setScrollTop] = useState<number>(0);

    const mainBackgorund = isMobile() ? mainBackgroundMobile : mainBackgroundDesktop;

    useEffect(() => {
        if (parallaxRef?.current?.container) {
            parallaxRef?.current?.container.current.addEventListener('scroll', () => {
                setScrollTop(parallaxRef?.current?.container.current.scrollTop)
            })
        }
    })

    return (
        <div className="Homepage">
            <Menu />
            <Parallax pages={isMobile() ? 3.2 : 3} ref={parallaxRef}>
                <ParallaxLayer speed={0.1}>
                    <img src={mainBackgorund} alt='main background' className="mainBackgorund" />
                    <Roles />
                    <div className="placeholder">
                        <img src={isMobile() ? imgSrcMobile : imgSrc} alt="" />
                    </div>
                    <Footer />
                </ParallaxLayer>
                <ParallaxLayer speed={0.8}>
                    <div className="content">
                        <div className="header">
                            <div className="headerText">
                                <img src={logo} alt='logo' className="logo" />
                                <h2>Biggest free rock climbing guidebook</h2>
                            </div>
                        </div>
                    </div>
                    <CragPreview />
                    <ParallaxDivider height="900px" mobileHeight="700px" />
                    <ServiceStats scrollTop={scrollTop} />
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}

export default Homepage;