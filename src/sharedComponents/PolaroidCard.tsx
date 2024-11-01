import React, { useState } from "react";
import "../styles/PolaroidCard.scss";
import { useSpring, a } from '@react-spring/web';
import { isDesktopLg } from "../consts/index.ts";
import turnaround from "../assets/icons/turnaround.svg";

interface Props {
    description: string;
    animate?: boolean;
    index?: number;
    name: string;
    imgSrc: any;
}

const PolaroidCard: React.FC<Props> = ({
    imgSrc, name, description, animate, index
}): JSX.Element => {
    const [flipped, setFlipped] = useState<boolean>(false);

    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(200px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 6, tension: 500, friction: 80 },
    });

    const frontStyle = { opacity: opacity.to(o => 1 - o), transform };
    const animationData = `reveal_${(index || 0) + 1}${isDesktopLg() ? "_lg" : ""} 1s forwards`;

    console.log(isDesktopLg())

    return (
        <div
            style={{ animation: animate ? animationData : "" }}
            onClick={() => setFlipped(!flipped)}
            className="PolaroidCard"
        >
            <a.div
                style={frontStyle}
                className="front"
            >
                <img src={imgSrc} alt="" className="image" />
                <p className="name">
                    {name}
                </p>
            </a.div>
            <a.div
                style={{
                    opacity,
                    transform,
                    rotateY: '-180deg',
                }}
                className="back"
            >
                <p className="backName">
                    {name}
                </p>
                <p className="description">{description}</p>
            </a.div>

            <img
                style={{ transform: `rotate(${flipped ? "180deg" : "-180deg"})` }}
                onClick={() => setFlipped(!flipped)}
                className="clickIcon"
                src={turnaround}
                alt="click"
            />
        </div >
    )
}

export default PolaroidCard;