import React, { useEffect, useState } from "react";
import "../styles/Map.scss";
import imgSrc from "../assets/region_mock.jpg";
import AnimatedChart from "../elements/AnimatedChart.tsx";
import { useQuery } from "react-query";
import MapChart from "../elements/MapChart.tsx";

interface ICrag {
    name: string,
    coordinates: Array<number>,
    images: Array<string>,
    description: string,
}

const Map: React.FC = () => {
    const [selectedCrag, setSelectedCrag] = useState<ICrag>();

    const fetchAreas = async () => {
        const res = await fetch("http://localhost:4000/crags");
        return res.json();
    }

    const { status, data } = useQuery('areas', fetchAreas);

    useEffect(() => {
        if (status === "success") {
            setSelectedCrag(data[0] as ICrag)
        }
    }, [data, status])

    return (
        <div className="Map">
            <h2 className="sectionTitle">Discover climbing in every region of any country</h2>
            <div className="regionSelection">
                <div className="regionDetails">
                    {selectedCrag ? (
                        <>
                            <div className="gallery">
                                {<h2 className="regionHeader">{selectedCrag.name}</h2>}
                                <div className="regionDesctiption">
                                    {selectedCrag.description}
                                </div>
                                <AnimatedChart maxPerCategory={6} />
                                <div className="images">
                                    {selectedCrag.images.map(imgSrc =>
                                        <div className="regionImage">
                                            <img src={imgSrc} alt="region image" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="button">
                                learn more details anout region
                            </div></>
                    ) : <>Select region from map</>}
                </div>
                <div className="regionMapWrapper">
                    <MapChart />
                </div>
            </div>
        </div >
    )
}

export default Map;