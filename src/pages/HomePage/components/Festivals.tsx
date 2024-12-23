import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router"
import { fetchFestivals } from "../../../api"
import { arrowRight } from "../.././../assets";
import { useBrakepoints } from "../../../utils"
import { QueryStatus } from "../../../consts";
import { DataComponentWrapper } from "../../../sharedComponents";
import "../../../styles/Festivals.scss";

const Festivals: React.FC = (): JSX.Element => {
    const { status, data } = useQuery('festivals', fetchFestivals);
    const { isMobile } = useBrakepoints();
    const navigate = useNavigate();

    return (
        <DataComponentWrapper queryStatus={status as QueryStatus}>
            <div className="Festivals">
                <h2 className="sectionHeader">Discover anual climbing festivals</h2>
                <div className="contentWrapper">
                    {(isMobile ? data?.slice(0, 1) : data)?.map(festival => (
                        <div className="festivalCard" key={festival.name}>
                            <img src={festival.images[0]} alt="" className="baner" />
                            <div className="content">
                                <div className="festivalName">
                                    {festival.name}
                                </div>
                                <div className="date">{festival.date}</div>
                                <div className="description">{festival.description}</div>
                            </div>

                            <div className="tearoff">
                                <div className="location" onClick={() => navigate(`/crag/${festival.cragId}`)}>
                                    {festival.location} <img src={arrowRight} alt="" className="icon" />
                                </div>
                                <div className="website" onClick={() => window.open(festival.website, "_blank")}>{festival.website}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DataComponentWrapper>
    )
}


export default Festivals;