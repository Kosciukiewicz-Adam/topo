import React from "react";
import "../../../styles/SectorsGallery.scss";
import { ISector } from "../../../interfaces";

interface Props {
    setSelectedSector: (sector: ISector) => void;
    sectors: ISector[];
}

const SectorsGallery: React.FC<Props> = ({
    setSelectedSector,
    sectors,
}): JSX.Element => {
    return (
        <div className="SectorsGallery">
            <h2 className="sectionHeader">Sectors</h2>
            <div className="labelsWrapper">
                {sectors.map((sector) => (
                    <div
                        onClick={() => setSelectedSector(sector)}
                        className="label"
                        key={sector.name}
                    >
                        <img src={sector.image} alt={sector.name} />
                        <div className="content">
                            <div className="name">
                                {sector.name}
                            </div>
                            {sector?.routesAmount && (
                                <div className="info">
                                    {`${sector.routesAmount} routes`}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SectorsGallery;