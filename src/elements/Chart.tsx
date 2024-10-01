import React from "react";
import "../styles/Chart.scss";
import { GradeData } from "../interfaces/GradeData";
import { GradeScale } from "../consts/GradeScale.ts";

interface Props {
    positionsAmountToShow?: number;
    allPositions: GradeData[];
    gradeScale: GradeScale;
}

const Chart: React.FC<Props> = ({ positionsAmountToShow, allPositions, gradeScale }) => {

    const postionsSortedByAmount = allPositions.sort((positionA, positionB) => positionB.amount - positionA.amount);
    let allowedPositions: GradeData[] = [];

    if (positionsAmountToShow && positionsAmountToShow < allPositions.length) {
        allowedPositions = postionsSortedByAmount.slice(0, positionsAmountToShow);
    } else {
        allowedPositions = postionsSortedByAmount;
    }

    allowedPositions = allowedPositions.sort((positionA, positionB) => {
        if (gradeScale === GradeScale.FRENCH) {
            return positionA.grade.localeCompare(positionB.grade);
        } else {
            const formatedGradeA = Number(positionA.grade.replace("V", ""));
            const formatedGradeB = Number(positionB.grade.replace("V", ""));
            return formatedGradeA - formatedGradeB;
        }
    });

    const maxAmountValue = postionsSortedByAmount[0].amount;

    const getChartBarHeight = (positionAmount: number): string => {
        return `${(positionAmount / maxAmountValue) * 100}%`
    }

    return (
        <div className="Chart">
            <div className="values">
                <div>{maxAmountValue}</div>
                <div>{maxAmountValue / 2}</div>
                <div>0</div>
            </div>
            <div className="gradeAndBar">
                <div className="chartBarsWrapper">
                    {allowedPositions.map(position => (
                        <div className="chartBar" style={{ height: getChartBarHeight(position.amount) }}>
                            <div className="amountValue">{position.amount}</div>
                        </div>
                    ))}
                </div>
                <div className="chartGrades">
                    {allowedPositions.map(position => (
                        <div className="gradeValue">{position.grade}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Chart;