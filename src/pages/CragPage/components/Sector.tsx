import React, { useState } from "react";
import "../../../styles/Sector.scss";
import { ISector, IRoute } from "../../../interfaces";
import { GradeScale } from "../../../consts/index.ts";
import Chart from "../../../sharedComponents/Chart.tsx";
import { getGradeDifficulty, getSectorDifficultyLevel } from "../../../utils/gradeDifficulty.ts";

type Props = {
    getSectorRoutes: (id: string) => IRoute[];
    sectorsSelector: JSX.Element;
    scrollTop: number;
} & ISector;

const Sector: React.FC<Props> = ({
    getSectorRoutes,
    imageWithRoutes,
    sectorsSelector,
    scrollTop,
    name,
    _id,
}): JSX.Element => {
    const [showLegend, setShowLegend] = useState<boolean>(true);
    const sectorRoutes = getSectorRoutes(_id);

    const gradeRanges: { grades: string, level: string }[] = [
        { grades: "3 / 5c+", level: "Beginner" },
        { grades: "6a / 7a", level: "Intermediate" },
        { grades: "7a+ / 7c", level: "Advanced" },
        { grades: "7c+ / 8b", level: "Master" },
        { grades: "8b+ / 9a", level: "Pro" },
        { grades: "9a / 9c", level: "Elite" },
    ];

    const sectorDifficultyLevel = getSectorDifficultyLevel(sectorRoutes);

    return (
        <div className="Sector">
            <div className="changeSector">
                {sectorsSelector}
            </div>
            <div className="main">
                <h2 className="sectionHeading">{name}</h2>
                <img className="sectorImage" src={imageWithRoutes} alt="sector routes" />

                <div className="information">
                    <div className="chartWrapper">
                        <div className="label">Grades distribution in sector</div>
                        <Chart
                            startAnimation={scrollTop > 2300}
                            gradeScale={GradeScale.FRENCH}
                            allRoutes={sectorRoutes}
                        />
                    </div>
                    <div className="legend" onClick={() => setShowLegend(prev => !prev)}>
                        <div className="label">Meaning of collors of grades</div>
                        {showLegend && (gradeRanges.map(range => (
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
                            <div className="">{sectorRoutes.length}</div>
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
                            {sectorRoutes.map((route, index) => (
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
    )
}

export default Sector;