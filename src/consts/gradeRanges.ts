import { GradeDifficulty } from "../interfaces";

export const gradeRanges: { grades: string, level: GradeDifficulty }[] = [
    { grades: "3 / 5c+", level: GradeDifficulty.BEGINNER },
    { grades: "6a / 7a", level: GradeDifficulty.INTERMEDIATE },
    { grades: "7a+ / 7c", level: GradeDifficulty.ADVANCED },
    { grades: "7c+ / 8b", level: GradeDifficulty.MASTER },
    { grades: "9a / 9c", level: GradeDifficulty.ELITE },
    { grades: "8b+ / 9a", level: GradeDifficulty.PRO },
];