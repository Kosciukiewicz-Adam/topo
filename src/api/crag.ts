import { ICrag, IRoute, ISector } from "../interfaces";

//const url = "https://topo-server.onrender.com";

const url = "http://localhost:4000"

export const fetchCrags = async (): Promise<ICrag[]> => {
    const res = await fetch(`${url}/crags`);
    return res.json();
}

export const fetchCrag = async (cragId: string): Promise<ICrag> => {
    const res = await fetch(`${url}/crags/${cragId}`);
    return res.json();
}

export const fetchCragRoutes = async (cragId: string): Promise<IRoute[]> => {
    const res = await fetch(`${url}/crags/${cragId}/routes`);
    return res.json();
}

export const fetchCragSectors = async (cragId: string): Promise<ISector[]> => {
    const res = await fetch(`${url}/crags/${cragId}/sectors`);
    return res.json();
}