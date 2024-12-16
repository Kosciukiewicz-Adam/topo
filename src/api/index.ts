import { fetchCrag, fetchCrags, fetchCragRoutes, fetchCragSectors } from "./crag";
import { fetchSectorRoutes } from "./sector";
import { fetchFestivals } from "./festivals";

const development = false;
export const API_URL = development ? "http://localhost:8000" : "https://topo-server-py.onrender.com";

export {
    fetchSectorRoutes,
    fetchCragSectors,
    fetchCragRoutes,
    fetchFestivals,
    fetchCrags,
    fetchCrag,
}