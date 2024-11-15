import React, { useEffect, useState } from "react";
import { useSpring, a } from '@react-spring/web';
import {turnaround} from "../assets";
import "../styles/PolaroidCard.scss";

interface Props {
    description: string;
    scrollTop?: number;
    index?: number;
    name: string;
    imgSrc: any;
}

const PolaroidCard: React.FC<Props> = ({
    imgSrc, name, description, scrollTop, index
}): JSX.Element => {
    const [cardsState, setCardsState] = useState<"stack" | "unfolded">("stack");
    const [flipped, setFlipped] = useState<boolean>(false);

    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(200px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 6, tension: 500, friction: 80 },
    });

    const frontStyle = { opacity: opacity.to(o => 1 - o), transform };

    useEffect(() => {
        if (scrollTop === undefined) {
            return;
        }

        if (scrollTop < 800) {
            setCardsState("stack");
        } else if (scrollTop > 800) {
            setCardsState("unfolded");
        }

    }, [scrollTop, cardsState]);

    let componentClassName = `PolaroidCard ${cardsState}`;

    return (
        <div
            onClick={() => setFlipped(!flipped)}
            className={componentClassName}
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