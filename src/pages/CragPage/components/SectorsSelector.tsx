import React from "react";
import { ISector } from "../../../interfaces";
import "../../../styles/SectorsSelector.scss";

interface Props {
    setSelectedSector: React.Dispatch<React.SetStateAction<ISector | undefined>>
    selectedSectorId: string;
    sectors: ISector[],
}

const SectorsSelector: React.FC<Props> = ({ sectors, setSelectedSector, selectedSectorId }): JSX.Element => {
    return (
        <div className="SectorsSelector">
            {sectors.map(sector => (
                <div
                    className={`sectorButton ${selectedSectorId === sector._id ? "selected" : ""}`}
                    onClick={() => setSelectedSector(sector)}
                    key={sector._id}
                >
                    <img src={sector.image} alt="sector" className="buttonImage" />
                    <div className="name">{sector.name}</div>
                </div>
            ))}
        </div>
    )
};

export default SectorsSelector;