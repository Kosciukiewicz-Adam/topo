import { IRoute } from "../interfaces";
import { API_URL } from ".";

export const fetchSectorRoutes = async (sectorId: string): Promise<IRoute[]> => {
    const res = await fetch(`${API_URL}/sectors/${sectorId}/routes`);
    return res.json();
}