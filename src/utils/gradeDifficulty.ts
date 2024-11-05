export enum GradeDifficulty {
    BEGGINER = "begginer",
    EASY = "easy",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced",
    PRO = "pro",
    ELITE = "elite",
};

const gradesRangesBorders: Record<GradeDifficulty, string> = {
    begginer: "6a",
    easy: "6c+",
    intermediate: "7a+",
    advanced: "7c+",
    pro: "8b+",
    elite: "9a"
}

export const getGradeDifficulty = (grade: string): string => {
    return Object.keys(gradesRangesBorders).find(key => gradesRangesBorders[key].localeCompare(grade) >= 0) || "";
};