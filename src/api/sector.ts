import { IRoute } from "../interfaces";

const url = "http://localhost:4000" //"https://topo-server.onrender.com"

export const fetchSectorRoutes = async (sectorId: string): Promise<IRoute[]> => {
    const res = await fetch(`${url}/sectors/${sectorId}/routes`);
    return res.json();
}