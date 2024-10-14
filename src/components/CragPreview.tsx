import React, { useState } from "react";
import { Link } from "react-router-dom"
import "../styles/CragPreview.scss";
import { useQuery } from "react-query";
import Map from "../elements/Map.tsx";
import { ICrag } from "../interfaces/index.ts";
import { fetchCrags } from "../api/crag.ts";
import { QueryStatus } from "../consts/QueryStatus.ts";
import DataComponentWrapper from "../elements/DataComponentWrapper.tsx";

const CragPreview: React.FC = () => {
    const [selectedCrag, setSelectedCrag] = useState<ICrag>();
    const { status, data } = useQuery('crags', fetchCrags);

    if (!selectedCrag && data) {
        setSelectedCrag(data[0])
    }

    const selectedCragById = (cragId) => {
        const cragToSelect = data?.find(crag => crag._id === cragId);

        if (cragToSelect) {
            setSelectedCrag(cragToSelect);
        }
    }

    return (
        <DataComponentWrapper queryStatus={status as QueryStatus}>
            <div className="CragPreview">
                <h2 className="sectionHeading">Discover climbing everywhere around the world</h2>
                <div className="sectionContent">

                    <div className="cragDetails">
                        <h2 className="cragHeader">{`${selectedCrag?.name} | ${selectedCrag?.country}`}</h2>

                        <div className="desctiption">
                            {selectedCrag?.description}
                        </div>

                        <div className="imagesWrapper">
                            {selectedCrag?.images.slice(0, 3).map(imgSrc =>
                                <div className="cragImage" key={imgSrc}>
                                    <img src={imgSrc} alt="alt" />
                                </div>
                            )}
                        </div>


                        <Link className="button" to={`/crag/${selectedCrag?._id}`}>
                            see the region
                        </Link>
                    </div>
                    <div className="cragMapWrapper">
                        <Map
                            markers={data?.map(({ name, coordinates, _id }) => ({ markerOffset: -20, name, coordinates, _id }))}
                            handleClick={(value) => selectedCragById(value)}
                            forcedCenter={[10, 40]}
                            background="#F7770F"
                            toutchable={true}
                            scale={800}
                        />
                    </div>
                </div>
            </div >
        </DataComponentWrapper>
    )
}

export default CragPreview;