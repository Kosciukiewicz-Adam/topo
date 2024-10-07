import React, { useState } from "react";
import { Link } from "react-router-dom"
import "../styles/CragPreview.scss";
import { useQuery } from "react-query";
import Map from "../elements/Map.tsx";
import { ICrag } from "../interfaces/index.ts";
import { fetchCrags } from "../api/crag.ts";
import { QueryStatus } from "../consts/QueryStatus.ts";
import CragRoutesChart from "./CragRoutesChart.tsx"
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
                <h2 className="sectionTitle">Discover climbing in every region of any country</h2>
                <div className="sectionContent">
                    <div className="cragDetails">
                        <div className="wrapper">
                            {<h2 className="cragHeader">{selectedCrag?.name}</h2>}
                            <div className="desctiption">
                                {selectedCrag?.description}
                            </div>
                            {selectedCrag &&
                                <CragRoutesChart
                                    selectedCragId={selectedCrag._id}
                                    maxRoutesPerChartCategory={6}
                                />
                            }
                            <div className="images">
                                {selectedCrag?.images.map(imgSrc =>
                                    <div className="cragImage" key={imgSrc}>
                                        <img src={imgSrc} alt="alt" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <Link className="button" to={`/crag/${selectedCrag?._id}`}>
                            learn more details anout region
                        </Link>
                    </div>
                    <div className="cragMapWrapper">
                        <Map
                            markers={data?.map(({ name, coordinates, _id }) => ({ markerOffset: 0, name, coordinates, _id }))}
                            handleClick={(value) => selectedCragById(value)}
                        />
                    </div>
                </div>
            </div >
        </DataComponentWrapper>
    )
}

export default CragPreview;