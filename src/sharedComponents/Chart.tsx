import React from "react";
import "../styles/Chart.scss";
import { IGradeData, IRoute } from "../interfaces";
import { GradeScale } from "../consts/GradeScale.ts";

interface Props {
    routesAmountToShow?: number;
    gradeScale: GradeScale;
    allRoutes: IRoute[];
    startAnimation: boolean;
}

const Chart: React.FC<Props> = ({
    routesAmountToShow,
    startAnimation,
    allRoutes,
    gradeScale,
}): JSX.Element => {
    if (!allRoutes.length) {
        return <></>;
    }

    let routesToShow: IGradeData[] = [];
    const routesPerGrade: { [key: string]: number } = {};

    allRoutes.forEach(route => {
        if (routesPerGrade[route.grade]) {
            routesPerGrade[route.grade] += 1
        } else {
            routesPerGrade[route.grade] = 1;
        }
    });

    const routesPerGradeArray = Object.entries(routesPerGrade).map(route => ({ grade: route[0], amount: route[1] }));
    const routesSortedByAmount = routesPerGradeArray.sort((positionA, positionB) => positionB.amount - positionA.amount);

    if (routesAmountToShow && routesAmountToShow < routesPerGradeArray.length) {
        routesToShow = routesSortedByAmount.slice(0, routesAmountToShow);
    } else {
        routesToShow = routesSortedByAmount;
    }

    routesToShow = routesToShow.sort((positionA, positionB) => {
        if (gradeScale === GradeScale.FRENCH) {
            return positionA.grade.localeCompare(positionB.grade);
        } else {
            const formatedGradeA = Number(positionA.grade.replace("V", ""));
            const formatedGradeB = Number(positionB.grade.replace("V", ""));
            return formatedGradeA - formatedGradeB;
        }
    });

    const maxAmountValue = Math.max.apply(Math, routesPerGradeArray.map((route) => route.amount))

    const getChartBarHeight = (positionAmount: number): string => {
        const value = (positionAmount / maxAmountValue) * 100;

        if (!startAnimation) {
            return "0%"
        }

        return `${value}%`
    }

    return (
        <div className="Chart">
            <div className="gradeAndBar">
                <div className="chartBarsWrapper">
                    {routesToShow.map(position => (
                        <div className="chartBar" style={{ height: getChartBarHeight(position.amount) }} key={position.grade}>
                            <div className="amountValue">{position.amount}</div>
                        </div>
                    ))}
                </div>
                <div className="chartGrades">
                    {routesToShow.map(position => (
                        <div className="gradeValue" key={position.grade}>{position.grade}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Chart;