import { ICrag, IRoute, ISector } from "../interfaces";

export const fetchCrags = async (): Promise<ICrag[]> => {
    const res = await fetch("http://localhost:4000/crags");
    return res.json();
}

export const fetchCrag = async (cragId: string): Promise<ICrag> => {
    const res = await fetch(`http://localhost:4000/crags/${cragId}`);
    return res.json();
}

export const fetchCragRoutes = async (cragId: string): Promise<IRoute[]> => {
    const res = await fetch(`http://localhost:4000/crags/${cragId}/routes`);
    return res.json();
}

export const fetchCragSectors = async (cragId: string): Promise<ISector[]> => {
    const res = await fetch(`http://localhost:4000/crags/${cragId}/sectors`);
    return res.json();
}