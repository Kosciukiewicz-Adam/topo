import React, { useEffect, useRef, useState } from "react";
import "../../styles/Homepage.scss"
import { isMobile } from "../../consts/index.ts";
import CragPreview from "./components/CragPreview.tsx";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import ParallaxDivider from "../../sharedComponents/ParalaxDivider.tsx";
import ServiceStats from "./components/ServiceStats.tsx";
import Footer from "../../sharedComponents/Footer.tsx";
import Menu from "../../sharedComponents/Menu.tsx";
import Roles from "./components/Roles.tsx";

import mainBackgroundDesktop from "../../assets/bg5.jpg";
import mainBackgroundMobile from "../../assets/bg.avif";
import imgSrc from "../../assets/tommy_caldwell.avif";
import imgSrcMobile from "../../assets/tommy.avif";
import logo from "../../assets/logo.png";

const Homepage: React.FC = (): JSX.Element => {
    const parallaxRef = useRef<any>(null);
    const [scrollTop, setScrollTop] = useState<number>(0);

    const mainBackgorund = isMobile() ? mainBackgroundMobile : mainBackgroundDesktop;

    useEffect(() => {
        if (parallaxRef?.current?.container) {
            parallaxRef?.current?.container.current.addEventListener('scroll', () => {
                setScrollTop(parallaxRef?.current?.container.current.scrollTop)
            })
        }
    });

    return (
        <div className="Homepage">
            <Menu />
            <Parallax pages={3} ref={parallaxRef}>
                <ParallaxLayer speed={0}>
                    <img src={mainBackgorund} alt='main background' className="mainBackgorund" />
                    <Roles scrollTop={scrollTop} />
                    <div className="placeholder">
                        <img src={isMobile() ? imgSrcMobile : imgSrc} alt="" />
                    </div>
                    <Footer />
                </ParallaxLayer>
                <ParallaxLayer speed={0.8}>
                    <div className="header">
                        <div className="headerText">
                            <img src={logo} alt='logo' className="logo" />
                            <h2>Biggest free rock climbing guidebook</h2>
                        </div>
                    </div>
                    {isMobile() ? <ServiceStats scrollTop={scrollTop} /> : <CragPreview scrollTop={scrollTop} />}
                    <ParallaxDivider height="900px" mobileHeight="600px" />
                    {isMobile() ? <CragPreview scrollTop={scrollTop} /> : <ServiceStats scrollTop={scrollTop} />}
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}

export default Homepage;