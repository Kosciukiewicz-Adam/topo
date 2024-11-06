import { IRoute } from "../interfaces";

export enum GradeDifficulty {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced",
    MASTER = "master",
    PRO = "pro",
    ELITE = "elite",
};

const gradesRangesBorders: Record<GradeDifficulty, string> = {
    beginner: "5c+",
    intermediate: "7a",
    advanced: "7c",
    master: "8b",
    pro: "9a",
    elite: "9c",
}

export const getSectorDifficultyLevel = (routes: IRoute[]): string => {
    const routesDifficulty = routes.map(route => getGradeDifficulty(route.grade));
    let occurences: Partial<Record<GradeDifficulty, number>> = {};

    routesDifficulty.forEach(level => {
        if (occurences[level]) {
            occurences[level]++;
        } else {
            occurences[level] = 1;
        }
    });

    const occurencesAsArray = Object.keys(occurences).map(key => ({ level: key, amount: occurences[key] }));

    return occurencesAsArray.sort((a, b) => b.amount - a.amount)[0].level;
}

export const getGradeDifficulty = (grade: string): string => {
    return Object.keys(gradesRangesBorders).find(key => gradesRangesBorders[key].localeCompare(grade) >= 0) || "";
};