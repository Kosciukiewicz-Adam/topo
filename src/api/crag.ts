import { ICrag, IRoute, ISector } from "../interfaces";

const API_URL = "https://topo-server.onrender.com"

export const fetchCrags = async (): Promise<ICrag[]> => {
    const res = await fetch(`${API_URL}/crags`);
    return res.json();
}

export const fetchCrag = async (cragId: string): Promise<ICrag> => {
    const res = await fetch(`${API_URL}/crags/${cragId}`);
    return res.json();
}

export const fetchCragRoutes = async (cragId: string): Promise<IRoute[]> => {
    const res = await fetch(`${API_URL}/crags/${cragId}/routes`);
    return res.json();
}

export const fetchCragSectors = async (cragId: string): Promise<ISector[]> => {
    const res = await fetch(`${API_URL}/crags/${cragId}/sectors`);
    return res.json();
}