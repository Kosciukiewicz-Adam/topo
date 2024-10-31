import React from "react";
import "../../../styles/SectorsGallery.scss";
import { IRoute, ISector } from "../../../interfaces";

interface Props {
    setSelectedSector: (sector: ISector) => void;
    getSectorRoutes: (id: string) => IRoute[];
    sectors: ISector[];
}

const SectorsGallery: React.FC<Props> = ({
    setSelectedSector,
    getSectorRoutes,
    sectors,
}): JSX.Element => {
    return (
        <div className="SectorsGallery">
            <h2 className="sectionHeading">Sectors</h2>
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
                            <div className="info">
                                {`${getSectorRoutes(sector._id).length} routes`}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SectorsGallery;