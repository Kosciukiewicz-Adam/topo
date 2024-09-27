import React from "react";
import mainBackground from "../assets/bg5.jpg";
import logo from "../assets/logo.png";
import "../styles/Banner.scss"
import Map from "./Map.tsx";
import { Parallax } from "react-scroll-parallax";

const Banner: React.FC = () => {
    return (
        <div className="Banner">
            <Parallax speed={-30}>
                <img src={mainBackground} alt='main background' className="mainBackgorund" />
            </Parallax>
            <Parallax speed={30}>
                <div className="content">
                    <div className="header">
                        <div className="headerText">
                            <img src={logo} alt='logo' className="logo" />
                            <h2>Biggest free rock climbing guidebook</h2>
                        </div>
                    </div>
                    <Map></Map>
                </div>
            </Parallax>
        </div>
    )
}

export default Banner;