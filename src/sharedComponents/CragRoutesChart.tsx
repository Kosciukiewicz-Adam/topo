import React from "react";
import { useQuery } from "react-query";
import { RouteType, GradeScale, QueryStatus } from "../consts/index.ts";
import { fetchCragRoutes } from "../api/crag.ts";
import { IRoute } from "../interfaces/index.ts";
import Chart from "./Chart.tsx";
import DataComponentWrapper from "./DataComponentWrapper.tsx";
import "../styles/CragRoutesChart.scss"

interface Props {
    selectedCragId: string;
    maxRoutesPerChartCategory?: number;
}

const CragRoutesChart: React.FC<Props> = ({ selectedCragId, maxRoutesPerChartCategory }): JSX.Element => {
    const { data, status } = useQuery(['cragRoutes', selectedCragId], () => fetchCragRoutes(selectedCragId));

    const getRoutesOfType = (routeType: RouteType): IRoute[] => {
        if (data?.length) {
            return data.filter((route: IRoute) => route.type === routeType);

        }
        return [];
    }

    return (
        <DataComponentWrapper queryStatus={status as QueryStatus}>
            <div className="CragRoutesChart">
                <div className="category">
                    <div className="title">Sport climbing</div>
                    <div className="stats">{`Total routes amount: ${getRoutesOfType(RouteType.SPORT_CLIMBING)?.length}`}</div>

                    <Chart
                        allRoutes={getRoutesOfType(RouteType.SPORT_CLIMBING)}
                        routesAmountToShow={maxRoutesPerChartCategory}
                        gradeScale={GradeScale.FRENCH}
                    />
                </div>
            </div>
        </DataComponentWrapper>
    )
};

export default CragRoutesChart;