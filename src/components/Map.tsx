import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "../styles/Map.scss";
import AnimatedChart from "../elements/AnimatedChart.tsx";
import { useQuery } from "react-query";
import MapChart from "../elements/MapChart.tsx";
import { ICrag } from "../interfaces/Crag.ts";
import { fetchCrags } from "../api/crag.ts";



const Map: React.FC = () => {
    const [selectedCrag, setSelectedCrag] = useState<ICrag>();
    const { status, data } = useQuery('crags', fetchCrags);

    useEffect(() => {
        if (status === "success") {
            setSelectedCrag(data[0] as ICrag)
        }
    }, [data, status]);

    const selectedCragById = (cragId) => {
        const cragToSelect = data.find(crag => crag._id === cragId);

        if (cragToSelect) {
            setSelectedCrag(cragToSelect);
        }
    }

    if (!data) {
        return null
    }

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
                            <Link className="button" to={`/crag/${selectedCrag._id}`}>
                                learn more details anout region
                            </Link>
                        </>
                    ) : <>Select region from map</>}
                </div>
                <div className="regionMapWrapper">
                    <MapChart
                        markers={data?.map(({ name, coordinates, _id }) => ({ markerOffset: 0, name, coordinates, _id }))}
                        handleClick={(value) => selectedCragById(value)}
                    />
                </div>
            </div>
        </div >
    )
}

export default Map;