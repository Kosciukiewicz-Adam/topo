import { fetchCrag, fetchCrags, fetchCragRoutes, fetchCragSectors } from "./crag";
import { fetchSectorRoutes } from "./sector";
import { fetchFestivals } from "./festivals";

const development = false;
export const API_URL = development ? "http://localhost:4000" : "https://topo-server.onrender.com";


export {
    fetchSectorRoutes,
    fetchCragSectors,
    fetchCragRoutes,
    fetchFestivals,
    fetchCrags,
    fetchCrag,
}