import { IFestival } from "../interfaces";
import { API_URL } from ".";

export const fetchFestivals = async (): Promise<IFestival[]> => {
    const res = await fetch(`${API_URL}/festivals`);
    return res.json();
}