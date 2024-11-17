import React from "react";
import { useBrakepoints } from "../utils"
import "../styles/ParallaxDivider.scss";

interface Props {
    height: string;
    mobileHeight: string;
}

const ParallaxDivider: React.FC<Props> = ({ height, mobileHeight }): JSX.Element => {
    const { isMobile } = useBrakepoints();
    const marginTop = isMobile ? mobileHeight : height;

    return (
        <div className="ParallaxDivider" style={{ marginTop }}></div>
    )
}

export default ParallaxDivider;