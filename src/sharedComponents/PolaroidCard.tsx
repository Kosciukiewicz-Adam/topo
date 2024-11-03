import React, { useEffect, useState } from "react";
import "../styles/PolaroidCard.scss";
import { useSpring, a } from '@react-spring/web';
import { isDesktopLg } from "../consts/index.ts";
import turnaround from "../assets/icons/turnaround.svg";

interface Props {
    description: string;
    scrollTop: number;
    index?: number;
    name: string;
    imgSrc: any;
}

const PolaroidCard: React.FC<Props> = ({
    imgSrc, name, description, scrollTop, index
}): JSX.Element => {
    const [cardsState, setCardsState] = useState<"stack" | "unfolded">("stack");
    const [flipped, setFlipped] = useState<boolean>(false);
    const [animation, setAnimation] = useState<any>()

    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(200px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 6, tension: 500, friction: 80 },
    });

    const frontStyle = { opacity: opacity.to(o => 1 - o), transform };
    const animationName = `reveal_${(index || 0) + 1}${isDesktopLg() ? "_lg" : ""}`;

    const inlineStyles: any = {
        animation: `${animationName} 1s forwards`,

    };


    useEffect(() => {
        if (scrollTop === undefined) {
            return;
        }

        setAnimation({});

        if (scrollTop < 800) {
            // setAnimation({ ...inlineStyles, animationDirection: "reverse" });
            // setCardsState("stack");
        } else if (scrollTop > 800) {
            setAnimation({ ...inlineStyles, animationDirection: "normal" });
            setCardsState("unfolded");
        }

    }, [scrollTop, cardsState]);

    let componentClassName = `PolaroidCard ${cardsState}`;

    return (
        <div
            onClick={() => setFlipped(!flipped)}
            className={componentClassName}
            style={animation}
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