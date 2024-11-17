import React, { useEffect, useRef, useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useBrakepoints } from "../../utils"
import ServiceStats from "./components/ServiceStats";
import CragPreview from "./components/CragPreview";
import Festivals from "./components/Festivals";
import Roles from "./components/Roles";
import {
    ParallaxDivider,
    Footer,
    Menu,
} from "../../sharedComponents";
import "../../styles/Homepage.scss"
import { homePageMainBg, homePageMainBgMobile, logo } from "../../assets";

const Homepage: React.FC = (): JSX.Element => {
    const [scrollTop, setScrollTop] = useState<number>(0);
    const parallaxRef = useRef<any>(null);
    const { isMobile } = useBrakepoints();
    const mainBackgorund = isMobile ? homePageMainBgMobile : homePageMainBg;

    useEffect(() => {
        if (parallaxRef?.current?.container) {
            parallaxRef?.current?.container.current.addEventListener('scroll', () => {
                setScrollTop(parallaxRef?.current?.container.current.scrollTop);
            })
        }
    });

    return (
        <div className="Homepage">
            <Menu scrollTop={scrollTop} homepage={true} />
            <Parallax pages={3.2} ref={parallaxRef}>
                <ParallaxLayer speed={0}>
                    <img src={mainBackgorund} alt='main background' className="mainBackgorund" />
                    <Roles scrollTop={scrollTop} />
                    <Festivals />
                    <Footer />
                </ParallaxLayer>
                <ParallaxLayer speed={0.9}>
                    <div className="header">
                        <div className="headerText">
                            <img src={logo} alt='logo' className="logo" />
                            <h2 className="titleText">Biggest free rock climbing guidebook</h2>
                        </div>
                    </div>
                    {isMobile ? <ServiceStats scrollTop={scrollTop} /> : <CragPreview scrollTop={scrollTop} />}
                    <ParallaxDivider height="115vh" mobileHeight="100vh" />
                    {isMobile ? <CragPreview scrollTop={scrollTop} /> : <ServiceStats scrollTop={scrollTop} />}
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}

export default Homepage;