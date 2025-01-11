import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router"
import { fetchFestivals } from "../../../api"
import { useBrakepoints } from "../../../utils"
import { QueryStatus } from "../../../consts";
import { DataComponentWrapper } from "../../../sharedComponents";
import "../../../styles/Festivals.scss";

const Festivals: React.FC = (): JSX.Element => {
    const { status, data } = useQuery('festivals', fetchFestivals);
    const { isMobile } = useBrakepoints();
    const navigate = useNavigate();

    const handleCragClick = (cragId: string) => {
        if (!cragId) return
        navigate(`/crag/${cragId}`)
    }

    return (
        <DataComponentWrapper queryStatus={status as QueryStatus}>
            <div className="Festivals">
                <h2 className="sectionHeader">Discover anual climbing festivals</h2>
                <div className="contentWrapper">
                    {(isMobile ? data?.slice(0, 1) : data)?.map(festival => (
                        <div className="festivalCard" key={festival.name}>
                            <img src={festival.images[0]} alt="" className="image" />
                            <div className="festivalName">
                                {festival.name}
                            </div>
                            <div className="labelsWrapper">
                                <div className="label">
                                    {festival.date}
                                </div>
                                <div className={`label ${festival.cragId ? "clickable" : ""}`} onClick={() => handleCragClick(festival.cragId)}>
                                    {festival.location}
                                </div>
                                <div className="label clickable" onClick={() => window.open(festival.website, "_blank")}>
                                    website
                                </div>
                            </div>
                            <div className="description">{festival.description}</div>

                        </div>
                    ))}
                </div>
            </div>
        </DataComponentWrapper>
    )
}


export default Festivals;