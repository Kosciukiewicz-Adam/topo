import React from "react";
import "../styles/AnimatedChart.scss";
import { GradeData } from "../interfaces/GradeData.tsx";
import Chart from "./Chart.tsx";
import { GradeScale } from "../consts/GradeScale.ts";

interface ChartData {
    sportClimbing?: GradeData[];
    bouldering?: GradeData[];
}

interface Props {
    maxPerCategory?: number;
    chartData: ChartData;
}

const AnimatedChart: React.FC<Props> = ({ maxPerCategory, chartData }): JSX.Element => {
    const { bouldering, sportClimbing } = chartData

    const totalSportClimbingAmount = chartData?.sportClimbing?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0,
    );

    const totalBoulderingAmount = chartData?.bouldering?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0,
    );

    return (
        <div className="AnimatedChart">
            <div className="category">
                <div className="title">Sport climbing</div>
                <div className="stats">{`Total routes amount: ${totalSportClimbingAmount}`}</div>
                <Chart positionsAmountToShow={maxPerCategory} allPositions={chartData.sportClimbing} gradeScale={GradeScale.FRENCH} />
            </div>
            <div className="category">
                <div className="title">Bouldering</div>
                <div className="stats">
                    {`Total boulders amount: ${totalBoulderingAmount}`}
                </div>
                <Chart positionsAmountToShow={maxPerCategory} allPositions={chartData.bouldering} gradeScale={GradeScale.V} />
            </div>
        </div>
    )
}

export default AnimatedChart;