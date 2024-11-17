import { IFestival } from "../interfaces";

const API_URL = "http://localhost:4000" //"https://topo-server.onrender.com"

export const fetchFestivals = async (): Promise<IFestival[]> => {
    const res = await fetch(`${API_URL}/festivals`);
    return res.json();
}