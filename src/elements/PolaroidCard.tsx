import React, { useState } from "react";
import { useSpring, a } from '@react-spring/web';
import "../styles/PolaroidCard.scss";

interface Props {
    name: string;
    description: string;
    imgSrc: any;
}

const PolaroidCard: React.FC<Props> = ({ imgSrc, name, description }) => {
    const [flipped, set] = useState<boolean>(false);

    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(200px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    return (
        <div onClick={() => set(state => !state)} className="PolaroidCard">
            <a.div
                style={{ opacity: opacity.to(o => 1 - o), transform }}
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
                <p>{description}</p>
            </a.div>
        </div>
    )
}

export default PolaroidCard;