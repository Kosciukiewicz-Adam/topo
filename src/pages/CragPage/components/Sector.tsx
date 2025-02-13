import React, { useState } from "react";
import { useQuery } from "react-query";
import { getGradeDifficulty, getSectorDifficultyLevel } from "../../../utils";
import { GradeScale, QueryStatus, gradeRanges } from "../../../consts";
import { fetchSectorRoutes } from "../../../api";
import { ISector } from "../../../interfaces";
import { DataComponentWrapper, Chart } from "../../../sharedComponents"
import "../../../styles/Sector.scss";

type Props = {
    sectorsSelector: JSX.Element;
    scrollTop: number;
} & ISector;

const Sector: React.FC<Props> = ({
    imageWithRoutes,
    sectorsSelector,
    scrollTop,
    name,
    _id,
}): JSX.Element => {
    const [showLegend, setShowLegend] = useState<boolean>(true);
    const { data, status } = useQuery(['sectorRoutes', _id], () => fetchSectorRoutes(_id));
    const sectorDifficultyLevel = getSectorDifficultyLevel(data || []);

    return (
        <DataComponentWrapper queryStatus={status as QueryStatus}>
            <div className="Sector">
                <div className="changeSector">
                    {sectorsSelector}
                </div>
                <div className="main">
                    <h2 className="sectionHeader">{name}</h2>
                    <img className="sectorImage" src={imageWithRoutes} alt="sector routes" />

                    <div className="information">
                        <div className="chartWrapper">
                            <div className="label">Grades distribution in sector</div>
                            <Chart
                                startAnimation={scrollTop > 2300}
                                gradeScale={GradeScale.FRENCH}
                                allRoutes={data || []}
                            />
                        </div>
                        <div className="legend" onClick={() => setShowLegend(prev => !prev)}>
                            <div className="label">Meaning of collors of grades</div>
                            {showLegend && (gradeRanges?.map(range => (
                                <div className="row" key={range.level}>
                                    <div className="level">{range.level}</div>
                                    <div className={`range ${range.level.toLocaleLowerCase()}`}>{range.grades}</div>
                                </div>
                            )))}
                        </div>
                        <div className="characteristics">
                            <div className="label">Sector informations</div>
                            <div className="row">
                                <div className="stat">General difficulty level:</div>
                                <div className={`${sectorDifficultyLevel} range`}>{sectorDifficultyLevel}</div>
                            </div>
                            <div className="row">
                                <div className="stat">Amount of routes: </div>
                                <div className="">{data?.length}</div>
                            </div>
                        </div>
                    </div>

                    <div className="tableWrapper">
                        <table className="routesTable">
                            <tbody>
                                <tr className="titleRow">
                                    <th>nr.</th>
                                    <th>Route name</th>
                                    <th>Grade</th>
                                    <th>Length</th>
                                    <th>Author</th>
                                </tr>
                                {data?.map((route, index) => (
                                    <tr key={route?.name}>
                                        <td>{index + 1}</td>
                                        <td>{route?.name}</td>
                                        <td>
                                            <div
                                                className={`grade ${getGradeDifficulty(route?.grade)}`}
                                            >{route?.grade}</div>
                                        </td>
                                        <td>{route?.length}</td>
                                        <td>{route?.author}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DataComponentWrapper>
    )
}

export default Sector;