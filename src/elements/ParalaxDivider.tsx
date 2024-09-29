import React from "react";
import "../styles/ParallaxDivider.scss";

interface Props {
    height: string;
}

const ParallaxDivider: React.FC<Props> = ({ height }) => {
    return (
        <div className="ParallaxDivider" style={{ marginTop: height }}></div>
    )
}

export default ParallaxDivider;