import React from "react";
import "../styles/ParallaxDivider.scss";
import { isMobile } from "../utils/brakePoints.ts"

interface Props {
    height: string;
    mobileHeight: string;
}

const ParallaxDivider: React.FC<Props> = ({ height, mobileHeight }): JSX.Element => {

    const marginTop = isMobile() ? mobileHeight : height;

    return (
        <div className="ParallaxDivider" style={{ marginTop }}></div>
    )
}

export default ParallaxDivider;