import React, { useState } from "react";
import "../styles/Map.scss";
import Poland from "@react-map/poland";
import imgSrc from "../assets/region_mock.jpg";

const Map: React.FC = () => {
    const [selectedRegion, setSelectedRegion] = useState<string>("");

    return (
        <div className="Map">
            <h2 className="sectionTitle">Discover climbing in every region of any country</h2>
            <div className="regionSelection">
                <div className="regionDetails">
                    <div className="gallery">
                        {selectedRegion && <h2 className="regionHeader">{selectedRegion}</h2>}
                        <div className="regionDesctiption">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                        <div className="images">
                            <div className="regionImage">
                                <img src={imgSrc} alt="region image" />
                            </div>
                            <div className="regionImage">
                                <img src={imgSrc} alt="region image" />
                            </div>
                            <div className="regionImage">
                                <img src={imgSrc} alt="region image" />
                            </div>
                        </div>
                    </div>
                    <div className="button">
                        learn more details anout region
                    </div>
                </div>
                <div className="regionMapWrapper">
                    <Poland type={"select-single"} size={1000} onSelect={(region) => setSelectedRegion(region)} />
                </div>
            </div>
        </div >
    )
}

export default Map;