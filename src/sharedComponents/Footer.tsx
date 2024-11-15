import React from "react";
import "../styles/Footer.scss";
import {instagram, facebook, youtube, github} from "../assets"

const Footer: React.FC = (): JSX.Element => {
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