import React from "react";
import mainBackground from "../assets/bg5.jpg";
import logo from "../assets/logo.png";
import "../styles/Homepage.scss"
import Map from "../components/Map.tsx";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Roles from "../components/Roles.tsx";

const Homepage: React.FC = () => {
    return (
        <div className="Homepage">
            <Parallax pages={2}>
                <ParallaxLayer>
                    <img src={mainBackground} alt='main background' className="mainBackgorund" />
                    <Roles></Roles>
                </ParallaxLayer>
                <ParallaxLayer speed={1.1}>
                    <div className="content">
                        <div className="header">
                            <div className="headerText">
                                <img src={logo} alt='logo' className="logo" />
                                <h2>Biggest free rock climbing guidebook</h2>
                            </div>
                        </div>
                        <Map></Map>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}

export default Homepage;