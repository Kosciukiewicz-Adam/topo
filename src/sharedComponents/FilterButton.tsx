import React, { useState } from "react"
import "../styles/FilterButton.scss"

interface Props {
    changeButtonState: () => void;
    buttonLabels: string[];
    iconsSrc: string[];
    width: number;
}

const FilterButton: React.FC<Props> = ({ buttonLabels, iconsSrc, changeButtonState, width }): JSX.Element => {
    const [buttonLevel, setButtonLevel] = useState<"firstOn" | "secondOn">("firstOn");

    const handleButtonClick = () => {
        changeButtonState();
        setButtonLevel(prev => prev === "firstOn" ? "secondOn" : "firstOn");
    }

    return (
        <div
            className={`FilterButton ${buttonLevel}`}
            style={{ width: `${width}px` }}
            onClick={handleButtonClick}
        >
            <div className="level first">
                <img src={iconsSrc[0]} alt="" className="icon" />
                <div className="label">{buttonLabels[0]}</div>
            </div>
            <div className="level second">
                <img src={iconsSrc[1]} alt="" className="icon" />
                <div className="label">{buttonLabels[1]}</div>
            </div>
        </div>
    )
}

export default FilterButton;