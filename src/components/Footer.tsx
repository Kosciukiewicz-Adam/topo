import React from "react";
import "../styles/Footer.scss";

import instagram from "../assets/icons/instagram.svg";
import youtube from "../assets/icons/youtube.svg";
import facebook from "../assets/icons/facebook.svg";
import github from "../assets/icons/github.svg";

const Footer: React.FC = () => {
    return (
        <div className="Footer">
            <div className="buttonsWrapper">
                <img className="button" src={github} alt="icon" />
                <img className="button" src={instagram} alt="icon" />
                <img className="button" src={facebook} alt="icon" />
                <img className="button" src={youtube} alt="icon" />
            </div>
            <div className="credits">
                <div className="left">
                    Coppywright ©2024
                </div>
                <div className="right">
                    Designed & created by Adam Kościukiewicz
                </div>
            </div>
        </div>
    )
}

export default Footer;