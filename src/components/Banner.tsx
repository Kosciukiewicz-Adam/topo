import React from "react";
import bg1 from "../assets/bg1.jpg";
import "../styles/Banner.scss"

const Banner: React.FC = () => {
    return (
        <div className="Banner">
            <div className="header">
                <h1>TOPO</h1>
                <h2>Biggest free rock climbing guidebook</h2>
            </div>
            <img src={bg1} alt='main background' />
        </div>
    )
}

export default Banner;