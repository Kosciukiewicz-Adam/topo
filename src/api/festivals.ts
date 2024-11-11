import { IFestival } from "../interfaces";

const API_URL = "https://topo-server.onrender.com"

export const fetchFestivals = async (): Promise<IFestival[]> => {
    const res = await fetch(`${API_URL}/festivals`);
    return res.json();
}