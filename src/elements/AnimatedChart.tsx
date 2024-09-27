import React from "react";
import "../styles/AnimatedChart.scss";
import { GradeData } from "../interfaces/GradeData.tsx";
import Chart from "./Chart.tsx";
import { GradeScale } from "../consts/GradeScale.ts";

interface ChartData {
    sportClimbing: GradeData[];
    bouldering: GradeData[];
}

interface Props {
    maxPerCategory: number;
}

const mockData: ChartData = {
    sportClimbing: [
        { grade: "5a", amount: 10 },
        { grade: "6a", amount: 7 },
        { grade: "6b", amount: 5 },
        { grade: "6c", amount: 3 },
        { grade: "7a", amount: 12 },
        { grade: "7b", amount: 8 },
        { grade: "8a", amount: 4 },
    ],
    bouldering: [
        { grade: "V9", amount: 12 },
        { grade: "V4", amount: 10 },
        { grade: "V6", amount: 11 },
        { grade: "V14", amount: 1 },
        { grade: "V11", amount: 12 },
    ],
}

const AnimatedChart: React.FC<Props> = ({ maxPerCategory }): JSX.Element => {
    const totalSportClimbingAmount = mockData.sportClimbing.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0,
    );

    const totalBoulderingAmount = mockData.bouldering.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0,
    );

    return (
        <div className="AnimatedChart">
            <div className="category">
                <div className="title">Sport climbing</div>
                <div className="stats">{`Total routes amount: ${totalSportClimbingAmount}`}</div>
                <Chart positionsAmountToShow={maxPerCategory} allPositions={mockData.sportClimbing} gradeScale={GradeScale.FRENCH} />
            </div>
            <div className="category">
                <div className="title">Bouldering</div>
                <div className="stats">
                    {`Total boulders amount: ${totalBoulderingAmount}`}
                </div>
                <Chart positionsAmountToShow={maxPerCategory} allPositions={mockData.bouldering} gradeScale={GradeScale.V} />
            </div>
        </div>
    )
}

export default AnimatedChart;