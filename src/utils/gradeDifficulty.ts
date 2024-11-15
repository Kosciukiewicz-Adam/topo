import { IRoute, GradeDifficulty } from "../interfaces";

const gradesRangesBorders: Record<GradeDifficulty, string> = {
    intermediate: "7a",
    beginner: "5c+",
    advanced: "7c",
    master: "8b",
    elite: "9c",
    pro: "9a",
}

export const getSectorDifficultyLevel = (routes: IRoute[]): string => {
    if (!routes.length) {
        return "";
    }

    const routesDifficulty: Partial<Record<GradeDifficulty, number>>[] = routes.map(route => getGradeDifficulty(route.grade));
    let occurences: Partial<Record<GradeDifficulty, number>> = {};

    routesDifficulty.forEach(level => {
        //@ts-ignore
        if (occurences[level]) {
            //@ts-ignore
            occurences[level]++;
        } else {
            //@ts-ignore
            occurences[level] = 1;
        }
    });

    //@ts-ignore
    const occurencesAsArray = Object.keys(occurences).map(key => ({ level: key, amount: occurences[key] }));

    return occurencesAsArray.sort((a, b) => b.amount - a.amount)[0].level;
}

export const getGradeDifficulty = (grade: string): Partial<Record<GradeDifficulty, number>> => {
    //@ts-ignore
    return Object.keys(gradesRangesBorders).find(key => gradesRangesBorders[key].localeCompare(grade) >= 0);
};