import React from "react";
import "../../../styles/Sector.scss";
import { ISector, IRoute } from "../../../interfaces";
import { GradeScale } from "../../../consts/index.ts";
import Chart from "../../../sharedComponents/Chart.tsx";

type Props = {
    getSectorRoutes: (id: string) => IRoute[],
    scrollTop: number
} & ISector;

const Sector: React.FC<Props> = ({
    getSectorRoutes,
    imageWithRoutes,
    scrollTop,
    name,
    _id,
}): JSX.Element => {
    return (
        <div className="Sector">
            <h2 className="sectionHeading">{name}</h2>

            <img className="sectorImage" src={imageWithRoutes} alt="sector routes" />

            <Chart
                allRoutes={getSectorRoutes(_id)}
                startAnimation={scrollTop > 2300}
                gradeScale={GradeScale.FRENCH}
            />

            <div className="tableWrapper">
                <table className="routesTable">
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Route name</th>
                            <th>Grade</th>
                            <th>Length</th>
                            <th>Author</th>
                        </tr>
                        {getSectorRoutes(_id).map((route, index) => (
                            <tr key={route?.name}>
                                <td>{index + 1}</td>
                                <td>{route?.name}</td>
                                <td>{route?.grade}</td>
                                <td>{route?.length}</td>
                                <td>{route?.author}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Sector;