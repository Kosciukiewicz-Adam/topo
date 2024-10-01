import React from "react";
import mainBackground from "../assets/bg5.jpg";
import logo from "../assets/logo.png";
import "../styles/Homepage.scss"
import CragPreview from "../components/CragPreview.tsx";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Roles from "../components/Roles.tsx";
import Footer from "../components/Footer.tsx";
import ParallaxDivider from "../elements/ParalaxDivider.tsx";

const Homepage: React.FC = () => {
    return (
        <div className="Homepage">
            <Parallax pages={3}>
                <ParallaxLayer>
                    <img src={mainBackground} alt='main background' className="mainBackgorund" />
                    <Roles />
                </ParallaxLayer>
                <ParallaxLayer speed={1.1}>
                    <div className="content">
                        <div className="header">
                            <div className="headerText">
                                <img src={logo} alt='logo' className="logo" />
                                <h2>Biggest free rock climbing guidebook</h2>
                            </div>
                        </div>
                    </div>
                    <CragPreview />
                    <ParallaxDivider height="1500px" />
                    <div className="test" style={{ width: "100%", height: "800px", background: "white " }}></div>
                    <Footer />
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}

export default Homepage;