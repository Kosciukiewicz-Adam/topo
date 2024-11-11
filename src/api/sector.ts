import { IRoute } from "../interfaces";

const API_URL = "https://topo-server.onrender.com";

export const fetchSectorRoutes = async (sectorId: string): Promise<IRoute[]> => {
    const res = await fetch(`${API_URL}/sectors/${sectorId}/routes`);
    return res.json();
}